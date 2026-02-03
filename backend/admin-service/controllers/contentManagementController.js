const internalApi = require('../services/internalApi');
const { AuditLog } = require('../models');

const enrichInteractions = async (likes = [], comments = [], bookmarks = []) => {
    const userIds = [...new Set([
        ...likes.map(l => l.userId || l.reactorId),
        ...comments.map(c => c.userId),
        ...bookmarks.map(b => b.userId)
    ])].filter(Boolean);

    let userMap = {};
    if (userIds.length > 0) {
        try {
            const usersRes = await internalApi.getUsersBulk(userIds);
            if (usersRes.data.success) {
                userMap = usersRes.data.data.reduce((acc, user) => {
                    acc[user.userId] = user;
                    return acc;
                }, {});
            }
        } catch (err) {
            console.error('Error fetching bulk users:', err.message);
        }
    }

    const enrich = (item, idField) => ({
        ...item,
        username: userMap[item[idField]]?.username || item.username || `user_${item[idField]}`,
        profilePicture: userMap[item[idField]]?.profilePicture || item.profilePicture
    });

    return {
        likes: likes.map(l => enrich(l, l.userId ? 'userId' : 'reactorId')),
        comments: comments.map(c => enrich(c, 'userId')),
        bookmarks: bookmarks.map(b => enrich(b, 'userId'))
    };
};

// Posts
exports.listPosts = async (req, res) => {
    try {
        const { page, limit, search } = req.query;
        const response = await internalApi.listPosts({ page, limit, search });

        if (response.data.success && response.data.data) {
            const posts = response.data.data;
            const userIds = [...new Set(posts.map(p => p.userId))].filter(Boolean);

            let userMap = {};
            if (userIds.length > 0) {
                const usersRes = await internalApi.getUsersBulk(userIds);
                if (usersRes.data.success) {
                    userMap = usersRes.data.data.reduce((acc, user) => {
                        acc[user.userId] = user;
                        return acc;
                    }, {});
                }
            }

            const enrichedPosts = posts.map(post => ({
                ...post,
                userProfilePicture: userMap[post.userId]?.profilePicture
            }));

            return res.json({
                ...response.data,
                data: enrichedPosts
            });
        }

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.hidePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const response = await internalApi.hidePost(postId);
        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'HIDE_POST',
            targetType: 'post',
            targetId: postId
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.unhidePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const response = await internalApi.unhidePost(postId);
        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'UNHIDE_POST',
            targetType: 'post',
            targetId: postId
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const response = await internalApi.deletePost(postId);
        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'DELETE_POST',
            targetType: 'post',
            targetId: postId
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getPostInteractions = async (req, res) => {
    try {
        const { postId } = req.params;
        const [likes, comments, bookmarks] = await Promise.all([
            internalApi.getPostLikes(postId),
            internalApi.getPostComments(postId),
            internalApi.getPostBookmarks(postId)
        ]);

        const enriched = await enrichInteractions(
            likes.data.data,
            comments.data.data,
            bookmarks.data.data
        );

        res.json({
            success: true,
            data: enriched
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Reels
exports.listReels = async (req, res) => {
    try {
        const { page, limit, search } = req.query;
        const response = await internalApi.listReels({ page, limit, search });

        if (response.data.success && response.data.data) {
            const reels = response.data.data;
            const userIds = [...new Set(reels.map(r => r.userId))].filter(Boolean);

            let userMap = {};
            if (userIds.length > 0) {
                const usersRes = await internalApi.getUsersBulk(userIds);
                if (usersRes.data.success) {
                    userMap = usersRes.data.data.reduce((acc, user) => {
                        acc[user.userId] = user;
                        return acc;
                    }, {});
                }
            }

            const enrichedReels = reels.map(reel => ({
                ...reel,
                userProfilePicture: userMap[reel.userId]?.profilePicture
            }));

            return res.json({
                ...response.data,
                data: enrichedReels
            });
        }

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.hideReel = async (req, res) => {
    try {
        const { reelId } = req.params;
        const response = await internalApi.hideReel(reelId);
        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'HIDE_REEL',
            targetType: 'reel',
            targetId: reelId
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.unhideReel = async (req, res) => {
    try {
        const { reelId } = req.params;
        const response = await internalApi.unhideReel(reelId);
        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'UNHIDE_REEL',
            targetType: 'reel',
            targetId: reelId
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteReel = async (req, res) => {
    try {
        const { reelId } = req.params;
        const response = await internalApi.deleteReel(reelId);
        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'DELETE_REEL',
            targetType: 'reel',
            targetId: reelId
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getReelInteractions = async (req, res) => {
    try {
        const { reelId } = req.params;
        const [likes, comments] = await Promise.all([
            internalApi.getReelLikes(reelId),
            internalApi.getPostComments(reelId)
        ]);

        const enriched = await enrichInteractions(
            likes.data.data,
            comments.data.data,
            []
        );

        res.json({
            success: true,
            data: enriched
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getStoryInteractions = async (req, res) => {
    try {
        const { storyId } = req.params;
        const [viewsData, likesData] = await Promise.all([
            internalApi.getStoryViews(storyId),
            internalApi.getStoryLikes(storyId)
        ]);

        const views = viewsData.data.data;
        const likes = likesData.data.data;

        // Collect all user IDs to fetch profiles
        const userIds = [...new Set([
            ...views.map(v => v.viewerId),
            ...likes.map(l => l.reactorId)
        ])];

        let userMap = {};
        if (userIds.length > 0) {
            const usersRes = await internalApi.getUsersBulk(userIds);
            if (usersRes.data.success) {
                userMap = usersRes.data.data.reduce((acc, user) => {
                    acc[user.userId] = user;
                    return acc;
                }, {});
            }
        }

        // Attach user info
        const enrichedViews = views.map(v => ({
            ...v,
            username: userMap[v.viewerId]?.username || `user_${v.viewerId}`,
            profilePicture: userMap[v.viewerId]?.profilePicture
        }));

        const enrichedLikes = likes.map(l => ({
            ...l,
            username: userMap[l.reactorId]?.username || `user_${l.reactorId}`,
            profilePicture: userMap[l.reactorId]?.profilePicture
        }));

        res.json({
            success: true,
            data: {
                views: enrichedViews,
                likes: enrichedLikes
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Stories
exports.listStories = async (req, res) => {
    try {
        const { page, limit, search, status } = req.query;
        const response = await internalApi.listStories({ page, limit, search, status });

        if (response.data.success && response.data.data) {
            const stories = response.data.data;
            const userIds = [...new Set(stories.map(s => s.userId))].filter(Boolean);

            let userMap = {};
            if (userIds.length > 0) {
                const usersRes = await internalApi.getUsersBulk(userIds);
                if (usersRes.data.success) {
                    userMap = usersRes.data.data.reduce((acc, user) => {
                        acc[user.userId] = user;
                        return acc;
                    }, {});
                }
            }

            const enrichedStories = stories.map(story => ({
                ...story,
                userProfilePicture: userMap[story.userId]?.profilePicture
            }));

            return res.json({
                ...response.data,
                data: enrichedStories
            });
        }

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteStory = async (req, res) => {
    try {
        const { storyId } = req.params;
        const response = await internalApi.deleteStory(storyId);
        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'DELETE_STORY',
            targetType: 'story',
            targetId: storyId
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
