import api from './axios';

export const getNotifications = async (limit) => {
    try {
        const url = limit ? `/notifications?limit=${limit}` : '/notifications';
        return await api.get(url);
    } catch (error) {
        throw error;
    }
};

export const markNotificationRead = async (id) => {
    try {
        return await api.patch(`/notifications/${id}/read`);
    } catch (error) {
        throw error;
    }
};

export const markAllNotificationsRead = async (userId) => {
    try {
        return await api.patch('/notifications/read-all', { userId });
    } catch (error) {
        throw error;
    }
};

export const getUnreadNotificationCount = async (userId) => {
    try {
        return await api.get(`/notifications/unread-count?userId=${userId}`);
    } catch (error) {
        throw error;
    }
};
