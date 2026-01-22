import api from './axios';

export const getNotificationSettings = async () => {
    return await api.get('/notifications/settings');
};

export const updateNotificationSettings = async (updates) => {
    return await api.patch('/notifications/settings', updates);
};
