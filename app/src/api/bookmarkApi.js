import api from './axios';

export const savePost = async (postId, userId) => {
    try {
        const response = await api.post(`/posts/${postId}/bookmark`, { userId });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const unsavePost = async (postId, userId) => {
    try {
        // Axios delete with body requires 'data' key config
        const response = await api.delete(`/posts/${postId}/bookmark`, {
            data: { userId }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getSavedPosts = async (userId) => {
    try {
        const response = await api.get(`/posts/saved?userId=${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
