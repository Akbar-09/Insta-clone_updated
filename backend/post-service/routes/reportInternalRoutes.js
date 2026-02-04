const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const Post = require('../models/Post');
const { Op } = require('sequelize');

// Get report statistics
router.get('/reports/stats', async (req, res) => {
    try {
        const { type } = req.query;
        let count = 0;

        if (type === 'pending') {
            count = await Report.count({ where: { status: 'pending' } });
        } else if (type === 'review') {
            count = await Report.count({ where: { status: 'review' } });
        } else if (type === 'resolved_today') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            count = await Report.count({
                where: {
                    status: 'resolved',
                    updatedAt: { [Op.gte]: today }
                }
            });
        }

        res.json({ success: true, data: { count } });
    } catch (error) {
        console.error('Get Report Stats Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// List reports with pagination and filtering
router.get('/reports', async (req, res) => {
    try {
        const { status = 'pending', page = 1, limit = 10 } = req.query;
        const offset = (parseInt(page) - 1) * parseInt(limit);

        const where = {};
        if (status && status !== 'all') {
            where.status = status;
        }

        const { count, rows } = await Report.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: Post,
                    as: 'post',
                    attributes: ['id', 'userId', 'username', 'mediaUrl', 'caption']
                }
            ]
        });

        // Format the response
        const reports = rows.map(report => ({
            id: report.id,
            postId: report.postId,
            reportedBy: report.userId,
            reason: report.reason,
            description: report.details,
            status: report.status,
            created_at: report.createdAt,
            updated_at: report.updatedAt,
            content_type: 'post',
            reportedUsername: report.post?.username || 'Unknown',
            reportedUserId: report.post?.userId,
            content: report.post ? {
                id: report.post.id,
                userId: report.post.userId,
                username: report.post.username,
                mediaUrl: report.post.mediaUrl,
                caption: report.post.caption
            } : null
        }));

        res.json({
            success: true,
            data: reports,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: count,
                totalPages: Math.ceil(count / parseInt(limit))
            }
        });
    } catch (error) {
        console.error('List Reports Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get report by ID
router.get('/reports/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const report = await Report.findByPk(id, {
            include: [
                {
                    model: Post,
                    as: 'post',
                    attributes: ['id', 'userId', 'username', 'mediaUrl', 'caption', 'mediaType']
                }
            ]
        });

        if (!report) {
            return res.status(404).json({ success: false, message: 'Report not found' });
        }

        const formattedReport = {
            id: report.id,
            postId: report.postId,
            reportedBy: report.userId,
            reason: report.reason,
            description: report.details,
            status: report.status,
            created_at: report.createdAt,
            updated_at: report.updatedAt,
            content_type: 'post',
            reportedUserId: report.post?.userId,
            reportedUser: {
                userId: report.post?.userId,
                username: report.post?.username,
                profilePicture: null // Will be fetched from user service if needed
            },
            content: report.post ? {
                id: report.post.id,
                userId: report.post.userId,
                username: report.post.username,
                mediaUrl: report.post.mediaUrl,
                caption: report.post.caption,
                mediaType: report.post.mediaType
            } : null
        };

        res.json({ success: true, data: formattedReport });
    } catch (error) {
        console.error('Get Report By ID Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update report status
router.patch('/reports/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status, adminId } = req.body;

        const report = await Report.findByPk(id);
        if (!report) {
            return res.status(404).json({ success: false, message: 'Report not found' });
        }

        report.status = status;
        await report.save();

        console.log(`[Report] Status updated: Report ${id} set to ${status} by Admin ${adminId}`);

        res.json({ success: true, message: 'Report status updated', data: report });
    } catch (error) {
        console.error('Update Report Status Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
