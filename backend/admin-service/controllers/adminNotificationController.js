const internalApi = require('../services/internalApi');
const { AuditLog } = require('../models');

exports.sendGlobalNotification = async (req, res) => {
    try {
        const { title, message, target, country, platform, schedule } = req.body;

        // Call notification service to create broadcast
        const response = await internalApi.createBroadcast(req.body);

        await AuditLog.create({
            adminId: req.admin.id,
            adminUsername: req.admin.username,
            action: 'SEND_GLOBAL_NOTIFICATION',
            resourceType: 'NOTIFICATION',
            details: { title, target, notificationId: response.data.data.id }
        });

        res.json({ success: true, message: 'Notification scheduled/sent', data: response.data.data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getNotificationHistory = async (req, res) => {
    try {
        const response = await internalApi.getBroadcastHistory();
        res.json({ success: true, data: response.data.data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getNotificationStats = async (req, res) => {
    try {
        const response = await internalApi.getBroadcastStats();
        res.json({ success: true, data: response.data.data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
