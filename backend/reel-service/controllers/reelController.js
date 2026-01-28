const Reel = require('../models/Reel');
const ReelLike = require('../models/ReelLike');
const { publishEvent } = require('../config/rabbitmq');
const { Op } = require('sequelize');

const createReel = async (req, res) => {
    try {
        const { userId, username, caption, videoUrl } = req.body;

        const reel = await Reel.create({
            userId,
            username,
            caption,
            videoUrl
        });

        // Publish Event
        await publishEvent('REEL_CREATED', reel.toJSON());

        res.status(201).json({ status: 'success', data: reel });
    } catch (error) {
        console.error('Create Reel Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getReels = async (req, res) => {
    try {
        const currentUserId = req.headers['x-user-id'];
        const reels = await Reel.findAll({ order: [['createdAt', 'DESC']] });

        let likedReelIds = new Set();
        if (currentUserId && reels.length > 0) {
            const likes = await ReelLike.findAll({
                where: {
                    userId: currentUserId,
                    reelId: { [Op.in]: reels.map(r => r.id) }
                }
            });
            likedReelIds = new Set(likes.map(l => l.reelId));
        }

        const enrichedReels = reels.map(reel => ({
            ...reel.toJSON(),
            isLiked: likedReelIds.has(reel.id),
            comments: reel.commentsCount || 0 // Explicit mapping for frontend consistency
        }));

        res.json({ status: 'success', data: enrichedReels });
    } catch (error) {
        console.error('Get Reels Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getUserReels = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.query.userId;
        const { sort = 'newest', startDate, endDate } = req.query;

        if (!userId) return res.status(400).json({ message: 'User ID required' });

        const whereClause = { userId };
        if (startDate && endDate) {
            whereClause.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }

        const reels = await Reel.findAll({
            where: whereClause,
            order: [['createdAt', sort === 'oldest' ? 'ASC' : 'DESC']]
        });
        res.json({ status: 'success', data: reels });
    } catch (error) {
        console.error('Get User Reels Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const likeReel = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers['x-user-id'] || req.body.userId;

        if (!userId) return res.status(400).json({ message: 'User ID required' });

        const existing = await ReelLike.findOne({ where: { reelId: id, userId } });
        if (existing) return res.json({ status: 'success', message: 'Already liked' });

        await ReelLike.create({ reelId: id, userId });

        const reel = await Reel.findByPk(id);
        if (reel) {
            reel.likesCount += 1;
            await reel.save();
        }

        res.json({ status: 'success' });
    } catch (error) {
        console.error('Like Reel Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const unlikeReel = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers['x-user-id'] || req.query.userId;

        if (!userId) return res.status(400).json({ message: 'User ID required' });

        const existing = await ReelLike.findOne({ where: { reelId: id, userId } });
        if (!existing) return res.json({ status: 'success', message: 'Not liked' });

        await existing.destroy();

        const reel = await Reel.findByPk(id);
        if (reel) {
            reel.likesCount = Math.max(0, reel.likesCount - 1);
            await reel.save();
        }

        res.json({ status: 'success' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getLikedReels = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.query.userId;
        const { sort = 'newest', startDate, endDate } = req.query;

        if (!userId) return res.status(400).json({ message: 'User ID required' });

        const whereClause = { userId };
        if (startDate && endDate) {
            whereClause.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }

        // Get IDs of liked reels, sorted by LIKE creation time
        const likes = await ReelLike.findAll({
            where: whereClause,
            order: [['createdAt', sort === 'oldest' ? 'ASC' : 'DESC']]
        });

        const reelIds = likes.map(like => like.reelId);

        // Fetch reels
        const reels = await Reel.findAll({
            where: { id: reelIds }
        });

        // Map reels back to the order of likes
        const reelsMap = new Map(reels.map(r => [r.id, r]));
        const orderedReels = [];

        for (const like of likes) {
            const reel = reelsMap.get(like.reelId);
            if (reel) {
                orderedReels.push({
                    ...reel.toJSON(),
                    likedAt: like.createdAt,
                    isLiked: true
                });
            }
        }

        res.json({ status: 'success', data: orderedReels });
    } catch (error) {
        console.error('Get Liked Reels Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getActivityReels = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.query.userId;
        const { sort = 'newest', startDate, endDate } = req.query;

        if (!userId) return res.status(400).json({ message: 'User ID required' });

        const whereClause = { userId };
        if (startDate && endDate) {
            whereClause.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }

        const reels = await Reel.findAll({
            where: whereClause,
            order: [['createdAt', sort === 'oldest' ? 'ASC' : 'DESC']]
        });
        res.json({ status: 'success', data: reels });
    } catch (error) {
        console.error('Get Activity Reels Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

module.exports = {
    createReel,
    getReels,
    getUserReels,
    likeReel,
    unlikeReel,
    getLikedReels,
    getActivityReels
};
