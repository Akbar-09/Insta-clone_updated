const { publishEvent } = require('../config/rabbitmq');
const { AuditLog } = require('../models');

exports.sendGlobalNotification = async (req, res) => {
    try {
        const { title, message, target } = req.body; // target: all, android, ios

        await publishEvent('GLOBAL_NOTIFICATION_SEND', { title, message, target, adminId: req.admin.id });

        await AuditLog.create({
            adminId: req.admin.id,
            adminUsername: req.admin.username,
            action: 'SEND_GLOBAL_NOTIFICATION',
            resourceType: 'NOTIFICATION',
            details: { title, target }
        });

        res.json({ success: true, message: 'Global notification queued' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getNotificationHistory = async (req, res) => {
    try {
        const history = await AuditLog.findAll({
            where: { action: 'SEND_GLOBAL_NOTIFICATION' },
            order: [['createdAt', 'DESC']]
        });
        res.json({ success: true, data: history });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
