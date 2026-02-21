const notificationService = require('./notification.service');

const getNotifications = async (req, res) => {
    try {
        const userId = req.user.id; // From JWT
        const limit = parseInt(req.query.limit) || 20;
        const offset = parseInt(req.query.offset) || 0;
        const result = await notificationService.getNotifications(userId, limit, offset);
        res.json({ status: 'success', data: result.rows });
    } catch (error) {
        console.error('getNotifications Error:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const markAsRead = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        await notificationService.markAsRead(id, userId);
        res.json({ status: 'success', message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const markAllAsRead = async (req, res) => {
    try {
        const userId = req.user.id;
        await notificationService.markAllAsRead(userId);
        res.json({ status: 'success', message: 'All notifications marked as read' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        await notificationService.deleteNotification(id, userId);
        res.json({ status: 'success', message: 'Notification deleted' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const clearAllNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        await notificationService.deleteAllNotifications(userId);
        res.json({ status: 'success', message: 'All notifications cleared' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const getUnreadCount = async (req, res) => {
    try {
        const userId = req.user.id;
        const count = await notificationService.getUnreadCount(userId);
        res.json({ status: 'success', data: { count } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    getUnreadCount
};

