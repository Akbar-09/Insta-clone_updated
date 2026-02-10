import api from './axios';

// Get comments for a post
export const getComments = async (postId) => {
    try {
        const response = await api.get(`/comments?postId=${postId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Add a comment to a post
export const addComment = async (postId, text, user, parentId = null) => {
    try {
        const response = await api.post(`/comments`, {
            postId,
            text,
            userId: user.id || user.userId,
            username: user.username,
            userAvatar: user.profilePicture || user.avatarUrl,
            parentId
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Like a comment
export const likeComment = async (commentId, userId) => {
    try {
        const response = await api.post(`/comments/${commentId}/like`, { userId });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Unlike a comment
export const unlikeComment = async (commentId, userId) => {
    try {
        const response = await api.delete(`/comments/${commentId}/like`, { data: { userId } });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete a comment
export const deleteComment = async (postId, commentId) => {
    try {
        const response = await api.delete(`/comments/${commentId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
