const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const { Sequelize } = require('sequelize');

router.get('/stats', async (req, res) => {
    try {
        const total = await Story.count();
        res.json({
            success: true,
            data: { total }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/list', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const status = req.query.status; // live | expired
        const search = req.query.search || '';
        const offset = (page - 1) * limit;

        const whereClause = {
            username: { [Sequelize.Op.iLike]: `%${search}%` }
        };

        if (status === 'live') {
            whereClause.expiresAt = { [Sequelize.Op.gt]: new Date() };
        } else if (status === 'expired') {
            whereClause.expiresAt = { [Sequelize.Op.lte]: new Date() };
        }

        const { count, rows } = await Story.findAndCountAll({
            where: whereClause,
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

router.get('/:storyId/views', async (req, res) => {
    try {
        const StoryView = require('../models/StoryView');
        const views = await StoryView.findAll({
            where: { storyId: req.params.storyId },
            order: [['viewedAt', 'DESC']]
        });
        res.json({ success: true, data: views });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.get('/:storyId/likes', async (req, res) => {
    try {
        const StoryReaction = require('../models/StoryReaction');
        const likes = await StoryReaction.findAll({
            where: { storyId: req.params.storyId, type: 'LIKE' },
            order: [['createdAt', 'DESC']]
        });
        res.json({ success: true, data: likes });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.delete('/:storyId', async (req, res) => {
    try {
        const story = await Story.findByPk(req.params.storyId);
        if (!story) return res.status(404).json({ success: false, message: 'Story not found' });
        await story.destroy();
        res.json({ success: true, message: 'Story deleted' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
