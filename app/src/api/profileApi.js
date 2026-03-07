import api from './axios';

/**
 * Get current user's profile with counts
 */
export const getMyProfile = async () => {
    const response = await api.get('/users/profile/me');
    return response.data;
};

/**
 * Get user profile by username
 */
export const getUserProfile = async (username, currentUserId) => {
    let url = `/users/profile/${username}`;
    if (currentUserId) {
        url += `?currentUserId=${currentUserId}`;
    }
    const response = await api.get(url);
    return response.data;
};

/**
 * Update current user's profile
 */
export const updateMyProfile = async (data) => {
    const response = await api.put('/users/profile/me', data);
    return response.data;
};

/**
 * Upload profile photo
 */
export const uploadProfilePhoto = async (data) => {
    const response = await api.post('/users/profile/profile-photo', data);
    return response.data;
};

/**
 * Remove profile photo
 */
export const removeProfilePhoto = async () => {
    const response = await api.delete('/users/profile/profile-photo');
    return response.data;
};

/**
 * Upload Avatar to R2 via User Service
 */
export const uploadAvatarDirect = async (formData) => {
    const response = await api.post('/users/profile/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

/**
 * Add a Profile Link
 */
export const addProfileLink = async (data) => {
    const response = await api.post('/users/profile/link', data);
    return response.data;
};

/**
 * Pin a Post to Profile
 */
export const pinProfilePost = async (data) => {
    const response = await api.post('/users/profile/pin-post', data);
    return response.data;
};

/**
 * Get user's posts
 */
export const getUserPosts = async (userId) => {
    const response = await api.get(`/users/profile/${userId}/posts`);
    return response.data;
};

/**
 * Get user's reels
 */
export const getUserReels = async (userId) => {
    const response = await api.get(`/users/profile/${userId}/reels`);
    return response.data;
};

/**
 * Get user's tagged posts
 */
export const getUserTaggedPosts = async (userId) => {
    const response = await api.get(`/users/profile/${userId}/tagged`);
    return response.data;
};

/**
 * Get current user's saved posts
 */
export const getMySavedPosts = async () => {
    const response = await api.get('/users/profile/me/saved');
    return response.data;
};

/**
 * Get suggested users
 */
export const getSuggestions = async (limit = 5, page = 1) => {
    const response = await api.get(`/users/profile/suggestions?limit=${limit}&page=${page}`);
    return response.data;
};

/**
 * Get user's followers list
 */
export const getFollowersList = async (userId) => {
    const response = await api.get(`/users/profile/${userId}/followers`);
    return response.data;
};

/**
 * Get user's following list
 */
export const getFollowingList = async (userId) => {
    const response = await api.get(`/users/profile/${userId}/following`);
    return response.data;
};

/**
 * Get embed code for a profile
 */
export const getProfileEmbedCode = async (username) => {
    const response = await api.get(`/users/profile/${username}/embed-code`);
    return response.data;
};

/**
 * Remove a follower (only profile owner)
 */
export const removeFollower = async (followerId) => {
    const response = await api.delete(`/users/profile/followers/${followerId}`);
    return response.data;
};

/**
 * Follow a user
 */
export const followUser = async (userId) => {
    const response = await api.post(`/users/${userId}/follow`);
    return response.data;
};

/**
 * Unfollow a user
 */
export const unfollowUser = async (userId) => {
    const response = await api.delete(`/users/${userId}/follow`);
    return response.data;
};

/**
 * Check if following a user
 */
export const checkFollowStatus = async (userId) => {
    const response = await api.get(`/users/${userId}/follow/status`);
    return response.data;
};

export default {
    getMyProfile,
    getUserProfile,
    updateMyProfile,
    getUserPosts,
    getUserReels,
    getUserTaggedPosts,
    getMySavedPosts,
    getFollowersList,
    getFollowingList,
    getProfileEmbedCode,
    removeFollower,
    followUser,
    unfollowUser,
    checkFollowStatus,
    getSuggestions
};
