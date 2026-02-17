import api from './axios';

export const getUnreadMessageCount = async () => {
    try {
        const response = await api.get('/messages/unread-count');
        return response.data.data.count;
    } catch (error) {
        console.error("Failed to fetch unread message count", error);
        return 0;
    }
};

// Fetch all conversations
export const getConversations = async () => {
    try {
        const response = await api.get('/messages/conversations');
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// Fetch messages for a specific conversation
export const getMessages = async (conversationId) => {
    try {
        const response = await api.get(`/messages/conversations/${conversationId}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// Send a new message
export const sendMessage = async (data) => {
    try {
        // data: { conversationId, receiverId, content, type, mediaUrl, replyToStoryId }

        // INTERCEPT MOCK USERS for Story Replies and DMs
        if (data.receiverId && String(data.receiverId).startsWith('mock-')) {
            console.log("Mock message send intercepted", data);
            return {
                status: 'success',
                data: {
                    id: `mock-msg-${Date.now()}`,
                    ...data,
                    createdAt: new Date().toISOString()
                }
            };
        }

        const response = await api.post('/messages/send', data);
        return response.data; // Includes .data (message) and .conversationId
    } catch (error) {
        throw error;
    }
};

// Mark conversation as seen
export const markAsSeen = async (conversationId) => {
    try {
        await api.post('/messages/seen', { conversationId });
    } catch (error) {
        console.error("Failed to mark seen", error);
    }
};

// Fetch conversation details
export const getConversationDetails = async (conversationId) => {
    const res = await api.get(`/messages/conversations/${conversationId}/details`);
    return res.data.data;
};

// Toggle mute
export const toggleMute = async (conversationId) => {
    const res = await api.patch(`/messages/conversations/${conversationId}/mute`);
    return res.data.isMuted;
};

// Delete conversation
export const deleteConversation = async (conversationId) => {
    const res = await api.delete(`/messages/conversations/${conversationId}`);
    return res.data;
};

// Block user
export const blockUser = async (conversationId) => {
    const res = await api.post(`/messages/conversations/${conversationId}/block`);
    return res.data;
};

// Unblock user
export const unblockUser = async (conversationId) => {
    const res = await api.post(`/messages/conversations/${conversationId}/unblock`);
    return res.data;
};

// Report conversation
export const reportConversation = async (conversationId, reason = 'other') => {
    const res = await api.post(`/messages/conversations/${conversationId}/report`, { reason });
    return res.data;
};
