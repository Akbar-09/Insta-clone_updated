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

export const markAllNotificationsRead = async () => {
    try {
        return await api.patch('/notifications/read-all');
    } catch (error) {
        throw error;
    }
};

export const getUnreadNotificationCount = async () => {
    try {
        return await api.get('/notifications/unread-count');
    } catch (error) {
        throw error;
    }
};

