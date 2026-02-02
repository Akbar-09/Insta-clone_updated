const { AuditLog } = require('../models');
const internalApi = require('../services/internalApi');

exports.listComments = async (req, res) => {
    try {
        const { status, page, limit } = req.query;
        const response = await internalApi.listComments({ status, page, limit });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getCommentStats = async (req, res) => {
    try {
        const response = await internalApi.getCommentStats();
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.approveComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const response = await internalApi.approveComment(commentId);

        if (response.data.success) {
            await AuditLog.create({
                adminId: req.admin.id,
                actionType: 'approve_comment',
                targetType: 'comment',
                targetId: commentId,
                metadata: {
                    userId: response.data.data.userId,
                    postId: response.data.data.postId
                }
            });
        }

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const response = await internalApi.deleteComment(commentId);

        if (response.data.success) {
            await AuditLog.create({
                adminId: req.admin.id,
                actionType: 'delete_comment',
                targetType: 'comment',
                targetId: commentId,
                metadata: {
                    userId: response.data.data.userId,
                    postId: response.data.data.postId
                }
            });
        }

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.removeComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const response = await internalApi.removeComment(commentId);

        if (response.data.success) {
            await AuditLog.create({
                adminId: req.admin.id,
                actionType: 'remove_comment',
                targetType: 'comment',
                targetId: commentId,
                metadata: {
                    userId: response.data.data.userId,
                    postId: response.data.data.postId
                }
            });
        }

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
