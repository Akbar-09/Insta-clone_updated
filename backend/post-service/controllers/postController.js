const Post = require('../models/Post');
const Like = require('../models/Like');
const { publishEvent } = require('../config/rabbitmq');
const sequelize = require('../config/database');

const createPost = async (req, res) => {
    try {
        const { userId, username, caption, mediaUrl, mediaType } = req.body;

        const post = await Post.create({
            userId,
            username,
            caption,
            mediaUrl,
            mediaType
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
        const { username } = req.query;
        const userId = req.headers['x-user-id'] || req.query.userId;
        const whereClause = username ? { username } : {};

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
        console.error('Get Posts Error:', error);
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

        let isLiked = false;
        if (userId) {
            const like = await Like.findOne({ where: { userId, postId } });
            isLiked = !!like;
        }

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
            return res.status(400).json({ message: 'Post already liked' });
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
            return res.status(404).json({ message: 'Like not found' });
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
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (String(post.userId) !== String(userId)) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await post.destroy();
        // Also delete likes, comments etc ideally
        // But cascading might handle or just leave for mvp

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
        const { userId } = req.query;
        if (!userId) return res.status(400).json({ message: 'User ID required' });

        const saved = await SavedPost.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']]
        });

        const postIds = saved.map(s => s.postId);

        if (postIds.length === 0) {
            return res.json({ status: 'success', data: [] });
        }

        const posts = await Post.findAll({
            where: { id: postIds }
        });

        res.json({ status: 'success', data: posts });
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
        const postId = req.params.id;
        const { reason, details } = req.body;
        const userId = req.headers['x-user-id'] || req.body.userId;

        // In a real app, save to Report model
        console.log(`[Report] Post ${postId} reported by User ${userId}`);
        console.log(`[Report] Reason: ${reason}, Details: ${details}`);

        // Simulate success
        res.json({ status: 'success', message: 'Report received' });
    } catch (error) {
        console.error('Report Post Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

module.exports = { createPost, getPosts, getExplorePosts, getPostById, likePost, unlikePost, bookmarkPost, unbookmarkPost, getSavedPosts, checkLikes, deletePost, updatePost, toggleHideLikes, toggleComments, reportPost };
