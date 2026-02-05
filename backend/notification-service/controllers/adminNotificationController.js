const AdminNotification = require('../models/AdminNotification');
const { Op } = require('sequelize');

exports.createBroadcast = async (req, res) => {
    try {
        const { title, message, target, country, platform, schedule } = req.body;

        // Mock logic to calculate recipients
        // In a real app, this would query User Service
        let recipientsCount = 0;
        let targetValue = null;

        if (target === 'all') {
            recipientsCount = 45231; // Mock total users
            targetValue = 'All Users';
        } else if (target === 'country') {
            recipientsCount = Math.floor(Math.random() * 10000) + 1000;
            targetValue = country;
        } else if (target === 'platform') {
            recipientsCount = Math.floor(Math.random() * 20000) + 5000;
            targetValue = platform;
        }

        const notification = await AdminNotification.create({
            title,
            message,
            target,
            targetValue,
            recipientsCount,
            status: schedule === 'later' ? 'scheduled' : 'sent',
            scheduledFor: schedule === 'later' ? new Date(Date.now() + 86400000) : null, // Mock +1 day
            sentAt: schedule === 'later' ? null : new Date()
        });

        res.json({ success: true, data: notification });
    } catch (error) {
        console.error('Create broadcast error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const history = await AdminNotification.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json({ success: true, data: history });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getStats = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        const totalRecipients = await AdminNotification.sum('recipientsCount');

        const sentToday = await AdminNotification.count({
            where: {
                createdAt: { [Op.gte]: today }
            }
        });

        const sentMonth = await AdminNotification.count({
            where: {
                createdAt: { [Op.gte]: firstDayOfMonth }
            }
        });

        res.json({
            success: true,
            data: {
                totalRecipients: totalRecipients || 0,
                sentToday: sentToday || 0,
                sentMonth: sentMonth || 0
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
