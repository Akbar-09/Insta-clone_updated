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
        const response = await api.get(`/messages/conversations/${conversationId}/messages`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// Send a new message
export const sendMessage = async (conversationId, content, receiverId) => {
    try {
        // receiverId is optional if conversationId is established, but needed for 'new'
        const response = await api.post(`/messages/conversations/${conversationId}/messages`, {
            content,
            receiverId
        });
        return response.data; // Includes .data (message) and .conversationId
    } catch (error) {
        throw error;
    }
};

// Mark conversation as seen
export const markAsSeen = async (conversationId) => {
    try {
        await api.post(`/messages/conversations/${conversationId}/seen`);
    } catch (error) {
        console.error("Failed to mark seen", error);
    }
};
