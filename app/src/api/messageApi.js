import api from './axios';

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
