import { useState, useEffect, useRef } from 'react';
import { getConversations, getMessages, sendMessage, markAsSeen } from '../api/messageApi';

export const useMessages = (socket, userId, initialConversationId) => {
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [loadingConversations, setLoadingConversations] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);

    // Initial fetch of conversations
    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const data = await getConversations();
                setConversations(data);
                if (initialConversationId) {
                    const conv = data.find(c => c.id === parseInt(initialConversationId));
                    if (conv) setSelectedConversation(conv);
                }
            } catch (error) {
                console.error("Failed to load conversations", error);
            } finally {
                setLoadingConversations(false);
            }
        };

        if (userId) {
            fetchConversations();
        }
    }, [userId, initialConversationId]);

    // Fetch messages when conversation selected
    useEffect(() => {
        if (!selectedConversation) return;

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

    // Socket listeners
    useEffect(() => {
        if (!socket) return;

        socket.on('message:receive', (message) => {
            // Update conversation list preview
            setConversations(prev => {
                const existingIndex = prev.findIndex(c => c.id === message.conversationId);
                let newConvs = [...prev];

                if (existingIndex > -1) {
                    const updatedConv = {
                        ...newConvs[existingIndex],
                        lastMessageContent: message.content,
                        lastMessageSenderId: message.senderId,
                        lastMessageAt: message.createdAt
                        // Increment unread count logic here if needed
                    };
                    // Move to top
                    newConvs.splice(existingIndex, 1);
                    newConvs.unshift(updatedConv);
                } else {
                    // Fetch new conversation if it's brand new to us, or optimistically add if we had a proper object
                    // For now, simple re-fetch might be safer or ignore until refresh
                }
                return newConvs;
            });

            // If currently viewing this conversation, append message
            if (selectedConversation && selectedConversation.id === message.conversationId) {
                setMessages(prev => [...prev, message]);
                markAsSeen(message.conversationId); // Mark seen instantly if open
            }
        });

        socket.on('message:seen', ({ conversationId, seenBy }) => {
            if (selectedConversation && selectedConversation.id === parseInt(conversationId)) {
                setMessages(prev => prev.map(m =>
                    (m.senderId !== seenBy && !m.isSeen) ? { ...m, isSeen: true } : m
                ));
            }
        });

        return () => {
            socket.off('message:receive');
            socket.off('message:seen');
        };
    }, [socket, selectedConversation]);

    const handleSendMessage = async (content) => {
        if (!selectedConversation || !content.trim()) return;

        const tempId = Date.now();
        const optimisticMessage = {
            id: tempId,
            conversationId: selectedConversation.id,
            senderId: userId,
            content,
            createdAt: new Date().toISOString(),
            isSeen: false,
            isOptimistic: true
        };

        // Optimistic update
        setMessages(prev => [...prev, optimisticMessage]);

        // Update list preview
        setConversations(prev => {
            const existingIndex = prev.findIndex(c => c.id === selectedConversation.id);
            let newConvs = [...prev];
            if (existingIndex > -1) {
                const updated = {
                    ...newConvs[existingIndex],
                    lastMessageContent: content,
                    lastMessageSenderId: userId,
                    lastMessageAt: new Date().toISOString()
                };
                newConvs.splice(existingIndex, 1);
                newConvs.unshift(updated);
            }
            return newConvs;
        });

        try {
            const result = await sendMessage(
                selectedConversation.id === 'new' ? 'new' : selectedConversation.id,
                content,
                selectedConversation.user2Id // Assuming user2Id is the other person when 'new' or valid conv
            );

            // Replace optimistic
            setMessages(prev => prev.map(m => m.id === tempId ? result.data : m));

            // Update conversation ID if it was 'new'
            if (selectedConversation.id === 'new' && result.conversationId) {
                const realId = result.conversationId;
                setSelectedConversation(prev => ({ ...prev, id: realId }));
                // Also update in list
                setConversations(prev => prev.map(c => c.id === 'new' ? { ...c, id: realId } : c));
            }

        } catch (error) {
            console.error("Send failed", error);
            // Revert optimistic or show error
            setMessages(prev => prev.filter(m => m.id !== tempId));
        }
    };

    return {
        conversations,
        messages,
        selectedConversation,
        setSelectedConversation,
        loadingConversations,
        loadingMessages,
        handleSendMessage
    };
};
