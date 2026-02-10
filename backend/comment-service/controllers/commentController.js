const Comment = require('../models/Comment');
const CommentLike = require('../models/CommentLikes');
const { publishEvent } = require('../config/rabbitmq');
const { Op } = require('sequelize');
const Review = require('../models/Review');

const createComment = async (req, res) => {
    try {
        const { postId, text, parentId } = req.body;
        const userId = req.headers['x-user-id'] || req.body.userId;
        const username = req.headers['x-user-username'] || req.body.username;
        const userAvatar = req.body.userAvatar; // Avatar usually not in headers, maybe body or fetch from user service (but simplified here)

        if (!postId || !userId || !text) {
            return res.status(400).json({ status: 'error', message: 'Missing required fields' });
        }

        const comment = await Comment.create({
            postId,
            userId,
            username,
            text,
            likesCount: 0,
            parentId: parentId || null
        });

        // Publish Event
        await publishEvent('COMMENT_ADDED', comment.toJSON());

        // Return comment with user info (frontend needs it)
        const responseData = {
            ...comment.toJSON(),
            userAvatar // Pass back if creating, or frontend provides it
        };

        res.status(201).json({ status: 'success', data: responseData });
    } catch (error) {
        console.error('Create Comment Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getComments = async (req, res) => {
    try {
        const { postId } = req.query;
        // In a real app we would get currentUserId from token (via headers) to check isLiked
        // For now, simpler implementation.
        if (!postId) return res.status(400).json({ message: 'postId query param required' });

        const comments = await Comment.findAll({
            where: { postId },
            order: [['createdAt', 'ASC']]
        });

        // We might want to enrich with "isLiked" by current user if we knew who they were
        // For now return raw list
        res.json({ status: 'success', data: comments });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        await Comment.destroy({ where: { id } });
        // publish event COMMENT_DELETED?
        res.json({ status: 'success' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

const likeComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        console.log(`[likeComment] Request received for commentId: ${id}, userId: ${userId}`);

        if (!userId) {
            console.error('[likeComment] Missing userId');
            return res.status(400).json({ status: 'error', message: 'userId required' });
        }

        // Check if already liked
        const existing = await CommentLike.findOne({ where: { commentId: id, userId } });
        if (existing) {
            console.log('[likeComment] Already liked');
            return res.json({ status: 'success', message: 'Already liked' });
        }

        console.log('[likeComment] Creating CommentLike record...');
        await CommentLike.create({ commentId: id, userId });

        console.log('[likeComment] Manually incrementing likesCount...');
        const comment = await Comment.findByPk(id);
        if (comment) {
            const currentLikes = comment.likesCount || 0;
            comment.likesCount = currentLikes + 1;
            await comment.save();
        } else {
            console.error('[likeComment] Comment not found to increment');
        }

        console.log('[likeComment] Success');
        res.json({ status: 'success' });
    } catch (error) {
        console.error('[likeComment] Error:', error);
        // Special handling for unique constraint violation (race condition)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.json({ status: 'success', message: 'Already liked' });
        }
        res.status(500).json({ status: 'error', message: 'Server error', error: error.message });
    }
};

const unlikeComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        console.log(`[unlikeComment] Request received for commentId: ${id}, userId: ${userId}`);

        if (!userId) return res.status(400).json({ status: 'error', message: 'userId required' });

        console.log('[unlikeComment] destroying CommentLike record...');
        const deleted = await CommentLike.destroy({ where: { commentId: id, userId } });
        if (deleted) {
            console.log('[unlikeComment] Manually decrementing likesCount...');
            const comment = await Comment.findByPk(id);
            if (comment) {
                const currentLikes = comment.likesCount || 0;
                comment.likesCount = Math.max(0, currentLikes - 1);
                await comment.save();
            }
        }
        res.json({ status: 'success' });
    } catch (error) {
        console.error('[unlikeComment] Error:', error);
        res.status(500).json({ status: 'error', message: 'Server error', error: error.message });
    }
};

const checkComments = async (req, res) => {
    try {
        const { postIds } = req.body;

        if (!postIds || !Array.isArray(postIds)) {
            return res.status(400).json({ message: 'postIds array required' });
        }

        const result = {};

        for (const postId of postIds) {
            // Count
            const count = await Comment.count({ where: { postId } });

            // Latest 2 comments (for preview)
            const latest = await Comment.findAll({
                where: { postId },
                order: [['createdAt', 'DESC']],
                limit: 2,
                include: [] // If we had User relation, we'd include it. For now, data is denormalized in Comment or we just send what we have.
            });

            // Reverse to show oldest first in the preview "snippet" style if preferred, 
            // but usually "latest" means most recent. 
            // Feed usually shows "View all X comments" then maybe 1-2 recent ones.
            // Let's return them as is.

            result[postId] = {
                commentsCount: count,
                latestComments: latest
            };
        }

        res.json({ status: 'success', data: result });
    } catch (error) {
        console.error('Check Comments Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getActivityComments = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.query.userId;
        const { sort = 'newest', startDate, endDate } = req.query;

        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const whereClause = { userId };
        if (startDate && endDate) {
            whereClause.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }

        const comments = await Comment.findAll({
            where: whereClause,
            order: [['createdAt', sort === 'oldest' ? 'ASC' : 'DESC']]
        });

        res.json({ status: 'success', data: comments });
    } catch (error) {
        console.error('Get Activity Comments Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getReviews = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.query.userId;
        const { sort = 'newest', startDate, endDate } = req.query;

        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const whereClause = { userId };
        if (startDate && endDate) {
            whereClause.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }

        const reviews = await Review.findAll({
            where: whereClause,
            order: [['createdAt', sort === 'oldest' ? 'ASC' : 'DESC']]
        });

        res.json({ status: 'success', data: reviews });
    } catch (error) {
        console.error('Get Reviews Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

module.exports = {
    createComment,
    getComments,
    deleteComment,
    likeComment,
    unlikeComment,
    checkComments,
    getActivityComments,
    getReviews
};
