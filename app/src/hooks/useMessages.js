import { useState, useEffect, useRef } from 'react';
import { getConversations, getMessages, sendMessage, markAsSeen } from '../api/messageApi';

export const useMessages = (socket, userId, initialConversationId) => {
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [loadingConversations, setLoadingConversations] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);

    const fetchConversations = async () => {
        try {
            const data = await getConversations();
            setConversations(data);
            return data;
        } catch (error) {
            console.error("Failed to load conversations", error);
            return [];
        } finally {
            setLoadingConversations(false);
        }
    };

    // Initial fetch of conversations only
    useEffect(() => {
        if (userId) {
            fetchConversations().then(data => {
                if (initialConversationId && initialConversationId !== 'new') {
                    const conv = data.find(c => c.id === parseInt(initialConversationId));
                    if (conv) setSelectedConversation(conv);
                }
            });
        }
    }, [userId]);

    // Handle initialConversationId changes (URL navigation)
    useEffect(() => {
        if (initialConversationId && initialConversationId !== 'new' && conversations.length > 0) {
            const convId = parseInt(initialConversationId);
            if (selectedConversation?.id !== convId) {
                const conv = conversations.find(c => c.id === convId);
                if (conv) setSelectedConversation(conv);
            }
        } else if (!initialConversationId && selectedConversation && selectedConversation.id !== 'new') {
            setSelectedConversation(null);
        }
    }, [initialConversationId, conversations]);

    // Fetch messages when conversation selected
    useEffect(() => {
        const currentId = selectedConversation?.id;
        if (!currentId || currentId === 'new') {
            setMessages([]);
            return;
        }

        const fetchMessagesForConv = async () => {
            console.log(`[useMessages] Fetching messages for ${currentId}...`);
            setLoadingMessages(true);
            try {
                const msgs = await getMessages(currentId);
                setMessages(msgs.map(m => normalizeMessage(m)));
                console.log(`[useMessages] Fetched ${msgs.length} messages for ${currentId}`);
                // Mark as seen immediately when opening
                markAsSeen(currentId);
            } catch (error) {
                console.error("[useMessages] Failed to load messages", error);
            } finally {
                setLoadingMessages(false);
            }
        };

        fetchMessagesForConv();
    }, [selectedConversation?.id]);

    // Internal helper to create/open a chat with a specific user (from search or other triggers)
    const startConversationWithUser = (targetUser) => {
        if (!targetUser) return;

        const targetId = targetUser.userId || targetUser.referenceId || targetUser.id;

        // Check if existing
        const existing = conversations.find(c =>
            String(c.otherUser?.userId) === String(targetId) || String(c.otherUser?.id) === String(targetId)
        );

        if (existing) {
            setSelectedConversation(existing);
        } else {
            const tempConv = {
                id: 'new',
                otherUser: {
                    userId: targetId,
                    username: targetUser.username,
                    profilePicture: targetUser.profilePicture || targetUser.avatar || `https://ui-avatars.com/api/?name=${targetUser.username}&background=random`,
                    fullName: targetUser.fullName || targetUser.name || targetUser.username
                },
                messages: []
            };
            setSelectedConversation(tempConv);
            // Prepend to conversations list temporarily
            setConversations(prev => [tempConv, ...prev.filter(c => c.id !== 'new')]);
        }
    };

    // Clear unreadCount locally when a conversation is selected
    useEffect(() => {
        if (selectedConversation && selectedConversation.id !== 'new') {
            setConversations(prev => prev.map(c =>
                String(c.id) === String(selectedConversation.id)
                    ? { ...c, unreadCount: 0 }
                    : c
            ));
        }
    }, [selectedConversation?.id]);

    // Sync selectedConversation with updated conversations list (e.g. for block status / online status)
    useEffect(() => {
        if (selectedConversation && selectedConversation.id !== 'new') {
            const updated = conversations.find(c => String(c.id) === String(selectedConversation.id));
            if (updated) {
                setSelectedConversation(prev => {
                    if (!prev) return prev;

                    // Simple equality check to minimize updates
                    if (JSON.stringify(prev.otherUser) === JSON.stringify(updated.otherUser) &&
                        prev.lastMessageAt === updated.lastMessageAt &&
                        prev.isMuted === updated.isMuted) {
                        return prev;
                    }

                    return {
                        ...prev,
                        ...updated,
                        // Preserve messages if they are not in the summary (they aren't)
                        // But we might be viewing messages.
                    };
                });
            }
        }
    }, [conversations]);

    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef(null);

    const normalizeMessage = (msg) => {
        if (!msg) return msg;
        const normalized = { ...msg };

        const mappings = {
            'media_url': 'mediaUrl',
            'conversation_id': 'conversationId',
            'sender_id': 'senderId',
            'reply_to_story_id': 'replyToStoryId',
            'created_at': 'createdAt',
            'updated_at': 'updatedAt'
        };

        Object.keys(mappings).forEach(snake => {
            const camel = mappings[snake];
            if (msg[snake] !== undefined && msg[camel] === undefined) {
                normalized[camel] = msg[snake];
            }
        });

        if (!normalized.mediaUrl && msg.media_url) normalized.mediaUrl = msg.media_url;
        return normalized;
    };

    // Socket listeners
    useEffect(() => {
        if (!socket) return;

        const handleReceiveMessage = (rawMessage) => {
            console.log('[useMessages] Socket received message:', rawMessage);
            const message = normalizeMessage(rawMessage);

            // Update conversations list (snippet and priority)
            setConversations(prev => {
                const existingIndex = prev.findIndex(c => String(c.id) === String(message.conversationId));
                let newConvs = [...prev];

                let snippet = message.content;
                const type = message.type;
                if (type === 'image') snippet = '📷 Image';
                else if (type === 'video') snippet = '🎥 Video';
                else if (type === 'sticker') snippet = '🖼️ Sticker';
                else if (type === 'voice') snippet = '🎤 Voice message';

                if (existingIndex > -1) {
                    const isTargetConv = selectedConversation && (String(selectedConversation.id) === String(message.conversationId));
                    const updatedConv = {
                        ...newConvs[existingIndex],
                        lastMessageContent: snippet,
                        lastMessageSenderId: message.senderId,
                        lastMessageAt: message.createdAt,
                        unreadCount: isTargetConv ? 0 : (Number(newConvs[existingIndex].unreadCount) || 0) + (String(message.senderId) !== String(userId) ? 1 : 0)
                    };
                    newConvs.splice(existingIndex, 1);
                    newConvs.unshift(updatedConv);
                } else if (message.sender) {
                    const isTargetConv = selectedConversation && (String(selectedConversation.id) === String(message.conversationId));
                    const newConv = {
                        id: message.conversationId,
                        otherUser: {
                            userId: message.sender.id,
                            username: message.sender.username,
                            profilePicture: message.sender.avatar || message.sender.profilePicture || `https://ui-avatars.com/api/?name=${message.sender.username}&background=random`
                        },
                        lastMessageContent: snippet,
                        lastMessageSenderId: message.senderId,
                        lastMessageAt: message.createdAt,
                        unreadCount: isTargetConv ? 0 : (String(message.senderId) !== String(userId) ? 1 : 0)
                    };
                    newConvs.unshift(newConv);
                }
                return newConvs;
            });

            // Update current messages if this is the active conversation
            const isTargetConv = selectedConversation && (String(selectedConversation.id) === String(message.conversationId));
            console.log('[useMessages] Checking if target conversation:', isTargetConv, 'Selected:', selectedConversation?.id, 'Incoming:', message.conversationId);

            if (isTargetConv) {
                setMessages(prev => {
                    const isNew = !prev.some(m => String(m.id) === String(message.id));
                    if (isNew) {
                        console.log('[useMessages] Appending new message to state');
                        return [...prev, message];
                    }
                    return prev;
                });
                markAsSeen(message.conversationId);
            }
        };

        const handleSeen = ({ conversationId, seenBy }) => {
            if (selectedConversation && String(selectedConversation.id) === String(conversationId)) {
                setMessages(prev => prev.map(m =>
                    (String(m.senderId) !== String(seenBy) && !m.isSeen) ? { ...m, isSeen: true } : m
                ));
            }

            // Also clear unread indicator for this conversation if I saw it (even in another tab)
            if (String(seenBy) === String(userId)) {
                setConversations(prev => prev.map(c =>
                    String(c.id) === String(conversationId) ? { ...c, unreadCount: 0 } : c
                ));
            }
        };

        const handleTypingStatus = ({ conversationId, isTyping: typing }) => {
            if (selectedConversation && String(selectedConversation.id) === String(conversationId)) {
                setIsTyping(typing);
            }
        };

        socket.on('message:receive', handleReceiveMessage);
        socket.on('message:seen', handleSeen);
        socket.on('user:typing', handleTypingStatus);

        return () => {
            socket.off('message:receive', handleReceiveMessage);
            socket.off('message:seen', handleSeen);
            socket.off('user:typing', handleTypingStatus);
        };
    }, [socket, selectedConversation?.id, markAsSeen]);

    const handleTyping = (isTypingStatus) => {
        if (!socket || !selectedConversation || selectedConversation.id === 'new') return;
        socket.emit('user:typing', {
            conversationId: selectedConversation.id,
            receiverId: selectedConversation.otherUser?.userId,
            isTyping: isTypingStatus
        });
    };

    const updateOptimisticMessage = (tempId, updates) => {
        console.log(`[useMessages] Updating optimistic ${tempId}`, updates);
        setMessages(prev => prev.map(m => String(m.id) === String(tempId) ? { ...m, ...updates } : m));
    };

    const commitMessage = async (tempId, currentData) => {
        if (!selectedConversation) return;

        console.log(`[useMessages] Committing ${tempId} to server... Content:`, currentData.content, "Media:", currentData.mediaUrl);
        try {
            const result = await sendMessage({
                conversationId: selectedConversation.id === 'new' ? null : selectedConversation.id,
                receiverId: selectedConversation.otherUser?.userId,
                content: currentData.content,
                type: currentData.type,
                mediaUrl: currentData.mediaUrl,
                ...currentData.metadata
            });

            const serverMsg = normalizeMessage(result.data);
            console.log(`[useMessages] ${tempId} committed result:`, serverMsg);

            setMessages(prev => {
                const existingIndex = prev.findIndex(m => String(m.id) === String(serverMsg.id) && String(m.id) !== String(tempId));
                if (existingIndex > -1) {
                    console.log(`[useMessages] Found server sibling for ${tempId}, merging and removing temp`);
                    // If the server message (with its real ID) is already in the state (e.g., from socket.on('message:receive')),
                    // we just need to remove the optimistic one. The socket handler should have already merged/added it.
                    return prev.filter(m => String(m.id) !== String(tempId));
                }

                console.log(`[useMessages] Replacing temp ${tempId} with server msg ${serverMsg.id}`);
                // Use a functional merge to ensure we don't lose mediaUrl if updateOptimisticMessage already set it
                return prev.map(m => String(m.id) === String(tempId) ? { ...m, ...serverMsg, isOptimistic: false } : m);
            });

            if (selectedConversation.id === 'new' && result.conversationId) {
                const realId = result.conversationId;
                setSelectedConversation(prev => ({ ...prev, id: realId }));
                setConversations(prev => prev.map(c => c.id === 'new' ? { ...c, id: realId } : c));
            }
        } catch (error) {
            console.error("Send failed", error);
            setMessages(prev => prev.filter(m => String(m.id) !== String(tempId)));
        }
    };

    const handleSendMessage = async (content, type = 'text', metadata = {}) => {
        if (!selectedConversation) return null;

        handleTyping(false);

        const tempId = `temp-${Date.now()}`;
        const optimisticMessage = {
            id: tempId,
            conversationId: selectedConversation.id,
            senderId: userId,
            content,
            type,
            ...metadata,
            createdAt: new Date().toISOString(),
            isSeen: false,
            isOptimistic: true
        };

        setMessages(prev => [...prev, optimisticMessage]);

        // Update conversation snippet
        setConversations(prev => {
            const existingIndex = prev.findIndex(c => c.id === selectedConversation.id);
            if (existingIndex === -1) return prev;
            let newConvs = [...prev];

            let snippet = content;
            if (type === 'image') snippet = '📷 Image';
            else if (type === 'video') snippet = '🎥 Video';
            else if (type === 'sticker') snippet = '🖼️ Sticker';
            else if (type === 'voice') snippet = '🎤 Voice message';

            const updated = {
                ...newConvs[existingIndex],
                lastMessageContent: snippet,
                lastMessageSenderId: userId,
                lastMessageAt: new Date().toISOString()
            };
            newConvs.splice(existingIndex, 1);
            newConvs.unshift(updated);
            return newConvs;
        });

        const isBlob = metadata.mediaUrl && metadata.mediaUrl.startsWith('blob:');
        if (type === 'text' || (metadata.mediaUrl && !isBlob)) {
            commitMessage(tempId, optimisticMessage);
        }

        return tempId;
    };

    return {
        conversations,
        messages,
        selectedConversation,
        setSelectedConversation,
        startConversationWithUser,
        loadingConversations,
        loadingMessages,
        handleSendMessage,
        updateOptimisticMessage,
        commitMessage,
        isTyping,
        handleTyping,
        refreshConversations: fetchConversations
    };
};
