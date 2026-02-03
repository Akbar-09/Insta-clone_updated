const axios = require('axios');
require('dotenv').config();

const USER_SVC = process.env.USER_SERVICE_URL;
const POST_SVC = process.env.POST_SERVICE_URL;
const REEL_SVC = process.env.REEL_SERVICE_URL;
const STORY_SVC = process.env.STORY_SERVICE_URL || 'http://localhost:5004';
const COMMENT_SVC = process.env.COMMENT_SERVICE_URL || 'http://localhost:5006';
const MESSAGE_SVC = process.env.MESSAGE_SERVICE_URL || 'http://localhost:5010';


const SVC_MAP = {
    users: USER_SVC,
    posts: POST_SVC,
    reels: REEL_SVC,
    stories: STORY_SVC,
    comments: COMMENT_SVC,
    messages: MESSAGE_SVC
};

const internalApi = {
    // Analytics & Stats
    getUserGrowthStats: () => axios.get(`${USER_SVC}/internal/stats`),
    getUserMonthlyGrowth: (year) => axios.get(`${USER_SVC}/internal/growth`, { params: { year } }),
    getEngagementStats: () => axios.get(`${POST_SVC}/internal/stats/engagement`),
    getEngagementTrends: () => axios.get(`${POST_SVC}/internal/engagement/trends`),
    getTopContent: (limit) => axios.get(`${POST_SVC}/internal/top`, { params: { limit } }),

    // DM Oversight

    getFlaggedConversations: (params) => axios.get(`${MESSAGE_SVC}/internal/conversations`, { params }),
    getOversightStats: () => axios.get(`${MESSAGE_SVC}/internal/stats`),
    getTranscript: (id) => axios.get(`${MESSAGE_SVC}/internal/conversations/${id}/transcript`),
    markConversationSafe: (id) => axios.patch(`${MESSAGE_SVC}/internal/conversations/${id}/mark-safe`),
    getConversation: (id) => axios.get(`${MESSAGE_SVC}/internal/conversations/${id}`), // Generic get if needed
    // Users Management
    getUser: (id) => axios.get(`${USER_SVC}/internal/${id}`),
    listUsers: (params) => axios.get(`${USER_SVC}/internal/list`, { params }),
    banUser: (id) => axios.patch(`${USER_SVC}/internal/${id}/ban`),
    unbanUser: (id) => axios.patch(`${USER_SVC}/internal/${id}/unban`),
    deleteUser: (id) => axios.delete(`${USER_SVC}/internal/${id}`),
    getUsersBulk: (userIds) => axios.post(`${USER_SVC}/internal/bulk`, { userIds }),
    getFollowCounts: (userId) => axios.get(`${USER_SVC}/internal/${userId}/follow-counts`),

    // Avatar Management
    listAvatars: (params) => axios.get(`${USER_SVC}/internal/avatars`, { params }),
    getAvatarStats: () => axios.get(`${USER_SVC}/internal/avatars/stats`),
    approveAvatar: (id) => axios.patch(`${USER_SVC}/internal/avatars/${id}/approve`),
    rejectAvatar: (id) => axios.patch(`${USER_SVC}/internal/avatars/${id}/reject`),
    deleteAvatar: (id) => axios.delete(`${USER_SVC}/internal/avatars/${id}`),

    // Content Management (Posts)
    getPost: (id) => axios.get(`${POST_SVC}/internal/${id}`),
    listPosts: (params) => axios.get(`${POST_SVC}/internal/list`, { params }),
    hidePost: (id) => axios.patch(`${POST_SVC}/internal/${id}/hide`),
    unhidePost: (id) => axios.patch(`${POST_SVC}/internal/${id}/unhide`),
    deletePost: (id) => axios.delete(`${POST_SVC}/internal/${id}`),
    getUserPostCount: (userId) => axios.get(`${POST_SVC}/internal/stats/user/${userId}`),
    getUserPosts: (userId) => axios.get(`${POST_SVC}/internal/user/${userId}`),
    getPostLikes: (id) => axios.get(`${POST_SVC}/internal/${id}/likes`),
    getPostBookmarks: (id) => axios.get(`${POST_SVC}/internal/${id}/bookmarks`),

    // Content Management (Reels)
    getReel: (id) => axios.get(`${REEL_SVC}/internal/${id}`),
    listReels: (params) => axios.get(`${REEL_SVC}/internal/list`, { params }),
    hideReel: (id) => axios.patch(`${REEL_SVC}/internal/${id}/hide`),
    unhideReel: (id) => axios.patch(`${REEL_SVC}/internal/${id}/unhide`),
    deleteReel: (id) => axios.delete(`${REEL_SVC}/internal/${id}`),
    getUserReelCount: (userId) => axios.get(`${REEL_SVC}/internal/stats/user/${userId}`),
    getUserReels: (userId) => axios.get(`${REEL_SVC}/internal/user/${userId}`),
    getReelLikes: (id) => axios.get(`${REEL_SVC}/internal/${id}/likes`),

    // Followers/Following
    getUserFollowers: (userId) => axios.get(`${USER_SVC}/${userId}/followers`),
    getUserFollowing: (userId) => axios.get(`${USER_SVC}/${userId}/following`),

    // Content Management (Comments)
    getComment: (id) => axios.get(`${COMMENT_SVC}/internal/${id}`),
    listComments: (params) => axios.get(`${COMMENT_SVC}/internal/list`, { params }),
    getCommentStats: () => axios.get(`${COMMENT_SVC}/internal/stats`),
    approveComment: (id) => axios.patch(`${COMMENT_SVC}/internal/${id}/approve`),
    removeComment: (id) => axios.patch(`${COMMENT_SVC}/internal/${id}/remove`),
    deleteComment: (id) => axios.delete(`${COMMENT_SVC}/internal/${id}`),
    getPostComments: (postId) => axios.get(`${COMMENT_SVC}/internal/post/${postId}`),

    // Content Management (Stories)
    listStories: (params) => axios.get(`${STORY_SVC}/internal/list`, { params }),
    deleteStory: (id) => axios.delete(`${STORY_SVC}/internal/${id}`),
    getStoryViews: (id) => axios.get(`${STORY_SVC}/internal/${id}/views`),
    getStoryLikes: (id) => axios.get(`${STORY_SVC}/internal/${id}/likes`),

    // Unified Stats
    getServiceStats: (service) => axios.get(`${SVC_MAP[service]}/internal/stats`),

    getUserGrowth: (year) => axios.get(`${USER_SVC}/internal/growth?year=${year}`),

    getLoginMethods: () => axios.get(`${USER_SVC}/internal/login-methods`),

    getCountries: () => axios.get(`${USER_SVC}/internal/countries`),

    getRecentUsers: () => axios.get(`${USER_SVC}/internal/recent`),

    getRecentPosts: () => axios.get(`${POST_SVC}/internal/recent`),

    getTrendingHashtags: () => axios.get(`${POST_SVC}/internal/recent`).then(res => {
        // Fallback or real implementation for hashtags. 
        // For now, we simulate since hashtag service might not be fully implemented as separate.
        return {
            data: {
                success: true, data: [
                    { tag: '#jaadoe', count: 1200 },
                    { tag: '#lifestyle', count: 850 },
                    { tag: '#tech', count: 640 },
                    { tag: '#aesthetic', count: 430 }
                ]
            }
        };
    }),

    // Report Management
    getReportStats: (type) => axios.get(`${POST_SVC}/internal/reports/stats`, { params: { type } }),
    listReports: (params) => axios.get(`${POST_SVC}/internal/reports`, { params }),
    getReportById: (id) => axios.get(`${POST_SVC}/internal/reports/${id}`),
    updateReportStatus: (id, status, adminId) => axios.patch(`${POST_SVC}/internal/reports/${id}/status`, { status, adminId })
};



module.exports = internalApi;
