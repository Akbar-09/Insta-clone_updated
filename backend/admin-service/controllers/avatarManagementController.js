const internalApi = require('../services/internalApi');
const AuditLog = require('../models/AuditLog');

exports.listAvatars = async (req, res) => {
    try {
        const response = await internalApi.listAvatars(req.query);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getAvatarStats = async (req, res) => {
    try {
        const response = await internalApi.getAvatarStats();
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.approveAvatar = async (req, res) => {
    try {
        const response = await internalApi.approveAvatar(req.params.avatarId);
        if (response.data.success) {
            await AuditLog.create({
                adminId: req.admin.id,
                actionType: 'approve_avatar',
                targetType: 'avatar',
                targetId: req.params.avatarId,
                metadata: { userId: response.data.data.userId }
            });
        }
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.rejectAvatar = async (req, res) => {
    try {
        const response = await internalApi.rejectAvatar(req.params.avatarId);
        if (response.data.success) {
            await AuditLog.create({
                adminId: req.admin.id,
                actionType: 'reject_avatar',
                targetType: 'avatar',
                targetId: req.params.avatarId,
                metadata: { userId: response.data.data.userId }
            });
        }
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.removeAvatar = async (req, res) => {
    try {
        const response = await internalApi.deleteAvatar(req.params.avatarId);
        if (response.data.success) {
            await AuditLog.create({
                adminId: req.admin.id,
                actionType: 'remove_avatar',
                targetType: 'avatar',
                targetId: req.params.avatarId,
                metadata: { description: 'Avatar removed by admin' }
            });
        }
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
