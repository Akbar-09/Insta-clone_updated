import api from './axios';
import { jwtDecode } from "jwt-decode";

const getUserId = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded = jwtDecode(token);
            return decoded.id || decoded.userId;
        } catch (e) {
            console.error("Token decode error", e);
        }
    }
    return null;
};

// Interactions
export const getActivityLikes = async (params) => {
    const userId = getUserId();
    return await api.get('/posts/activity/likes', {
        params: { ...params, userId }
    });
};

export const getActivityComments = async (params) => {
    const userId = getUserId();
    return await api.get('/comments/activity/comments', {
        params: { ...params, userId }
    });
};

export const getActivityStoryReplies = async (params) => {
    const userId = getUserId();
    // Story replies are in message-service, mapped to /messages
    return await api.get('/messages/activity/story-replies', {
        params: { ...params, userId }
    });
};

export const getActivityReviews = async (params) => {
    const userId = getUserId();
    return await api.get('/comments/activity/reviews', {
        params: { ...params, userId }
    });
};

export const getActivityReelLikes = async (params) => {
    const userId = getUserId();
    return await api.get('/reels/activity/likes', {
        params: { ...params, userId }
    });
};


// Photos and Videos
export const getActivityPosts = async (params) => {
    const userId = getUserId();
    return await api.get('/posts/activity/posts', {
        params: { ...params, userId }
    });
};

export const getActivityReels = async (params) => {
    const userId = getUserId();
    return await api.get('/reels/activity/reels', {
        params: { ...params, userId }
    });
};

export const getActivityHighlights = async (params) => {
    const userId = getUserId();
    return await api.get('/stories/activity/highlights', {
        params: { ...params, userId }
    });
};


// Account History
export const getAccountHistory = async (params) => {
    const userId = getUserId();
    // User service is /users, but controller mounts at /profile
    return await api.get('/users/profile/activity/account-history', {
        params: { ...params, userId }
    });
};

// Actions
export const deleteComment = async (commentId) => {
    return await api.delete(`/comments/${commentId}`);
};

export const unlikePost = async (postId) => {
    return await api.delete(`/posts/${postId}/like`);
};

export const unlikeReel = async (reelId) => {
    return await api.delete(`/reels/${reelId}/like`);
};
