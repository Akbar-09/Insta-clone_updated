import api from './axios';

export const likePost = async (postId, type) => {
    // If type is explicitly reel, use reels endpoint
    if (type === 'reel') {
        return api.post(`/reels/${postId}/like`);
    }

    // Otherwise try posts, and fallback to reels if 404
    try {
        return await api.post(`/posts/${postId}/like`);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return api.post(`/reels/${postId}/like`);
        }
        throw error;
    }
};

export const unlikePost = async (postId, type) => {
    if (type === 'reel') {
        return api.delete(`/reels/${postId}/like`);
    }

    try {
        return await api.delete(`/posts/${postId}/like`);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return api.delete(`/reels/${postId}/like`);
        }
        throw error;
    }
};

export const fetchPostLikeStatus = async (postId) => {
    try {
        return await api.get(`/posts/${postId}`);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return api.get(`/reels/${postId}`);
        }
        throw error;
    }
};
