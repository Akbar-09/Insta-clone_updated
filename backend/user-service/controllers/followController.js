const followService = require('../services/followService');

exports.followUser = async (req, res) => {
    try {
        const followingId = req.params.userId; // The user being followed
        const followerId = req.headers['x-user-id'] || req.body.currentUserId;
        const followerUsername = req.headers['x-user-username'] || req.body.currentUsername || 'Someone';

        if (!followerId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized: No user ID provided' });
        }

        const result = await followService.followUser(followerId, followingId, followerUsername);
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

        const status = await followService.isFollowing(followerId, followingId);
        res.json({ status: 'success', data: { isFollowing: status.following } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.getFollowers = async (req, res) => {
    try {
        const { userId } = req.params;
        const followers = await followService.getFollowers(userId);
        res.json({ success: true, data: followers });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getFollowing = async (req, res) => {
    try {
        const { userId } = req.params;
        const following = await followService.getFollowing(userId);
        res.json({ success: true, data: following });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getFollowRequests = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const requests = await followService.getFollowRequests(userId);
        res.json({ status: 'success', data: requests });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.acceptRequest = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { requesterId } = req.body; // or params

        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        await followService.acceptRequest(userId, requesterId);
        res.json({ status: 'success', message: 'Request accepted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.rejectRequest = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { requesterId } = req.body;

        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        await followService.rejectRequest(userId, requesterId);
        res.json({ status: 'success', message: 'Request rejected' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};
