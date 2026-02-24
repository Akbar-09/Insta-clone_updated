const Reel = require('../models/Reel');
const ReelLike = require('../models/ReelLike');
const ReelBookmark = require('../models/ReelBookmark');
const ReelReport = require('../models/ReelReport');
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
        const reels = await Reel.findAll({ where: { isHidden: false }, order: [['createdAt', 'DESC']] });

        let likedReelIds = new Set();
        let savedReelIds = new Set();

        if (currentUserId && reels.length > 0) {
            const [likes, bookmarks] = await Promise.all([
                ReelLike.findAll({
                    where: {
                        userId: currentUserId,
                        reelId: { [Op.in]: reels.map(r => r.id) }
                    }
                }),
                ReelBookmark.findAll({
                    where: {
                        userId: currentUserId,
                        reelId: { [Op.in]: reels.map(r => r.id) }
                    }
                })
            ]);
            likedReelIds = new Set(likes.map(l => l.reelId));
            savedReelIds = new Set(bookmarks.map(b => b.reelId));
        }

        const enrichedReels = reels.map(reel => ({
            ...reel.toJSON(),
            isLiked: likedReelIds.has(reel.id),
            isSaved: savedReelIds.has(reel.id),
            comments: reel.commentsCount || 0
        }));

        res.json({ status: 'success', data: enrichedReels });
    } catch (error) {
        console.error('Get Reels Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getUserReels = async (req, res) => {
    try {
        const { username, userId: queryUserId } = req.query;
        const currentUserId = req.headers['x-user-id'];
        const userId = queryUserId || currentUserId;
        const { sort = 'newest', startDate, endDate } = req.query;

        console.log(`[ReelService] getUserReels query: username=${username}, userId=${userId}`);

        const whereClause = {};
        if (username) whereClause.username = username;
        if (userId) whereClause.userId = userId;

        if (startDate && endDate) {
            whereClause.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }

        whereClause.isHidden = false;  // Exclude reels with broken/lost media
        const reels = await Reel.findAll({
            where: whereClause,
            order: [['createdAt', sort === 'oldest' ? 'ASC' : 'DESC']]
        });

        // Add isLiked and isSaved status
        let likedReelIds = new Set();
        let savedReelIds = new Set();
        if (currentUserId && reels.length > 0) {
            const [likes, bookmarks] = await Promise.all([
                ReelLike.findAll({
                    where: {
                        userId: currentUserId,
                        reelId: { [Op.in]: reels.map(r => r.id) }
                    }
                }),
                ReelBookmark.findAll({
                    where: {
                        userId: currentUserId,
                        reelId: { [Op.in]: reels.map(r => r.id) }
                    }
                })
            ]);
            likedReelIds = new Set(likes.map(l => l.reelId));
            savedReelIds = new Set(bookmarks.map(b => b.reelId));
        }

        const enrichedReels = reels.map(reel => ({
            ...reel.toJSON(),
            isLiked: likedReelIds.has(reel.id),
            isSaved: savedReelIds.has(reel.id),
            comments: reel.commentsCount || 0
        }));

        res.json({ status: 'success', data: enrichedReels });
    } catch (error) {
        console.error('Get User Reels Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getReelById = async (req, res) => {
    try {
        const { id } = req.params;
        const currentUserId = req.headers['x-user-id'] || req.query.userId;

        const reel = await Reel.findByPk(id);

        if (!reel) {
            return res.status(404).json({ message: 'Reel not found' });
        }

        let isLiked = false;
        let isSaved = false;
        if (currentUserId) {
            const [like, bookmark] = await Promise.all([
                ReelLike.findOne({
                    where: { reelId: id, userId: currentUserId }
                }),
                ReelBookmark.findOne({
                    where: { reelId: id, userId: currentUserId }
                })
            ]);
            isLiked = !!like;
            isSaved = !!bookmark;
        }

        // Return object structure matching what frontend expects
        res.json({
            status: 'success',
            data: {
                ...reel.toJSON(),
                isLiked,
                isSaved,
                comments: reel.commentsCount || 0
            }
        });
    } catch (error) {
        console.error('Get Reel By ID Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const likeReel = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers['x-user-id'] || req.body.userId;

        if (!userId) return res.status(400).json({ message: 'User ID required' });

        const reel = await Reel.findByPk(id);
        if (!reel) return res.status(404).json({ message: 'Reel not found' });

        const existing = await ReelLike.findOne({ where: { reelId: id, userId } });
        if (existing) return res.json({ status: 'success', message: 'Already liked' });

        await ReelLike.create({ reelId: id, userId });

        reel.likesCount += 1;
        await reel.save();

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

        const reel = await Reel.findByPk(id);
        if (!reel) return res.status(404).json({ message: 'Reel not found' });

        const existing = await ReelLike.findOne({ where: { reelId: id, userId } });
        if (!existing) return res.json({ status: 'success', message: 'Not liked' });

        await existing.destroy();

        reel.likesCount = Math.max(0, reel.likesCount - 1);
        await reel.save();

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
                    isLiked: true,
                    isSaved: false // We don't fetch bookmarks here for simplicity, but could
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

const bookmarkReel = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers['x-user-id'] || req.body.userId;

        if (!userId) return res.status(400).json({ message: 'User ID required' });

        const reel = await Reel.findByPk(id);
        if (!reel) return res.status(404).json({ message: 'Reel not found' });

        const existing = await ReelBookmark.findOne({ where: { reelId: id, userId } });
        if (existing) return res.json({ status: 'success', message: 'Already bookmarked' });

        await ReelBookmark.create({ reelId: id, userId });
        res.json({ status: 'success' });
    } catch (error) {
        console.error('Bookmark Reel Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const unbookmarkReel = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers['x-user-id'] || req.query.userId || req.body.userId;

        if (!userId) return res.status(400).json({ message: 'User ID required' });

        const reel = await Reel.findByPk(id);
        if (!reel) return res.status(404).json({ message: 'Reel not found' });

        await ReelBookmark.destroy({ where: { reelId: id, userId } });
        res.json({ status: 'success' });
    } catch (error) {
        console.error('Unbookmark Reel Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getSavedReels = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.query.userId;
        if (!userId) return res.status(400).json({ message: 'User ID required' });

        const bookmarks = await ReelBookmark.findAll({ where: { userId } });
        const reelIds = bookmarks.map(b => b.reelId);

        const reels = await Reel.findAll({ where: { id: reelIds } });
        res.json({ status: 'success', data: reels });
    } catch (error) {
        console.error('Get Saved Reels Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const reportReel = async (req, res) => {
    try {
        const reelId = Number(req.params.id);
        const { reason, details } = req.body;
        const userId = Number(req.headers['x-user-id'] || req.body.userId);

        console.log('[Reel Report] Request received:', { reelId, reason, details, userId });

        if (!userId || isNaN(userId)) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized: Valid User ID required' });
        }

        if (!reelId || isNaN(reelId)) {
            return res.status(400).json({ status: 'error', message: 'Invalid Reel ID' });
        }

        const reel = await Reel.findByPk(reelId);
        if (!reel) {
            return res.status(404).json({ status: 'error', message: 'Reel not found' });
        }

        if (String(reel.userId) === String(userId)) {
            console.warn(`[Reel Report] User ${userId} tried to report their own reel ${reelId}`);
            return res.status(400).json({ status: 'error', message: 'You cannot report your own reel' });
        }

        if (!reason) {
            return res.status(400).json({ status: 'error', message: 'Reason is required' });
        }

        const validReasons = ['spam', 'violence', 'hate', 'nudity', 'scam', 'false_information', 'bullying', 'other'];
        if (!validReasons.includes(reason)) {
            console.warn(`[Reel Report] Invalid reason provided: "${reason}" from user ${userId}`);
            return res.status(400).json({ status: 'error', message: `Invalid reason: "${reason}". Must be one of ${validReasons.join(', ')}` });
        }


        const existingReport = await ReelReport.findOne({
            where: { reelId, userId }
        });

        if (existingReport) {
            return res.status(200).json({ status: 'success', message: 'You have already reported this reel' });
        }



        const report = await ReelReport.create({
            reelId,
            userId,
            reason,
            details: details || null
        });

        res.json({
            status: 'success',
            message: 'Report submitted successfully.',
            data: { reportId: report.id }
        });
    } catch (error) {
        console.error('[Reel Report] Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

module.exports = {
    createReel,
    getReels,
    getUserReels,
    getReelById,
    likeReel,
    unlikeReel,
    getLikedReels,
    getActivityReels,
    bookmarkReel,
    unbookmarkReel,
    getSavedReels,
    reportReel
};
