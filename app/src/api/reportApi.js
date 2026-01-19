import api from './axios';

export const reportPost = async (postId, reason, details) => {
    try {
        const response = await api.post(`/posts/${postId}/report`, {
            reason,
            details
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
