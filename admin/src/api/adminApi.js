import axios from 'axios';

const API_URL = `${window.location.origin}/api/v1/admin/`;

const adminApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor to add auth token
adminApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async (email, password) => {
    const response = await adminApi.post('auth/login', { email, password });
    if (response.data.success) {
        localStorage.setItem('adminToken', response.data.data.token);
        localStorage.setItem('adminUser', JSON.stringify(response.data.data.admin));
    }
    return response.data;
};

export const getKPIs = async () => {
    const response = await adminApi.get('dashboard/kpis');
    return response.data;
};

export const getUserGrowth = async () => {
    const response = await adminApi.get('dashboard/user-growth');
    return response.data;
};

export const getMediaDistribution = async () => {
    const response = await adminApi.get('dashboard/media-distribution');
    return response.data;
};

export const getLoginMethods = async () => {
    const response = await adminApi.get('dashboard/login-methods');
    return response.data;
};

export const getRecentUsers = async () => {
    const response = await adminApi.get('dashboard/recent-users');
    return response.data;
};

export const getRecentPosts = async () => {
    const response = await adminApi.get('dashboard/recent-posts');
    return response.data;
};

export const getTrendingHashtags = async () => {
    const response = await adminApi.get('hashtags/trending');
    return response.data;
};

export const getCountryDistribution = async () => {
    const response = await adminApi.get('analytics/countries');
    return response.data;
};

// User Management
export const listUsers = async (params) => {
    const response = await adminApi.get('users', { params });
    return response.data;
};

export const banUser = async (userId) => {
    const response = await adminApi.patch(`users/${userId}/ban`);
    return response.data;
};

export const unbanUser = async (userId) => {
    const response = await adminApi.patch(`users/${userId}/unban`);
    return response.data;
};

export const deleteUser = async (userId) => {
    const response = await adminApi.delete(`users/${userId}`);
    return response.data;
};

export const getUserDetails = async (userId) => {
    const response = await adminApi.get(`users/${userId}/details`);
    return response.data;
};

export const getUserFollowers = async (userId) => {
    const response = await adminApi.get(`users/${userId}/followers`);
    return response.data;
};

export const getUserFollowing = async (userId) => {
    const response = await adminApi.get(`users/${userId}/following`);
    return response.data;
};

export const getUserPosts = async (userId) => {
    const response = await adminApi.get(`users/${userId}/posts`);
    return response.data;
};

export const getUserReels = async (userId) => {
    const response = await adminApi.get(`users/${userId}/reels`);
    return response.data;
};


// Content Moderation
export const listPosts = async (params) => {
    const response = await adminApi.get('moderation/posts', { params });
    return response.data;
};

export const hidePost = async (postId) => {
    const response = await adminApi.patch(`moderation/posts/${postId}/hide`);
    return response.data;
};

export const unhidePost = async (postId) => {
    const response = await adminApi.patch(`moderation/posts/${postId}/unhide`);
    return response.data;
};

export const deletePost = async (postId) => {
    const response = await adminApi.delete(`moderation/posts/${postId}`);
    return response.data;
};

export const getPostInteractions = async (postId) => {
    const response = await adminApi.get(`moderation/posts/${postId}/interactions`);
    return response.data;
};

export const listReels = async (params) => {
    const response = await adminApi.get('moderation/reels', { params });
    return response.data;
};

export const hideReel = async (reelId) => {
    const response = await adminApi.patch(`moderation/reels/${reelId}/hide`);
    return response.data;
};

export const unhideReel = async (reelId) => {
    const response = await adminApi.patch(`moderation/reels/${reelId}/unhide`);
    return response.data;
};

export const deleteReel = async (reelId) => {
    const response = await adminApi.delete(`moderation/reels/${reelId}`);
    return response.data;
};

export const getReelInteractions = async (reelId) => {
    const response = await adminApi.get(`moderation/reels/${reelId}/interactions`);
    return response.data;
};

