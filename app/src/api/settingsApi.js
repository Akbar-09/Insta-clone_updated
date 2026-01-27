import api from './axios';

// Message Controls
export const getMessageSettings = async () => {
    return await api.get('/users/profile/settings/messages');
};

export const updateMessageSettings = async (data) => {
    return await api.patch('/users/profile/settings/messages', data);
};

// Story Replies
export const getStorySettings = async () => {
    return await api.get('/users/profile/settings/story-replies');
};

export const updateStorySettings = async (data) => {
    return await api.patch('/users/profile/settings/story-replies', data);
};

// Activity Status
export const getActivitySettings = async () => {
    return await api.get('/users/profile/settings/activity-status');
};

export const updateActivitySettings = async (data) => {
    return await api.patch('/users/profile/settings/activity-status', data);
};

// Tags & Mentions Settings
export const getTagsMentionsSettings = async () => {
    return await api.get('/users/profile/settings/tags-mentions');
};

export const updateTagsMentionsSettings = async (data) => {
    return await api.patch('/users/profile/settings/tags-mentions', data);
};

// Pending Tags
export const getPendingTags = async () => {
    return await api.get('/users/profile/tags/pending');
};

export const approveTag = async (id) => {
    return await api.patch(`/users/profile/tags/${id}/approve`);
};

export const removeTag = async (id) => {
    return await api.patch(`/users/profile/tags/${id}/remove`);
};

// Comments
export const getCommentSettings = async () => {
    return await api.get('/users/profile/settings/comments');
};
export const updateCommentSettings = async (data) => {
    return await api.put('/users/profile/settings/comments', data);
};

// Sharing
export const getSharingSettings = async () => {
    return await api.get('/users/profile/settings/sharing');
};
export const updateSharingSettings = async (data) => {
    return await api.put('/users/profile/settings/sharing', data);
};

// Restricted
export const getRestrictedAccounts = async () => {
    return await api.get('/users/profile/settings/restricted');
};
export const restrictUser = async (userId) => {
    return await api.post(`/users/profile/settings/restricted/${userId}`);
};
export const unrestrictUser = async (userId) => {
    return await api.delete(`/users/profile/settings/restricted/${userId}`);
};

// Hidden Words
export const getHiddenWordsSettings = async () => {
    return await api.get('/users/profile/settings/hidden-words');
};
export const updateHiddenWordsSettings = async (data) => {
    return await api.put('/users/profile/settings/hidden-words', data);
};
export const addHiddenWord = async (word) => {
    return await api.post('/users/profile/settings/hidden-words/words', { word });
};
export const deleteHiddenWord = async (id) => {
    return await api.delete(`/users/profile/settings/hidden-words/words/${id}`);
};

// Muted Accounts
export const getMutedAccounts = async () => {
    return await api.get('/users/profile/settings/muted');
};
export const muteUser = async (userId) => {
    return await api.post(`/users/profile/settings/muted/${userId}`);
};
export const unmuteUser = async (userId) => {
    return await api.delete(`/users/profile/settings/muted/${userId}`);
};

// Content Preferences
export const getContentPreferences = async () => {
    return await api.get('/users/profile/settings/content-preferences');
};
export const updateContentPreferences = async (data) => {
    return await api.patch('/users/profile/settings/content-preferences', data);
};

// Like & Share Counts
export const getLikeShareSettings = async () => {
    return await api.get('/users/profile/settings/like-share');
};
export const updateLikeShareSettings = async (data) => {
    return await api.patch('/users/profile/settings/like-share', data);
};

// Subscriptions
export const getSubscriptions = async () => {
    return await api.get('/users/profile/settings/subscriptions');
};

// General Settings
export const getGeneralSettings = async () => {
    return await api.get('/users/profile/settings/general');
};
export const updateGeneralSettings = async (data) => {
    return await api.patch('/users/profile/settings/general', data);
};

// Connected Apps
export const getConnectedApps = async (status) => {
    return await api.get('/users/profile/settings/apps', { params: { status } });
};
export const revokeAppAccess = async (id) => {
    return await api.patch(`/users/profile/settings/apps/${id}/revoke`);
};

// Help & Support
export const getAccountStatus = async () => {
    return await api.get('/users/profile/help/account-status');
};
export const getViolations = async () => {
    return await api.get('/users/profile/help/violations');
};
export const getFeatureLimits = async () => {
    return await api.get('/users/profile/help/feature-limits');
};
export const getSupportRequests = async () => {
    return await api.get('/users/profile/help/support-requests');
};
export const submitFeedback = async (rating) => {
    return await api.post('/users/profile/help/feedback', { rating });
};
