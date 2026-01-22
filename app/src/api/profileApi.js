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
export const getUserProfile = async (username) => {
    const response = await api.get(`/users/profile/${username}`);
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
 * Get user's posts
 */
export const getUserPosts = async (userId) => {
    const response = await api.get(`/users/profile/${userId}/posts`);
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
export const getSuggestions = async () => {
    const response = await api.get('/users/profile/suggestions');
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
    getMySavedPosts,
    getFollowersList,
    getFollowingList,
    removeFollower,
    followUser,
    unfollowUser,
    checkFollowStatus,
    getSuggestions
};