export const listStories = async (params) => {
    const response = await adminApi.get('moderation/stories', { params });
    return response.data;
};

export const deleteStory = async (storyId) => {
    const response = await adminApi.delete(`moderation/stories/${storyId}`);
    return response.data;
};

export const getStoryInteractions = async (storyId) => {
    const response = await adminApi.get(`moderation/stories/${storyId}/interactions`);
    return response.data;
};

// Avatar Moderation
export const listAvatars = async (params) => {
    const response = await adminApi.get('avatars', { params });
    return response.data;
};

export const getAvatarStats = async () => {
    const response = await adminApi.get('avatars/stats');
    return response.data;
};

export const approveAvatar = async (id) => {
    const response = await adminApi.patch(`avatars/${id}/approve`);
    return response.data;
};

export const rejectAvatar = async (id) => {
    const response = await adminApi.patch(`avatars/${id}/reject`);
    return response.data;
};

export const deleteAvatar = async (id) => {
    const response = await adminApi.delete(`avatars/${id}`);
    return response.data;
};

// Reports Management
export const listReports = async (params) => {
    const response = await adminApi.get('reports', { params });
    return response.data;
};

export const getReportStats = async () => {
    const response = await adminApi.get('reports/stats');
    return response.data;
};

export const getReportById = async (id) => {
    const response = await adminApi.get(`reports/${id}`);
    return response.data;
};

export const ignoreReport = async (id, type) => {
    const response = await adminApi.post(`reports/${id}/ignore`, { type });
    return response.data;
};

export const banUserFromReport = async (id, type) => {
    const response = await adminApi.post(`reports/${id}/ban-user`, { type });
    return response.data;
};

// Comments Moderation
export const listComments = async (params) => {
    const response = await adminApi.get('comments', { params });
    return response.data;
};

export const getCommentStats = async () => {
    const response = await adminApi.get('comments/stats');
    return response.data;
};

export const approveComment = async (id) => {
    const response = await adminApi.patch(`comments/${id}/approve`);
    return response.data;
};

export const removeComment = async (id) => {
    const response = await adminApi.patch(`comments/${id}/remove`);
    return response.data;
};

export const deleteComment = async (id) => {
    const response = await adminApi.delete(`comments/${id}`);
    return response.data;
};

// DM Oversight
export const getDMFlaggedConversations = async (params) => {
    const response = await adminApi.get('dm-oversight/conversations', { params });
    return response.data;
};

export const getDMOversightStats = async () => {
    const response = await adminApi.get('dm-oversight/stats');
    return response.data;
};

export const getDMTranscript = async (id) => {
    const response = await adminApi.get(`dm-oversight/conversations/${id}/transcript`);
    return response.data;
};

export const markDMConversationSafe = async (id) => {
    const response = await adminApi.patch(`dm-oversight/conversations/${id}/mark-safe`);
    return response.data;
};

export const banDMConversationUsers = async (id) => {
    const response = await adminApi.post(`dm-oversight/conversations/${id}/ban-users`);
    return response.data;
};

// Hashtag Management
export const listHashtags = async (params) => {
    const response = await adminApi.get('hashtags', { params });
    return response.data;
};

export const toggleHashtagVisibility = async (id) => {
    const response = await adminApi.patch(`hashtags/${id}/toggle-visibility`);
    return response.data;
};

export const deleteHashtag = async (id) => {
    const response = await adminApi.delete(`hashtags/${id}`);
    return response.data;
};

// Explore Control
export const getAlgorithmConfig = async () => {
    const response = await adminApi.get('explore/algorithm');
    return response.data;
};

export const updateAlgorithmConfig = async (data) => {
    const response = await adminApi.patch('explore/algorithm', data);
    return response.data;
};

export const listTrendingTopics = async () => {
    const response = await adminApi.get('explore/trending-topics');
    return response.data;
};

