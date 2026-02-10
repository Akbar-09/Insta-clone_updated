const Post = require('../models/Post');
const Like = require('../models/Like');
const Report = require('../models/Report');
const { publishEvent } = require('../config/rabbitmq');
const sequelize = require('../config/database');
const { Op } = require('sequelize');

// Set up associations
Post.hasMany(Like, { foreignKey: 'postId' });
Like.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

const createPost = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.body.userId;
        const { username, caption, mediaUrl, mediaType } = req.body;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const post = await Post.create({
            userId,
            username,
            caption,
            mediaUrl,
            mediaType: mediaType ? mediaType.toUpperCase() : 'IMAGE'
        });

        // Publish Event
        await publishEvent('POST_CREATED', post.toJSON());

        res.status(201).json({ status: 'success', data: post });
    } catch (error) {
        console.error('Create Post Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getExplorePosts = async (req, res) => {
    try {
        const { limit = 20, offset = 0 } = req.query;
        const currentUserId = req.headers['x-user-id'] || req.query.userId;

        // Fetch posts
        let posts = [];
        try {
            posts = await Post.findAll({
                order: [
                    ['likesCount', 'DESC'],
                    ['commentsCount', 'DESC'],
                    ['createdAt', 'DESC']
                ],
                limit: parseInt(limit),
                offset: parseInt(offset),
                raw: true
            });
        } catch (dbError) {
            console.error('DB FindAll Error:', dbError);
            posts = [];
        }

        if (!posts || !Array.isArray(posts)) {
            posts = [];
        }

        // Add isLiked status if user is logged in
        let likedPostIds = new Set();
        if (currentUserId && posts.length > 0) {
            const likes = await Like.findAll({
                where: { userId: currentUserId, postId: posts.map(p => p.id) },
                attributes: ['postId']
            });
            likedPostIds = new Set(likes.map(l => l.postId));
        }

        const data = posts.map(post => ({
            ...post,
            isLiked: likedPostIds.has(post.id)
        }));

        res.json({ status: 'success', data });
    } catch (error) {
        console.error('Explore Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getPosts = async (req, res) => {
    try {
        const { username, authorId } = req.query;
        console.log(`[PostService] getPosts query: username=${username}, authorId=${authorId}`);
        const userId = req.headers['x-user-id'] || req.query.userId;
        const whereClause = {};
        if (username) whereClause.username = username;
        if (authorId) whereClause.userId = parseInt(authorId);

        const posts = await Post.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
            raw: true // Get plain objects to attach property easily
        });

        // If userId is present, fetch their likes
        let likedPostIds = new Set();
        if (userId) {
            const likes = await Like.findAll({
                where: { userId },
                attributes: ['postId']
            });
            likedPostIds = new Set(likes.map(l => l.postId));
        }

        const postsWithLikeStatus = posts.map(post => ({
            ...post,
            isLiked: likedPostIds.has(post.id)
        }));

        res.json({ status: 'success', data: postsWithLikeStatus });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.headers['x-user-id'] || req.query.userId;

        const post = await Post.findByPk(postId, { raw: true });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (userId) {
            const like = await Like.findOne({ where: { userId, postId } });
            isLiked = !!like;
        }

        // Publish View Event for Analytics
        await publishEvent('POST_VIEWED', {
            ownerId: post.userId,
            contentId: post.id,
            viewerId: userId || null,
            timestamp: new Date()
        });

        res.json({ status: 'success', data: { ...post, isLiked } });
    } catch (error) {
        console.error('Get Post By ID Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};
const likePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.headers['x-user-id'] || req.body.userId;

        if (!userId) return res.status(400).json({ message: 'User ID required' });

        // Check if already liked
        const existingLike = await Like.findOne({ where: { userId, postId } });
        if (existingLike) {
            return res.json({ status: 'success', message: 'Post already liked' });
        }

        const post = await Post.findByPk(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        await Like.create({ userId, postId });
        await post.increment('likesCount');

        await publishEvent('POST_LIKED', {
            postId: post.id,
            userId,
            postOwnerId: post.userId,
            timestamp: new Date()
        });

        res.json({ status: 'success', message: 'Post liked', data: { likesCount: post.likesCount + 1 } });
    } catch (error) {
        console.error('Like Post Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const unlikePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.headers['x-user-id'] || req.body.userId || req.query.userId;

        if (!userId) return res.status(400).json({ message: 'User ID required' });

        const like = await Like.findOne({ where: { userId, postId } });
        if (!like) {
            return res.json({ status: 'success', message: 'Like already removed' });
        }

        await like.destroy();

        const post = await Post.findByPk(postId);
        if (post) {
            await post.decrement('likesCount');
        }

        res.json({ status: 'success', message: 'Post unliked', data: { likesCount: post ? post.likesCount - 1 : 0 } });
    } catch (error) {
        console.error('Unlike Post Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.headers['x-user-id'] || req.body.userId;

        const post = await Post.findByPk(postId);
        if (!post) {
            // Idempotent success: post already gone
            return res.status(200).json({ status: 'success', message: 'Post already deleted' });
        }

        if (String(post.userId) !== String(userId)) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const mediaUrl = post.mediaUrl;
        await post.destroy();

        // Publish Event for media cleanup
        await publishEvent('POST_DELETED', {
            postId,
            mediaUrl
        });

        res.json({ status: 'success', message: 'Post deleted' });
    } catch (error) {
        console.error('Delete Post Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { caption } = req.body;
        const userId = req.headers['x-user-id'] || req.body.userId;

        const post = await Post.findByPk(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (String(post.userId) !== String(userId)) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        post.caption = caption;
        await post.save();

        res.json({ status: 'success', data: post });
    } catch (error) {
        console.error('Update Post Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const toggleHideLikes = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.headers['x-user-id'] || req.body.userId;

        const post = await Post.findByPk(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (String(post.userId) !== String(userId)) return res.status(403).json({ message: 'Unauthorized' });

        post.hideLikes = !post.hideLikes;
        await post.save();

        res.json({ status: 'success', data: { hideLikes: post.hideLikes } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const toggleComments = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.headers['x-user-id'] || req.body.userId;

        const post = await Post.findByPk(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (String(post.userId) !== String(userId)) return res.status(403).json({ message: 'Unauthorized' });

        post.commentsDisabled = !post.commentsDisabled;
        await post.save();

        res.json({ status: 'success', data: { commentsDisabled: post.commentsDisabled } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};


const SavedPost = require('../models/SavedPost');

// ... existing functions ...

const bookmarkPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { userId } = req.body;

        if (!userId) return res.status(400).json({ message: 'User ID required' });

        await SavedPost.findOrCreate({
            where: { userId, postId }
        });

        res.json({ status: 'success', message: 'Post bookmarked' });
    } catch (error) {
        console.error('Bookmark Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const unbookmarkPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { userId } = req.body; // Usually from query or auth middleware if DELETE body not supported, but we'll assume body or query for now. 
        // Better to use req.user.id if available, but for now follow pattern.
        // DELETE requests *can* have body but often discouraged. Let's support query.
        const effectiveUserId = userId || req.query.userId;

        if (!effectiveUserId) return res.status(400).json({ message: 'User ID required' });

        await SavedPost.destroy({
            where: { userId: effectiveUserId, postId }
        });

        res.json({ status: 'success', message: 'Post unbookmarked' });
    } catch (error) {
        console.error('Unbookmark Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getSavedPosts = async (req, res) => {
    try {
        const userId = req.query.userId || req.headers['x-user-id'];
        if (!userId) return res.status(400).json({ message: 'User ID required' });

        // 1. Get SavedPosts ID list (Preserves Order)
        const saved = await SavedPost.findAll({
            where: { userId: parseInt(userId) },
            order: [['createdAt', 'DESC']]
        });

        const postIds = saved.map(s => s.postId);

        if (postIds.length === 0) {
            return res.json({ status: 'success', data: [] });
        }

        // 2. Fetch Posts (Unordered)
        const posts = await Post.findAll({
            where: { id: postIds },
            raw: true
        });

        // 3. Fetch Likes for these posts (for isLiked status)
        let likedPostIds = new Set();
        if (userId) {
            const likes = await Like.findAll({
                where: { userId, postId: postIds },
                attributes: ['postId']
            });
            likedPostIds = new Set(likes.map(l => l.postId));
        }

        // 4. Map and Reorder
        const postsMap = new Map(posts.map(p => [p.id, p]));

        const orderedPosts = postIds
            .map(id => postsMap.get(id))
            .filter(post => post) // Filter out nulls (if post was deleted but saved ref exists)
            .map(post => ({
                ...post,
                isLiked: likedPostIds.has(post.id),
                isSaved: true
            }));

        res.json({ status: 'success', data: orderedPosts });
    } catch (error) {
        console.error('Get Saved Posts Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const checkLikes = async (req, res) => {
    try {
        const { postIds } = req.body;
        const userId = req.headers['x-user-id'] || req.body.userId;

        if (!userId || !postIds || !Array.isArray(postIds)) {
            return res.status(400).json({ message: 'User ID and postIds array required' });
        }

        const likes = await Like.findAll({
            where: {
                userId,
                postId: postIds
            },
            attributes: ['postId']
        });

        // Also fetch the posts to get fresh likesCount
        const posts = await Post.findAll({
            where: { id: postIds },
            attributes: ['id', 'likesCount']
        });

        const likedSet = new Set(likes.map(l => l.postId));
        const postsMap = new Map(posts.map(p => [p.id, p]));

        const result = {};
        postIds.forEach(id => {
            const post = postsMap.get(parseInt(id)) || postsMap.get(id); // Handle string/int types
            result[id] = {
                isLiked: likedSet.has(parseInt(id)) || likedSet.has(id),
                likesCount: post ? post.likesCount : 0
            };
        });

        res.json({ status: 'success', data: result });
    } catch (error) {
        console.error('Check Likes Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const reportPost = async (req, res) => {
    try {
        const postId = Number(req.params.id);
        const { reason, details } = req.body;
        const userId = Number(req.headers['x-user-id'] || req.body.userId);

        console.log('[Report] Request received:', { postId, reason, details, userId });

        if (!userId || isNaN(userId)) {
            console.log('[Report] Error: No valid userId provided');
            return res.status(401).json({ status: 'error', message: 'Unauthorized: Valid User ID required' });
        }

        if (!postId || isNaN(postId)) {
            console.log('[Report] Error: No valid postId provided');
            return res.status(400).json({ status: 'error', message: 'Invalid Post ID' });
        }

        // Check if post exists
        const post = await Post.findByPk(postId);
        if (!post) {
            console.log('[Report] Error: Post not found:', postId);
            return res.status(404).json({ status: 'error', message: 'Post not found' });
        }

        // Prevent users from reporting their own posts
        if (String(post.userId) === String(userId)) {
            console.log('[Report] Error: User trying to report own post');
            return res.status(400).json({ status: 'error', message: 'You cannot report your own post' });
        }

        // Validate reason
        const validReasons = ['spam', 'violence', 'hate', 'nudity', 'scam', 'false_information', 'bullying', 'other'];
        if (!reason || !validReasons.includes(reason)) {
            console.log('[Report] Error: Invalid reason:', reason);
            return res.status(400).json({ status: 'error', message: 'Please select a valid reason for reporting' });
        }

        // Check if user already reported this post
        const existingReport = await Report.findOne({
            where: { postId, userId: userId }
        });

        if (existingReport) {
            console.log('[Report] Error: Duplicate report');
            return res.status(400).json({ status: 'error', message: 'You have already reported this post' });
        }

        // Create report
        console.log('[Report] Creating report in DB...');
        const report = await Report.create({
            postId,
            userId: userId,
            reason,
            details: details || null
        });

        console.log(`[Report] Success: Post ${postId} reported by User ${userId}`);

        res.json({
            status: 'success',
            message: 'Report submitted successfully. Our team will review it shortly.',
            data: { reportId: report.id }
        });
    } catch (error) {
        console.error('[Report] Final Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'An internal error occurred while processing your report. Please try again later.',
            error: error.message
        });
    }
};

const getEmbedCode = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Generate embed HTML
        const embedUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/embed/post/${postId}`;
        const embedHtml = `<iframe src="${embedUrl}" width="400" height="480" frameborder="0" scrolling="no" allowtransparency="true"></iframe>`;

        res.json({
            status: 'success',
            data: {
                embedUrl,
                embedHtml,
                postId: post.id,
                username: post.username
            }
        });
    } catch (error) {
        console.error('Get Embed Code Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getActivityLikes = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.query.userId;
        const { sort = 'newest', startDate, endDate } = req.query;

        // If no user ID found, check token or try to decode if not handled by gateway
        // For now, let's log what we received
        // console.log("getActivityLikes headers:", req.headers);

        if (!userId) {
            // Fallback: if we are in dev mode and skipping gateway, maybe we need to parse token?
            // But simpler is to fix frontend to send x-user-id header or backend to trust token
            return res.status(400).json({ message: 'User ID required' });
        }

        const whereClause = { userId };
        if (startDate && endDate) {
            whereClause.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }

        // Get IDs of liked posts, sorted by LIKE creation time
        const likes = await Like.findAll({
            where: whereClause,
            order: [['createdAt', sort === 'oldest' ? 'ASC' : 'DESC']]
        });

        const postIds = likes.map(like => like.postId);

        // Fetch posts
        // Note: We want to maintain the order of likes, not post creation
        // So we can't just order by Post.createdAt
        const posts = await Post.findAll({
            where: { id: postIds }
        });

        // Map posts back to the order of likes
        const postsMap = new Map(posts.map(p => [p.id, p]));
        const orderedPosts = [];

        for (const like of likes) {
            const post = postsMap.get(like.postId);
            if (post) {
                orderedPosts.push({
                    ...post.toJSON(),
                    likedAt: like.createdAt, // useful for UI
                    isLiked: true
                });
            }
        }

        res.json({ status: 'success', data: orderedPosts });
    } catch (error) {
        console.error('Get Activity Likes Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getActivityPosts = async (req, res) => {
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

        const posts = await Post.findAll({
            where: whereClause,
            order: [['createdAt', sort === 'oldest' ? 'ASC' : 'DESC']]
        });

        res.json({ status: 'success', data: posts });
    } catch (error) {
        console.error('Get Activity Posts Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

module.exports = {
    createPost,
    getPosts,
    getExplorePosts,
    getPostById,
    likePost,
    unlikePost,
    bookmarkPost,
    unbookmarkPost,
    getSavedPosts,
    checkLikes,
    deletePost,
    updatePost,
    toggleHideLikes,
    toggleComments,
    reportPost,
    getEmbedCode,
    getActivityLikes,
    getActivityPosts
};
