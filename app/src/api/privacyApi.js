import api from './axios';

// Close Friends
export const getCloseFriends = async () => {
    return await api.get('/users/profile/close-friends');
};

export const addCloseFriend = async (friendId) => {
    return await api.post(`/users/profile/close-friends/${friendId}`);
};

export const removeCloseFriend = async (friendId) => {
    return await api.delete(`/users/profile/close-friends/${friendId}`);
};

// Blocked Users
export const getBlockedUsers = async () => {
    return await api.get('/users/profile/blocked-users');
};

export const blockUser = async (userId) => {
    return await api.post(`/users/profile/block/${userId}`);
};

export const unblockUser = async (userId) => {
    return await api.delete(`/users/profile/unblock/${userId}`);
};

// Story Privacy
export const getHiddenFromStory = async () => {
    return await api.get('/users/profile/story-privacy/hidden-users');
};

export const hideStoryFromUser = async (hiddenUserId) => {
    return await api.post('/users/profile/story-privacy/hide', { hiddenUserId });
};

export const unhideStoryFromUser = async (hiddenUserId) => {
    return await api.delete(`/users/profile/story-privacy/unhide/${hiddenUserId}`);
};
