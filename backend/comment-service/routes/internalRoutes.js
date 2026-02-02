const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const { Op } = require('sequelize');

// List comments for moderation
router.get('/list', async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const offset = (parseInt(page) - 1) * parseInt(limit);
        const whereClause = {};

        if (status && status !== 'all') {
            whereClause.status = status;
        }

        const { count, rows } = await Comment.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset,
            order: [['createdAt', 'DESC']]
        });

        res.json({
            success: true,
            data: rows,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(count / parseInt(limit))
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Comment stats
router.get('/stats', async (req, res) => {
    try {
        const total = await Comment.count();
        const pending = await Comment.count({ where: { status: 'pending' } });
        const flagged = await Comment.count({ where: { status: 'flagged' } });

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const approvedToday = await Comment.count({
            where: {
                status: 'approved',
                updatedAt: { [Op.gte]: todayStart }
            }
        });

        const removedToday = await Comment.count({
            where: {
                status: 'removed',
                updatedAt: { [Op.gte]: todayStart }
            }
        });

        res.json({
            success: true,
            data: { total, pending, flagged, approvedToday, removedToday }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Single comment
router.get('/:commentId', async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.commentId);
        if (!comment) return res.status(404).json({ success: false, message: 'Comment not found' });
        res.json({ success: true, data: comment });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Approve comment
router.patch('/:commentId/approve', async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.commentId);
        if (!comment) return res.status(404).json({ success: false, message: 'Comment not found' });

        comment.status = 'approved';
        await comment.save();

        res.json({ success: true, message: 'Comment approved', data: comment });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Remove comment (soft moderation)
router.patch('/:commentId/remove', async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.commentId);
        if (!comment) return res.status(404).json({ success: false, message: 'Comment not found' });

        comment.status = 'removed';
        await comment.save();

        res.json({ success: true, message: 'Comment removed', data: comment });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Delete comment (permanent)
router.delete('/:commentId', async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.commentId);
        if (!comment) return res.status(404).json({ success: false, message: 'Comment not found' });

        const deletedData = { id: comment.id, userId: comment.userId, postId: comment.postId };
        await comment.destroy();

        res.json({ success: true, message: 'Comment deleted', data: deletedData });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/post/:postId', async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { postId: req.params.postId },
            order: [['createdAt', 'DESC']]
        });
        res.json({ success: true, data: comments });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
