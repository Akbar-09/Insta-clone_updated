const Notification = require('../models/Notification');

const getNotifications = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) return res.status(400).json({ message: 'userId query param required' });

        const notifications = await Notification.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']]
        });

        res.json({ status: 'success', data: notifications });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

module.exports = { getNotifications };
