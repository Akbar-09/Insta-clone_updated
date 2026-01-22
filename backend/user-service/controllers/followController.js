const followService = require('../services/followService');

exports.followUser = async (req, res) => {
    try {
        const followingId = req.params.userId; // The user being followed
        // Assuming auth middleware populates req.user.id or we pass it in headers/body for now
        // The previous code used req.body.currentUserId, sticking to that for consistency if auth middleware isn't strict yet
        const followerId = req.headers['x-user-id'] || req.body.currentUserId;

        if (!followerId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized: No user ID provided' });
        }

        const result = await followService.followUser(followerId, followingId);
        res.json({ status: 'success', ...result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.unfollowUser = async (req, res) => {
    try {
        const followingId = req.params.userId;
        const followerId = req.headers['x-user-id'] || req.body.currentUserId;

        if (!followerId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized: No user ID provided' });
        }

        const result = await followService.unfollowUser(followerId, followingId);
        res.json({ status: 'success', ...result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.checkFollowStatus = async (req, res) => {
    try {
        const followingId = req.params.userId;
        const followerId = req.headers['x-user-id'] || req.query.currentUserId;

        if (!followerId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        const isFollowing = await followService.isFollowing(followerId, followingId);
        res.json({ status: 'success', data: { isFollowing } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.getFollowers = async (req, res) => {
    try {
        const { userId } = req.params;
        const followers = await followService.getFollowers(userId);
        res.json({ status: 'success', data: followers });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.getFollowing = async (req, res) => {
    try {
        const { userId } = req.params;
        const following = await followService.getFollowing(userId);
        res.json({ status: 'success', data: following });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};
