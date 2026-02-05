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
            if (initialConversationId) {
                const conv = data.find(c => c.id === parseInt(initialConversationId));
                if (conv) {
                    setSelectedConversation(conv);
                } else if (initialConversationId !== 'new') {
                    setSelectedConversation(null);
                }
            } else {
                setSelectedConversation(null);
            }
        } catch (error) {
            console.error("Failed to load conversations", error);
        } finally {
            setLoadingConversations(false);
        }
    };

    // Initial fetch of conversations
    useEffect(() => {
        if (userId) {
            fetchConversations();
        }
    }, [userId, initialConversationId]);

    // Fetch messages when conversation selected
    useEffect(() => {
        if (!selectedConversation) {
            setMessages([]);
            return;
        }

        // Don't fetch for new/ephemeral conversations
        if (selectedConversation.id === 'new') {
            setMessages([]);
            return;
        }

        const fetchMessages = async () => {
            setLoadingMessages(true);
            try {
                const msgs = await getMessages(selectedConversation.id);
                setMessages(msgs);
                // Mark as seen immediately when opening
                markAsSeen(selectedConversation.id);
            } catch (error) {
                console.error("Failed to load messages", error);
            } finally {
                setLoadingMessages(false);
            }
        };

        fetchMessages();
    }, [selectedConversation]);

    // Internal helper to create/open a chat with a specific user (from search or other triggers)
    const startConversationWithUser = (targetUser) => {
        if (!targetUser) return;

        const targetId = targetUser.userId || targetUser.referenceId || targetUser.id;

        // Check if existing
        const existing = conversations.find(c =>
            c.otherUser?.userId === targetId || c.otherUser?.id === targetId
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
                    // Start with a shallow check or just update. 
                    // Since specific fields like isBlocked are critical, we update.
                    // We merge preventing regression of local state if any.
                    // However, we must ensure we don't trigger infinite loops if this causes re-fetch.
                    // fetchMessages depends on selectedConversation.

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

    // Socket listeners
    useEffect(() => {
        if (!socket) return;

        socket.on('message:receive', (message) => {
            setConversations(prev => {
                const existingIndex = prev.findIndex(c => c.id === message.conversationId);
                let newConvs = [...prev];

                let snippet = message.content;
                if (message.type === 'image') snippet = '📷 Image';
                else if (message.type === 'video') snippet = '🎥 Video';
                else if (message.type === 'sticker') snippet = '🖼️ Sticker';
                else if (message.type === 'voice') snippet = '🎤 Voice message';

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

            if (selectedConversation && selectedConversation.id === message.conversationId) {
                setMessages(prev => [...prev, message]);
                markAsSeen(message.conversationId);
            }
        });

        socket.on('message:seen', ({ conversationId, seenBy }) => {
            if (selectedConversation && selectedConversation.id === parseInt(conversationId)) {
                setMessages(prev => prev.map(m =>
                    (m.senderId !== seenBy && !m.isSeen) ? { ...m, isSeen: true } : m
                ));
            }
        });

        socket.on('user:typing', ({ conversationId, isTyping: typing }) => {
            if (selectedConversation && selectedConversation.id === parseInt(conversationId)) {
                setIsTyping(typing);
            }
        });

        return () => {
            socket.off('message:receive');
            socket.off('message:seen');
            socket.off('user:typing');
        };
    }, [socket, selectedConversation]);

    const handleTyping = (isTypingStatus) => {
        if (!socket || !selectedConversation || selectedConversation.id === 'new') return;
        socket.emit('user:typing', {
            conversationId: selectedConversation.id,
            receiverId: selectedConversation.otherUser?.userId,
            isTyping: isTypingStatus
        });
    };

    const handleSendMessage = async (content, type = 'text', metadata = {}) => {
        if (!selectedConversation || (!content?.trim() && !metadata.mediaUrl)) return;

        handleTyping(false); // Stop typing when sending

        const tempId = Date.now();
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

        try {
            const result = await sendMessage({
                conversationId: selectedConversation.id === 'new' ? null : selectedConversation.id,
                receiverId: selectedConversation.otherUser?.userId,
                content,
                type,
                ...metadata
            });

            setMessages(prev => prev.map(m => m.id === tempId ? result.data : m));

            if (selectedConversation.id === 'new' && result.conversationId) {
                const realId = result.conversationId;
                setSelectedConversation(prev => ({ ...prev, id: realId }));
                setConversations(prev => prev.map(c => c.id === 'new' ? { ...c, id: realId } : c));
            }
        } catch (error) {
            console.error("Send failed", error);
            setMessages(prev => prev.filter(m => m.id !== tempId));
        }
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
        isTyping,
        handleTyping,
        refreshConversations: fetchConversations
    };
};
