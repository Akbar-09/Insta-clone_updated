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

    // Sync selectedConversation with updated conversations list (e.g. for block status / online status)
    useEffect(() => {
        if (selectedConversation && selectedConversation.id !== 'new') {
            const updated = conversations.find(c => c.id === selectedConversation.id);
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

        socket.on('message:receive', (rawMessage) => {
            console.log('[useMessages] Socket received:', rawMessage);
            const message = normalizeMessage(rawMessage);

            setConversations(prev => {
                const existingIndex = prev.findIndex(c => c.id === message.conversationId);
                let newConvs = [...prev];

                let snippet = message.content;
                const type = message.type;
                if (type === 'image') snippet = '📷 Image';
                else if (type === 'video') snippet = '🎥 Video';
                else if (type === 'sticker') snippet = '🖼️ Sticker';
                else if (type === 'voice') snippet = '🎤 Voice message';

                if (existingIndex > -1) {
                    const updatedConv = {
                        ...newConvs[existingIndex],
                        lastMessageContent: snippet,
                        lastMessageSenderId: message.senderId,
                        lastMessageAt: message.createdAt
                    };
                    newConvs.splice(existingIndex, 1);
                    newConvs.unshift(updatedConv);
                }
                return newConvs;
            });

            if (selectedConversation && (String(selectedConversation.id) === String(message.conversationId))) {
                setMessages(prev => {
                    // Check if message ID already exists (numeric ID or same temp ID)
                    if (prev.some(m => String(m.id) === String(message.id))) return prev;

                    // Optimization: If we find a temp message from us that matches this content/type, 
                    // we could technically replace it here, but commitMessage usually handles it.
                    // For safety, just append if it's truly new.
                    return [...prev, message];
                });
                markAsSeen(message.conversationId);
            }
        });

        socket.on('message:seen', ({ conversationId, seenBy }) => {
            if (selectedConversation && String(selectedConversation.id) === String(conversationId)) {
                setMessages(prev => prev.map(m =>
                    (String(m.senderId) !== String(seenBy) && !m.isSeen) ? { ...m, isSeen: true } : m
                ));
            }
        });

        socket.on('user:typing', ({ conversationId, isTyping: typing }) => {
            if (selectedConversation && String(selectedConversation.id) === String(conversationId)) {
                setIsTyping(typing);
            }
        });

        return () => {
            socket.off('message:receive');
            socket.off('message:seen');
            socket.off('user:typing');
        };
    }, [socket, selectedConversation, markAsSeen]);

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
