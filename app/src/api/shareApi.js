import api from './axios';

export const searchUsers = async (query) => {
    try {
        const response = await api.get(`/users/search?q=${query}`);
        // Ensure we always return an array, even if backend structure varies
        return response.data.data || response.data || [];
    } catch (error) {
        console.error("Error searching users:", error);
        return [];
    }
};

export const sendPostViaDM = async (receiverId, postId) => {
    try {
        const response = await api.post(`/messages/${receiverId}/send`, {
            content: `Shared a post: /posts/${postId}`, // Basic fallback text
            postId: postId, // Structured data if supported
            type: 'POST_SHARE'
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
