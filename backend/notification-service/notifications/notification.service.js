const Notification = require('../models/Notification');

const getNotifications = async (userId, limit = 20, offset = 0) => {
    return await Notification.findAndCountAll({
        where: { userId },
        limit,
        offset,
        order: [['createdAt', 'DESC']]
    });
};

const markAsRead = async (id, userId) => {
    return await Notification.update(
        { isRead: true },
        { where: { id, userId } }
    );
};

const markAllAsRead = async (userId) => {
    return await Notification.update(
        { isRead: true },
        { where: { userId, isRead: false } }
    );
};

const deleteNotification = async (id, userId) => {
    return await Notification.destroy({
        where: { id, userId }
    });
};

const getUnreadCount = async (userId) => {
    return await Notification.count({
        where: { userId, isRead: false }
    });
};



module.exports = {
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getUnreadCount
};
