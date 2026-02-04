const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { Sequelize } = require('sequelize');

// 1. Stats and specific routes FIRST
router.get('/stats', async (req, res) => {
    try {
        const total = await Post.count();
        const lastMonth = await Post.count({
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

router.get('/stats/overall', async (req, res) => {
    try {
        const stats = await Post.findOne({
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('likesCount')), 'totalLikes'],
                [Sequelize.fn('SUM', Sequelize.col('commentsCount')), 'totalComments'],
                [Sequelize.fn('SUM', Sequelize.col('viewsCount')), 'totalViews']
            ]
        });

        res.json({
            success: true,
            data: {
                likes: parseInt(stats?.get('totalLikes') || 0),
                comments: parseInt(stats?.get('totalComments') || 0),
                views: parseInt(stats?.get('totalViews') || 0)
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/stats/engagement', async (req, res) => {
    try {
        const result = await Post.findOne({
            attributes: [
                [Sequelize.fn('sum', Sequelize.literal('COALESCE("likesCount", 0) + COALESCE("commentsCount", 0)')), 'totalInteractions'],
                [Sequelize.fn('sum', Sequelize.col('viewsCount')), 'totalViews']
            ]
        });

        const interactions = parseFloat(result.getDataValue('totalInteractions')) || 0;
        const views = parseFloat(result.getDataValue('totalViews')) || 0;
        const rate = views > 0 ? (interactions / views) * 100 : 0;

        res.json({ success: true, data: { rate: rate.toFixed(1) } });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/engagement/trends', async (req, res) => {
    try {
        const year = new Date().getFullYear();
        const trends = await Post.findAll({
            attributes: [
                [Sequelize.fn('to_char', Sequelize.col('createdAt'), 'Mon'), 'month'],
                [Sequelize.fn('AVG', Sequelize.literal('"likesCount" + "commentsCount"')), 'avgEngagement'],
                [Sequelize.fn('SUM', Sequelize.col('viewsCount')), 'totalViews']
            ],
            where: Sequelize.where(Sequelize.fn('extract', Sequelize.literal('year from "createdAt"')), year),
            group: [Sequelize.fn('to_char', Sequelize.col('createdAt'), 'Mon')],
            order: [[Sequelize.fn('min', Sequelize.col('createdAt')), 'ASC']]
        });

        const data = trends.map(t => {
            const avgEng = parseFloat(t.getDataValue('avgEngagement')) || 0;
            return {
                month: t.getDataValue('month'),
                engagementRate: avgEng.toFixed(1)
            };
        });

        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/top', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const posts = await Post.findAll({
            order: [[Sequelize.literal('"likesCount" + "commentsCount" + "viewsCount"'), 'DESC']],
            limit,
            attributes: ['id', 'username', 'likesCount', 'commentsCount', 'viewsCount', 'mediaUrl', 'mediaType']
        });

        const enriched = posts.map(p => {
            const views = p.viewsCount || 0;
            const engagement = p.likesCount + p.commentsCount;
            const rate = views > 0 ? ((engagement / views) * 100).toFixed(1) : '0.0';
            return {
                contentId: p.id,
                creatorUsername: p.username,
                views: views,
                likes: p.likesCount,
                engagementRate: rate
            };
        });

        res.json({ success: true, data: enriched });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/recent', async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: { isHidden: false },
            limit: 10,
            order: [['createdAt', 'DESC']]
        });
        res.json({ success: true, data: posts });
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

        // Define association dynamically if not defined centrally
        const UserProfile = require('../models/UserProfile');
        Post.belongsTo(UserProfile, { foreignKey: 'userId', targetKey: 'userId' });

        const { count, rows } = await Post.findAndCountAll({
            where: {
                username: { [Sequelize.Op.iLike]: `%${search}%` }
            },
            include: [{
                model: UserProfile,
                attributes: ['profilePicture'],
                required: false
            }],
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        // Flatten data for easier consumption
        const flatRows = rows.map(r => {
            const json = r.toJSON();
            return {
                ...json,
                userProfilePicture: json.UserProfile?.profilePicture || null
            };
        });

        res.json({
            success: true,
            data: flatRows,
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

// 2. Parameterized routes LAST
router.get('/stats/user/:userId', async (req, res) => {
    try {
        const count = await Post.count({ where: { userId: req.params.userId } });
        res.json({ success: true, data: { count } });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: { userId: req.params.userId },
            order: [['createdAt', 'DESC']]
        });
        res.json({ success: true, data: posts });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.patch('/:postId/hide', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.postId);
        if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
        post.isHidden = true;
        await post.save();
        res.json({ success: true, message: 'Post hidden' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.patch('/:postId/unhide', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.postId);
        if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
        post.isHidden = false;
        await post.save();
        res.json({ success: true, message: 'Post unhidden' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.delete('/:postId', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.postId);
        if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
        await post.destroy();
        res.json({ success: true, message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.postId);
        if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
        res.json({ success: true, data: post });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/:postId/likes', async (req, res) => {
    try {
        const Like = require('../models/Like');
        const likes = await Like.findAll({
            where: { postId: req.params.postId },
            order: [['createdAt', 'DESC']]
        });
        res.json({ success: true, data: likes });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/:postId/bookmarks', async (req, res) => {
    try {
        const SavedPost = require('../models/SavedPost');
        const bookmarks = await SavedPost.findAll({
            where: { postId: req.params.postId },
            order: [['createdAt', 'DESC']]
        });
        res.json({ success: true, data: bookmarks });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;


