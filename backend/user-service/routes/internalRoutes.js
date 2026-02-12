const express = require('express');
const router = express.Router();
const UserProfile = require('../models/UserProfile');
const { Sequelize } = require('sequelize');
const followService = require('../services/followService');

const Avatar = require('../models/Avatar');
const Report = require('../models/Report');

// Internal Report Management (for Admin) - Move to top to avoid collision with /:userId
router.get('/reports/stats', async (req, res) => {
    try {
        const { type } = req.query;
        let count = 0;

        if (type === 'pending') {
            count = await Report.count({ where: { status: 'pending' } });
        } else if (type === 'review') {
            count = await Report.count({ where: { status: 'reviewing' } });
        } else if (type === 'resolved_today') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            count = await Report.count({
                where: {
                    status: 'resolved',
                    updatedAt: { [Sequelize.Op.gte]: today }
                }
            });
        }

        res.json({ success: true, data: { count } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/reports', async (req, res) => {
    try {
        const { status = 'pending', page = 1, limit = 10 } = req.query;
        const offset = (parseInt(page) - 1) * parseInt(limit);

        const where = {};
        if (status && status !== 'all') {
            where.status = status === 'review' ? 'reviewing' : status;
        }

        const { count, rows } = await Report.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset,
            order: [['createdAt', 'DESC']]
        });

        // Format similarly to post reports for UI consistency
        const reports = rows.map(report => ({
            id: report.id,
            userId: report.userId,
            reportedUsername: report.username || 'Unknown User',
            reason: 'App Feedback / Problem',
            description: report.text,
            status: report.status,
            created_at: report.createdAt,
            updated_at: report.updatedAt,
            content_type: 'app_feedback',
            reportedUserId: report.userId,
            files: report.files,
            browserInfo: report.browserInfo
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
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/reports/:id', async (req, res) => {
    try {
        const report = await Report.findByPk(req.params.id);
        if (!report) return res.status(404).json({ success: false, message: 'Report not found' });

        const formatted = {
            id: report.id,
            userId: report.userId,
            reportedUsername: report.username,
            reason: 'App Feedback',
            description: report.text,
            status: report.status,
            created_at: report.createdAt,
            updated_at: report.updatedAt,
            content_type: 'app_feedback',
            reportedUserId: report.userId,
            reportedUser: {
                userId: report.userId,
                username: report.username,
                profilePicture: null
            },
            files: report.files,
            browserInfo: report.browserInfo
        };

        res.json({ success: true, data: formatted });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.patch('/reports/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const report = await Report.findByPk(req.params.id);
        if (!report) return res.status(404).json({ success: false, message: 'Report not found' });

        report.status = status;
        await report.save();

        res.json({ success: true, message: 'Status updated', data: report });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/stats', async (req, res) => {
    try {
        const total = await UserProfile.count();
        // Simple growth: users in last 30 days vs total
        const lastMonth = await UserProfile.count({
            where: {
                createdAt: {
                    [Sequelize.Op.gte]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
                }
            }
        });
        const growth = total > 0 ? Math.round((lastMonth / total) * 100) : 0;

        res.json({
            success: true,
            data: { total, growth }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Avatar Moderation Endpoints
router.get('/avatars', async (req, res) => {
    try {
        const { status, page = 1, limit = 12 } = req.query;
        const offset = (parseInt(page) - 1) * parseInt(limit);
        const whereClause = status && status !== 'all' ? { status } : {};

        const { count, rows } = await Avatar.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset,
            order: [['uploadedAt', 'DESC']]
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

router.get('/avatars/stats', async (req, res) => {
    try {
        const [total, pending, approved, rejected] = await Promise.all([
            Avatar.count(),
            Avatar.count({ where: { status: 'pending' } }),
            Avatar.count({ where: { status: 'approved' } }),
            Avatar.count({ where: { status: 'rejected' } })
        ]);

        res.json({
            success: true,
            data: { total, pending, approved, rejected }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.patch('/avatars/:avatarId/approve', async (req, res) => {
    try {
        const avatar = await Avatar.findByPk(req.params.avatarId);
        if (!avatar) return res.status(404).json({ success: false, message: 'Avatar not found' });

        avatar.status = 'approved';
        await avatar.save();

        // Set as active profile picture in UserProfile
        const user = await UserProfile.findOne({ where: { userId: avatar.userId } });
        if (user) {
            user.profilePicture = avatar.avatarUrl;
            await user.save();
        }

        res.json({ success: true, message: 'Avatar approved successfully', data: avatar });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.patch('/avatars/:avatarId/reject', async (req, res) => {
    try {
        const avatar = await Avatar.findByPk(req.params.avatarId);
        if (!avatar) return res.status(404).json({ success: false, message: 'Avatar not found' });

        avatar.status = 'rejected';
        await avatar.save();

        res.json({ success: true, message: 'Avatar rejected successfully', data: avatar });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.delete('/avatars/:avatarId', async (req, res) => {
    try {
        if (!/^\d+$/.test(req.params.avatarId)) {
            return res.status(400).json({ success: false, message: 'Invalid Avatar ID. Expected Integer.' });
        }
        const avatar = await Avatar.findByPk(req.params.avatarId);
        if (!avatar) return res.status(404).json({ success: false, message: 'Avatar not found' });

        const userId = avatar.userId;
        await avatar.destroy();

        // If it was the active profile picture, reset it
        const user = await UserProfile.findOne({ where: { userId } });
        if (user && user.profilePicture === avatar.avatarUrl) {
            user.profilePicture = ''; // Or default
            await user.save();
        }

        res.json({ success: true, message: 'Avatar removed successfully' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/growth', async (req, res) => {
    try {
        const year = req.query.year || new Date().getFullYear();
        // Group by month
        const stats = await UserProfile.findAll({
            attributes: [
                [Sequelize.fn('to_char', Sequelize.col('createdAt'), 'Mon'), 'month'],
                [Sequelize.fn('count', Sequelize.col('id')), 'count']
            ],
            where: Sequelize.where(Sequelize.fn('extract', Sequelize.literal('year from "createdAt"')), year),
            group: ['month'],
            order: [[Sequelize.fn('min', Sequelize.col('createdAt')), 'ASC']]
        });
        res.json({ success: true, data: stats });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/login-methods', async (req, res) => {
    try {
        const stats = await UserProfile.findAll({
            attributes: [
                ['loginProvider', 'method'],
                [Sequelize.fn('count', Sequelize.col('id')), 'count']
            ],
            group: ['loginProvider']
        });
        res.json({ success: true, data: stats });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/countries', async (req, res) => {
    try {
        const stats = await UserProfile.findAll({
            attributes: [
                ['country', 'name'],
                [Sequelize.fn('count', Sequelize.col('id')), 'count']
            ],
            group: ['country'],
            order: [[Sequelize.fn('count', Sequelize.col('id')), 'DESC']]
        });
        res.json({ success: true, data: stats });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/list', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const search = req.query.search || '';
        const offset = (page - 1) * limit;

        const where = {
            [Sequelize.Op.or]: [
                { username: { [Sequelize.Op.iLike]: `%${search}%` } },
                { fullName: { [Sequelize.Op.iLike]: `%${search}%` } }
            ]
        };

        if (req.query.status) {
            where.accountStatus = req.query.status;
        }

        const { count, rows } = await UserProfile.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        res.json({
            success: true,
            data: rows,
            pagination: {
                total: count,
                page,
                limit,
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.patch('/:userId/ban', async (req, res) => {
    try {
        const user = await UserProfile.findOne({ where: { userId: req.params.userId } });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        user.accountStatus = 'banned';
        await user.save();
        res.json({ success: true, message: 'User banned' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.patch('/:userId/unban', async (req, res) => {
    try {
        const user = await UserProfile.findOne({ where: { userId: req.params.userId } });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        user.accountStatus = 'active';
        await user.save();
        res.json({ success: true, message: 'User unbanned' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        const user = await UserProfile.findOne({ where: { userId: req.params.userId } });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        // Soft delete logic
        user.accountStatus = 'deleted';
        await user.save();
        res.json({ success: true, message: 'User soft deleted' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/recent', async (req, res) => {
    try {
        const users = await UserProfile.findAll({
            where: {
                accountStatus: { [Sequelize.Op.ne]: 'deleted' }
            },
            limit: 10,
            order: [['createdAt', 'DESC']]
        });
        res.json({ success: true, data: users });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.post('/bulk', async (req, res) => {
    try {
        const { userIds } = req.body;
        if (!Array.isArray(userIds)) return res.status(400).json({ success: false, message: 'userIds must be an array' });
        const users = await UserProfile.findAll({
            where: { userId: { [Sequelize.Op.in]: userIds } }
        });
        res.json({ success: true, data: users });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const user = await UserProfile.findOne({ where: { userId: req.params.userId } });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        res.json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/:userId/follow-counts', async (req, res) => {
    try {
        const counts = await followService.getFollowCounts(req.params.userId);
        res.json({ success: true, data: counts });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});



module.exports = router;

