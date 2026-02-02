const { AuditLog } = require('../models');

exports.getAvatars = async (req, res) => {
    try {
        res.json({
            success: true, data: [
                { id: 1, url: '/uploads/default-avatar-1.png' },
                { id: 2, url: '/uploads/default-avatar-2.png' }
            ]
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.addAvatar = async (req, res) => {
    try {
        const { url } = req.body;
        await AuditLog.create({
            adminId: req.admin.id,
            adminUsername: req.admin.username,
            action: 'ADD_DEFAULT_AVATAR',
            resourceType: 'MEDIA',
            details: { url }
        });
        res.json({ success: true, message: 'Default avatar added' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
