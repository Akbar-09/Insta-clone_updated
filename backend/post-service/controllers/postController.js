const Post = require('../models/Post');
const Like = require('../models/Like');
const Report = require('../models/Report');
const { publishEvent } = require('../config/rabbitmq');
const sequelize = require('../config/database');
const { Op } = require('sequelize');

const getPostsByHashtag = async (req, res) => {
    try {
        const { hashtag } = req.params;
        const currentUserId = req.headers['x-user-id'] || req.query.userId;
        const { limit = 20, offset = 0 } = req.query;

        // Ensure hashtag starts with #
        const tag = hashtag.startsWith('#') ? hashtag : `#${hashtag}`;

        const posts = await Post.findAll({
            where: {
                caption: {
                    [Op.iLike]: `%${tag}%`
                },
                isHidden: false  // Exclude posts with broken/lost media
            },
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset),
            raw: true
        });

        // Add isLiked status
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
        console.error('Get Posts By Hashtag Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getPostsByUsers = async (req, res) => {
    try {
        const { userIds, limit = 20, offset = 0 } = req.body;
        const currentUserId = req.headers['x-user-id'] || req.body.currentUserId;

        if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
            return res.json({ status: 'success', data: [] });
        }

        const posts = await Post.findAll({
            where: {
                userId: {
                    [Op.in]: userIds
                },
                isHidden: false  // Exclude posts with broken/lost media
            },
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset),
            raw: true
        });

        // Add isLiked status if currentUserId is present
        let likedPostIds = new Set();
        if (currentUserId) {
            const likes = await Like.findAll({
                where: { userId: currentUserId, postId: posts.map(p => p.id) },
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
        console.error('Get Posts By Users Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

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
        const limitCnt = parseInt(limit);
        const offsetCnt = parseInt(offset);

        // Fetch randomized posts (exclude problematic external URLs)
        let posts = [];
        try {
            posts = await Post.findAll({
                where: {
                    isHidden: false,  // Exclude posts with broken/lost media
                    [Op.and]: [
                        { mediaUrl: { [Op.notILike]: '%w3schools%' } },
                        { mediaUrl: { [Op.notILike]: '%googleapis.com%' } },
                        { mediaUrl: { [Op.notILike]: '%storage.googleapis.com%' } },
                        { mediaUrl: { [Op.notILike]: '%gtv-videos-bucket%' } }
                    ]
                },
                order: [
                    [sequelize.literal('RANDOM()')]
                ],
                limit: Math.ceil(limitCnt / 2),
                raw: true
            });
            // Mark them as type POST
            posts = posts.map(p => ({ ...p, type: 'POST' }));
        } catch (dbError) {
            console.error('DB FindAll Posts Error:', dbError);
            posts = [];
        }

        // Fetch randomized reels (only if Reels table exists in this DB)
        let reels = [];
        try {
            const [results] = await sequelize.query(`
                SELECT 
                    id, 
                    "userId", 
                    username, 
                    caption, 
                    "videoUrl" as "mediaUrl", 
                    "likesCount", 
                    "commentsCount", 
                    "createdAt",
                    'VIDEO' as "mediaType",
                    'REEL' as type
                FROM "Reels" 
                WHERE "isHidden" = false 
                AND "videoUrl" NOT ILIKE '%w3schools%'
                AND "videoUrl" NOT ILIKE '%googleapis.com%'
                AND "videoUrl" NOT ILIKE '%storage.googleapis.com%'
                AND "videoUrl" NOT ILIKE '%gtv-videos-bucket%'
                ORDER BY RANDOM() 
                LIMIT ${Math.ceil(limitCnt / 2)}
            `);
            reels = results;
        } catch (dbError) {
            console.log('[PostService] Reels table not available in Post DB. Skipping Reels in Explore.');
            reels = [];
        }

        // Combine and Deduplicate
        const seenUrls = new Set();
        const combined = [];

        // Helper to normalize URL for matching
        const normalizeUrl = (url) => {
            if (!url) return '';
            let n = url.replace(/^https?:\/\/[^\/]+/, '');
            if (n.includes('/uploads/')) n = n.substring(n.indexOf('/uploads/'));
            return n;
        };

        // Prioritize Reels for Explore if they exist
        reels.forEach(r => {
            const norm = normalizeUrl(r.mediaUrl);
            if (!seenUrls.has(norm)) {
                combined.push(r);
                seenUrls.add(norm);
            }
        });

        posts.forEach(p => {
            const norm = normalizeUrl(p.mediaUrl);
            if (!seenUrls.has(norm)) {
                combined.push(p);
                seenUrls.add(norm);
            }
        });

        // Shuffle mixed content
        combined.sort(() => Math.random() - 0.5);

        // Add isLiked status if user is logged in
        let likedPostIds = new Set();
        let likedReelIds = new Set();

        if (currentUserId && combined.length > 0) {
            const postIds = combined.filter(c => c.type === 'POST').map(c => c.id);
            if (postIds.length > 0) {
                const likes = await Like.findAll({
                    where: { userId: currentUserId, postId: postIds },
                    attributes: ['postId']
                });
                likedPostIds = new Set(likes.map(l => l.postId));
            }

            const reelIds = combined.filter(c => c.type === 'REEL').map(c => c.id);
            if (reelIds.length > 0) {
                try {
                    const [reelLikes] = await sequelize.query(`
                        SELECT "reelId" FROM "ReelLikes" 
                        WHERE "userId" = ${parseInt(currentUserId)} 
                        AND "reelId" IN (${reelIds.join(',')})
                    `);
                    likedReelIds = new Set(reelLikes.map(l => l.reelId));
                } catch (e) {
                    console.error('ReelLikes Fetch Error:', e);
                }
            }
        }

        const data = combined.map(item => ({
            ...item,
            isLiked: item.type === 'POST' ? likedPostIds.has(item.id) : likedReelIds.has(item.id)
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
        const currentUserId = req.headers['x-user-id'] || req.query.userId;

        let post = await Post.findByPk(postId, { raw: true });
        let isReel = false;

        // Fallback to Reels (only if Reels table exists in this DB)
        if (!post) {
            try {
                const [reelResults] = await sequelize.query(`
                    SELECT *, 'VIDEO' as "mediaType", 'REEL' as type 
                    FROM "Reels" 
                    WHERE id = ? LIMIT 1
                `, {
                    replacements: [postId]
                });

                if (reelResults && reelResults.length > 0) {
                    const reel = reelResults[0];
                    post = {
                        ...reel,
                        mediaUrl: reel.videoUrl, // Unify for frontend
                        type: 'REEL'
                    };
                    isReel = true;
                }
            } catch (reelErr) {
                // Silently fail if table doesn't exist
            }
        }

        if (!post) {
            return res.status(404).json({ message: 'Post/Reel not found' });
        }

        let isLiked = false;
        if (currentUserId) {
            if (isReel) {
                try {
                    const [reelLikes] = await sequelize.query(`
                        SELECT id FROM "ReelLikes" 
                        WHERE "userId" = ? AND "reelId" = ? LIMIT 1
                    `, {
                        replacements: [currentUserId, postId]
                    });
                    isLiked = reelLikes.length > 0;
                } catch (e) {
                    console.error('ReelLike check error:', e);
                }
            } else {
                const like = await Like.findOne({ where: { userId: currentUserId, postId } });
                isLiked = !!like;
            }
        }

        // Publish View Event for Analytics (only for regular posts or if needed for reels)
        await publishEvent('POST_VIEWED', {
            ownerId: post.userId,
            contentId: post.id,
            viewerId: currentUserId || null,
            type: isReel ? 'REEL' : 'POST',
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

        // Push to notification_queue
        const UserProfile = require('../models/UserProfile');
        const actorProfile = await UserProfile.findByPk(userId);
        const username = req.headers['x-user-username'] || actorProfile?.username || 'Someone';

        await require('../config/rabbitmq').publishNotification({
            userId: post.userId,
            fromUserId: userId,
            fromUsername: username,
            fromUserAvatar: actorProfile?.profilePicture || '',
            type: 'like',
            title: 'New Like',
            message: `${username} liked your post`,
            link: `/p/${post.id}`
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

        console.log(`[PostService] Delete request for post ${postId} by user ${userId}`);

        const post = await Post.findByPk(postId);
        if (!post) {
            console.log(`[PostService] Post ${postId} not found for deletion.`);
            // Idempotent success: post already gone
            return res.status(200).json({ status: 'success', message: 'Post already deleted' });
        }

        console.log(`[PostService] Post found. Owner: ${post.userId}, Requestor: ${userId}`);

        if (String(post.userId) !== String(userId)) {
            console.log(`[PostService] Unauthorized deletion attempt. Owner: ${post.userId}, Requestor: ${userId}`);
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const mediaUrl = post.mediaUrl;
        await post.destroy();
        console.log(`[PostService] Post ${postId} destroyed.`);

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

        let post = await Post.findByPk(postId);
        let isReel = false;

        if (!post) {
            // Check Reels (if table exists)
            try {
                const [reelResults] = await sequelize.query(`SELECT * FROM "Reels" WHERE id = ? LIMIT 1`, {
                    replacements: [postId]
                });
                if (reelResults && reelResults.length > 0) {
                    post = reelResults[0];
                    isReel = true;
                }
            } catch (e) { /* Table probably doesn't exist */ }
        }

        if (!post) return res.status(404).json({ message: 'Post/Reel not found' });

        if (String(post.userId) !== String(userId)) return res.status(403).json({ message: 'Unauthorized' });

        if (isReel) {
            const newStatus = !post.hideLikes;
            await sequelize.query(`UPDATE "Reels" SET "hideLikes" = ? WHERE id = ?`, {
                replacements: [newStatus, postId]
            });
            return res.json({ status: 'success', data: { hideLikes: newStatus } });
        } else {
            post.hideLikes = !post.hideLikes;
            await post.save();
            return res.json({ status: 'success', data: { hideLikes: post.hideLikes } });
        }
    } catch (error) {
        console.error('toggleHideLikes Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};


const toggleComments = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.headers['x-user-id'] || req.body.userId;

        let post = await Post.findByPk(postId);
        let isReel = false;

        if (!post) {
            // Check Reels (if table exists)
            try {
                const [reelResults] = await sequelize.query(`SELECT * FROM "Reels" WHERE id = ? LIMIT 1`, {
                    replacements: [postId]
                });
                if (reelResults && reelResults.length > 0) {
                    post = reelResults[0];
                    isReel = true;
                }
            } catch (e) { /* Table probably doesn't exist */ }
        }

        if (!post) return res.status(404).json({ message: 'Post/Reel not found' });

        if (String(post.userId) !== String(userId)) return res.status(403).json({ message: 'Unauthorized' });

        if (isReel) {
            const newStatus = !post.commentsDisabled;
            await sequelize.query(`UPDATE "Reels" SET "commentsDisabled" = ? WHERE id = ?`, {
                replacements: [newStatus, postId]
            });
            return res.json({ status: 'success', data: { commentsDisabled: newStatus } });
        } else {
            post.commentsDisabled = !post.commentsDisabled;
            await post.save();
            return res.json({ status: 'success', data: { commentsDisabled: post.commentsDisabled } });
        }
    } catch (error) {
        console.error('toggleComments Error:', error);
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

        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

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
        const { userId } = req.body;
        const effectiveUserId = userId || req.query.userId;

        if (!effectiveUserId) return res.status(400).json({ message: 'User ID required' });

        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

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
        let post = await Post.findByPk(postId);
        let isReel = false;

        if (!post) {
            // Check if it's a Reel (if table exists)
            try {
                const [reelResults] = await sequelize.query(`
                    SELECT *, 'VIDEO' as "mediaType", 'REEL' as type 
                    FROM "Reels" 
                    WHERE id = ? LIMIT 1
                `, {
                    replacements: [postId]
                });

                if (reelResults && reelResults.length > 0) {
                    post = {
                        ...reelResults[0],
                        userId: reelResults[0].userId // Ensure userId is accessible
                    };
                    isReel = true;
                }
            } catch (reelErr) {
                // Table probably doesn't exist
            }
        }

        if (!post) {
            console.log('[Report] Error: Post/Reel not found:', postId);
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
            console.log('[Report] Info: Duplicate report handled gracefully');
            return res.status(200).json({ status: 'success', message: 'You have already reported this post' });
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

        let post = await Post.findByPk(postId);
        let isReel = false;

        if (!post) {
            // Check if it's a Reel
            try {
                const [reelResults] = await sequelize.query(`
                    SELECT *, 'VIDEO' as "mediaType", 'REEL' as type 
                    FROM "Reels" 
                    WHERE id = ? LIMIT 1
                `, {
                    replacements: [postId]
                });

                if (reelResults && reelResults.length > 0) {
                    post = {
                        ...reelResults[0],
                        username: reelResults[0].username // Ensure username is available
                    };
                    isReel = true;
                }
            } catch (reelErr) {
                console.error('Reel Fallback Error in Embed:', reelErr);
            }
        }

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
    getActivityPosts,
    getPostsByUsers,
    getPostsByHashtag
};
