import api from './axios';

export const savePost = async (postId, userId, type = 'POST') => {
    try {
        const endpoint = type === 'REEL' ? `/reels/${postId}/bookmark` : `/posts/${postId}/bookmark`;
        const response = await api.post(endpoint, { userId });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404 && type === 'POST') {
            // Fallback for cases where type might be unknown or incorrectly labeled as POST
            const response = await api.post(`/reels/${postId}/bookmark`, { userId });
            return response.data;
        }
        throw error;
    }
};

export const saveReel = async (postId, userId) => {
    return savePost(postId, userId, 'REEL');
};

export const unsavePost = async (postId, userId, type = 'POST') => {
    try {
        const endpoint = type === 'REEL' ? `/reels/${postId}/bookmark` : `/posts/${postId}/bookmark`;
        const response = await api.delete(endpoint, {
            data: { userId }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404 && type === 'POST') {
            const response = await api.delete(`/reels/${postId}/bookmark`, {
                data: { userId }
            });
            return response.data;
        }
        throw error;
    }
};

export const unsaveReel = async (postId, userId) => {
    return unsavePost(postId, userId, 'REEL');
};

export const getSavedPosts = async (userId) => {
    try {
        const response = await api.get(`/posts/saved?userId=${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getSavedReels = async (userId) => {
    try {
        const response = await api.get(`/reels/saved?userId=${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
