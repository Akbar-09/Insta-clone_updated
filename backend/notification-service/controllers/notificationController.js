const Notification = require('../models/Notification');
const NotificationSettings = require('../models/NotificationSettings');

const getNotifications = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.query.userId;
        const { limit } = req.query;
        if (!userId) return res.status(400).json({ message: 'userId query param or x-user-id header required' });

        const options = {
            where: { userId },
            order: [['createdAt', 'DESC']]
        };

        if (limit) {
            options.limit = parseInt(limit);
        }

        const notifications = await Notification.findAll(options);

        res.json({ status: 'success', data: notifications });
    } catch (error) {
        console.error('Get Notifications Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const markRead = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByPk(id);

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        notification.isRead = true;
        await notification.save();

        res.json({ status: 'success', data: notification });
    } catch (error) {
        console.error('Mark Read Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const markAllRead = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.body.userId;
        if (!userId) return res.status(400).json({ message: 'User ID required (body or x-user-id header)' });

        await Notification.update(
            { isRead: true },
            { where: { userId, isRead: false } }
        );

        res.json({ status: 'success', message: 'All notifications marked as read' });
    } catch (error) {
        console.error('Mark All Read Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getUnreadCount = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.query.userId;
        if (!userId) return res.status(400).json({ message: 'userId query param or x-user-id header required' });

        const count = await Notification.count({
            where: {
                userId,
                isRead: false
            }
        });

        res.json({ status: 'success', data: { count } });
    } catch (error) {
        console.error('Get Unread Count Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getSettings = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.query.userId;
        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        let settings = await NotificationSettings.findOne({ where: { userId } });

        if (!settings) {
            // Auto-create default settings
            settings = await NotificationSettings.create({ userId });
        }

        res.json({ status: 'success', data: settings });
    } catch (error) {
        console.error('Get Settings Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const updateSettings = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const updates = req.body;

        let settings = await NotificationSettings.findOne({ where: { userId } });

        if (!settings) {
            settings = await NotificationSettings.create({ userId, ...updates });
        } else {
            // Partial update
            await settings.update(updates);
        }

        res.json({ status: 'success', data: settings });
    } catch (error) {
        console.error('Update Settings Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

module.exports = {
    getNotifications,
    markRead,
    markAllRead,
    getUnreadCount,
    getSettings,
    updateSettings
};