export const addTrendingTopic = async (topic) => {
    const response = await adminApi.post('explore/trending-topics', { topic });
    return response.data;
};

export const removeTrendingTopic = async (topicId) => {
    const response = await adminApi.delete(`explore/trending-topics/${topicId}`);
    return response.data;
};

export const getCategoryDistribution = async () => {
    const response = await adminApi.get('explore/category-distribution');
    return response.data;
};

export const getPerformanceMetrics = async () => {
    const response = await adminApi.get('explore/performance-metrics');
    return response.data;
};

// Platform Analytics
export const getAnalyticsSummary = async () => {
    const response = await adminApi.get('analytics/summary');
    return response.data;
};

export const getUserAcquisition = async (range = 'monthly') => {
    const response = await adminApi.get('analytics/user-acquisition', { params: { range } });
    return response.data;
};

export const getEngagementTrends = async (range = 'monthly') => {
    const response = await adminApi.get('analytics/engagement-trends', { params: { range } });
    return response.data;
};

export const getTopContent = async (limit = 10) => {
    const response = await adminApi.get('analytics/top-content', { params: { limit } });
    return response.data;
};

export const getGeoUserDistribution = async (params) => {
    const response = await adminApi.get('analytics/geo-users', { params });
    return response.data;
};

export const getLanguages = async () => {
    const response = await adminApi.get('languages');
    return response.data;
};

export const enableLanguage = async (id) => {
    const response = await adminApi.patch(`languages/${id}/enable`);
    return response.data;
};

export const disableLanguage = async (id) => {
    const response = await adminApi.patch(`languages/${id}/disable`);
    return response.data;
};

export const setDefaultLanguage = async (id) => {
    const response = await adminApi.patch(`languages/${id}/set-default`);
    return response.data;
};

export const getSettings = async () => {
    const response = await adminApi.get('settings');
    return response.data;
};

export const updateSettings = async (data) => {
    const response = await adminApi.put('settings', data);
    return response.data;
};

export const getProfile = async () => {
    const response = await adminApi.get('settings/profile');
    return response.data;
};

export const updateProfile = async (data) => {
    const response = await adminApi.put('settings/profile', data);
    return response.data;
};

export const checkHealth = async () => {
    const response = await adminApi.get('health-check');
    return response.data;
};

// Notification Management
export const sendNotification = async (data) => {
    const response = await adminApi.post('notifications/global', data);
    return response.data;
};

export const getNotificationHistory = async () => {
    const response = await adminApi.get('notifications/history');
    return response.data;
};

export const getNotificationStats = async () => {
    const response = await adminApi.get('notifications/stats');
    return response.data;
};

// Roles & Admins
export const listRoles = async () => {
    const response = await adminApi.get('auth/roles');
    return response.data;
};

export const createRole = async (data) => {
    const response = await adminApi.post('auth/roles', data);
    return response.data;
};

export const updateRole = async (id, data) => {
    const response = await adminApi.put(`auth/roles/${id}`, data);
    return response.data;
};

export const deleteRole = async (id) => {
    const response = await adminApi.delete(`auth/roles/${id}`);
    return response.data;
};

export const listAdmins = async () => {
    const response = await adminApi.get('auth/admins');
    return response.data;
};

export const updateAdminRole = async (id, roleId) => {
    const response = await adminApi.patch(`auth/admins/${id}/role`, { roleId });
    return response.data;
};

export const deleteAdmin = async (id) => {
    const response = await adminApi.delete(`auth/admins/${id}`);
    return response.data;
};

export const getAuditLogs = async (params) => {
    const response = await adminApi.get('audit', { params });
    return response.data;
};

// Monitoring
export const getServiceStatuses = async () => {
    const response = await adminApi.get('monitoring/statuses');
    return response.data;
};

export const getServiceLogs = async (serviceName, type = 'logs') => {
    const response = await adminApi.get(`monitoring/logs/${serviceName}/${type}`);
    return response.data;
};

export default adminApi;
