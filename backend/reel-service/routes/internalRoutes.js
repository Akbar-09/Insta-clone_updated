const express = require('express');
const router = express.Router();
const Reel = require('../models/Reel');
const { Sequelize } = require('sequelize');

router.get('/stats', async (req, res) => {
    try {
        const total = await Reel.count();
        const lastMonth = await Reel.count({
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


router.get('/stats/user/:userId', async (req, res) => {
    try {
        const count = await Reel.count({ where: { userId: req.params.userId } });
        res.json({ success: true, data: { count } });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const reels = await Reel.findAll({
            where: { userId: req.params.userId },
            order: [['createdAt', 'DESC']]
        });
        res.json({ success: true, data: reels });
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

        const { count, rows } = await Reel.findAndCountAll({
            where: {
                username: { [Sequelize.Op.iLike]: `%${search}%` }
            },
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

router.patch('/:reelId/hide', async (req, res) => {
    try {
        const reel = await Reel.findByPk(req.params.reelId);
        if (!reel) return res.status(404).json({ success: false, message: 'Reel not found' });
        reel.isHidden = true;
        await reel.save();
        res.json({ success: true, message: 'Reel hidden' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.patch('/:reelId/unhide', async (req, res) => {
    try {
        const reel = await Reel.findByPk(req.params.reelId);
        if (!reel) return res.status(404).json({ success: false, message: 'Reel not found' });
        reel.isHidden = false;
        await reel.save();
        res.json({ success: true, message: 'Reel unhidden' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.delete('/:reelId', async (req, res) => {
    try {
        const reel = await Reel.findByPk(req.params.reelId);
        if (!reel) return res.status(404).json({ success: false, message: 'Reel not found' });
        await reel.destroy();
        res.json({ success: true, message: 'Reel deleted' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/recent', async (req, res) => {
    try {
        const reels = await Reel.findAll({
            where: { isHidden: false },
            limit: 10,
            order: [['createdAt', 'DESC']]
        });
        res.json({ success: true, data: reels });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/:reelId', async (req, res) => {
    try {
        const reel = await Reel.findByPk(req.params.reelId);
        if (!reel) return res.status(404).json({ success: false, message: 'Reel not found' });
        res.json({ success: true, data: reel });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/:reelId/likes', async (req, res) => {
    try {
        const ReelLike = require('../models/ReelLike');
        const likes = await ReelLike.findAll({
            where: { reelId: req.params.reelId },
            order: [['createdAt', 'DESC']]
        });
        res.json({ success: true, data: likes });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;

