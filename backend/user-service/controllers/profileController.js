const UserProfile = require('../models/UserProfile');
const Follow = require('../models/Follow');
const BlockedUser = require('../models/BlockedUser');
const AccountHistory = require('../models/AccountHistory');
const { publishEvent } = require('../config/rabbitmq');
const axios = require('axios');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

/**
 * Get suggested users for follow
 * GET /api/v1/profile/suggestions
 */
exports.getSuggestions = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.query.userId;
        const currentUserId = userId; // Alias for clarity

        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        // 1. Get List of users I already follow
        const following = await Follow.findAll({
            where: { followerId: userId },
            attributes: ['followingId']
        });
        const followingIds = following.map(f => f.followingId);

        // 2. Get Blocked Users (I blocked them OR they blocked me)
        const blocked = await BlockedUser.findAll({
            where: {
                [Op.or]: [
                    { blockerId: userId },
                    { blockedId: userId }
                ]
            },
            attributes: ['blockerId', 'blockedId']
        });

        const blockedIds = blocked.reduce((acc, b) => {
            acc.push(b.blockerId);
            acc.push(b.blockedId);
            return acc;
        }, []);


        // 3. Exclude myself, following, and blocked users
        const excludeIds = [...new Set([...followingIds, parseInt(userId), ...blockedIds])]; // Unique IDs

        // 4. Find recent or random users not in exclude list
        const limit = parseInt(req.query.limit) || 5;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;

        const suggestions = await UserProfile.findAll({
            where: {
                userId: {
                    [Op.notIn]: excludeIds
                }
            },
            limit: limit,
            offset: offset,
            order: sequelize.random()
        });

        // 4. Transform result
        const data = suggestions.map(user => ({
            userId: user.userId,
            username: user.username,
            fullName: user.fullName,
            profilePicture: user.profilePicture,
            isFollowing: false // By definition
        }));

        res.json({ status: 'success', data });

    } catch (error) {
        console.error('Get Suggestions Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};



/**
 * Get current user's profile with counts
 * GET /api/v1/profile/me
 */
exports.getMyProfile = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.query.userId;

        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        const profile = await UserProfile.findOne({ where: { userId } });

        if (!profile) {
            return res.status(404).json({ status: 'error', message: 'Profile not found' });
        }

        // Get actual counts from database
        const followersCount = await Follow.count({ where: { followingId: userId } });
        const followingCount = await Follow.count({ where: { followerId: userId } });

        // Get posts count from post-service
        let postsCount = 0;
        try {
            const postsRes = await axios.get(`http://localhost:5003/?username=${profile.username}`);
            if (postsRes.data.status === 'success') {
                postsCount = postsRes.data.data.length;
            }
        } catch (error) {
            console.error('Error fetching posts count:', error.message);
        }

        // Update counts in profile
        await profile.update({
            followersCount,
            followingCount,
            postCount: postsCount
        });

        res.json({
            status: 'success',
            data: {
                ...profile.toJSON(),
                postsCount,
                followersCount,
                followingCount
            }
        });
    } catch (error) {
        console.error('Get My Profile Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

/**
 * Get user profile by username with counts
 * GET /api/v1/profile/:username
 */
exports.getUserProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const currentUserId = req.headers['x-user-id'] || req.query.currentUserId;

        const profile = await UserProfile.findOne({ where: { username } });

        if (!profile) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        // Get actual counts
        const followersCount = await Follow.count({ where: { followingId: profile.userId } });
        const followingCount = await Follow.count({ where: { followerId: profile.userId } });

        // Get posts count
        let postsCount = 0;
        try {
            const postsRes = await axios.get(`http://localhost:5003/?username=${profile.username}`);
            if (postsRes.data.status === 'success') {
                postsCount = postsRes.data.data.length;
            }
        } catch (error) {
            console.error('Error fetching posts count:', error.message);
        }

        // Check if current user is following this profile
        let isFollowing = false;
        let isBlocked = false;
        if (currentUserId && (currentUserId.toString() !== profile.userId.toString())) {
            const follow = await Follow.findOne({
                where: {
                    followerId: currentUserId,
                    followingId: profile.userId
                }
            });
            isFollowing = !!follow;

            const block = await BlockedUser.findOne({
                where: {
                    blockerId: currentUserId,
                    blockedId: profile.userId
                }
            });
            isBlocked = !!block;
        }

        // Update counts
        await profile.update({
            followersCount,
            followingCount,
            postCount: postsCount
        });

        res.json({
            status: 'success',
            data: {
                ...profile.toJSON(),
                postsCount,
                followersCount,
                followingCount,
                isFollowing,
                isBlocked
            }
        });
    } catch (error) {
        console.error('Get User Profile Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

/**
 * Update current user's profile
 * PUT /api/v1/profile/me
 */
exports.updateMyProfile = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.body.userId;

        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        const { fullName, bio, website, gender, profilePicture, username, isPrivate, showAccountSuggestions, allowSearchIndexing } = req.body;

        const profile = await UserProfile.findOne({ where: { userId } });

        if (!profile) {
            return res.status(404).json({ status: 'error', message: 'Profile not found' });
        }

        const historyLogs = [];
        // Update fields if provided and log changes
        if (fullName !== undefined && fullName !== profile.fullName) {
            historyLogs.push({ userId, action: 'NAME_CHANGE', oldValue: profile.fullName, newValue: fullName });
            profile.fullName = fullName;
        }
        if (bio !== undefined && bio !== profile.bio) {
            historyLogs.push({ userId, action: 'BIO_CHANGE', oldValue: profile.bio, newValue: bio });
            profile.bio = bio;
        }
        if (website !== undefined && website !== profile.website) {
            historyLogs.push({ userId, action: 'WEBSITE_CHANGE', oldValue: profile.website, newValue: website });
            profile.website = website;
        }
        if (gender !== undefined && gender !== profile.gender) {
            historyLogs.push({ userId, action: 'GENDER_CHANGE', oldValue: profile.gender, newValue: gender });
            profile.gender = gender;
        }
        if (profilePicture !== undefined && profilePicture !== profile.profilePicture) {
            historyLogs.push({ userId, action: 'PROFILE_PHOTO_CHANGE', oldValue: profile.profilePicture, newValue: profilePicture });
            profile.profilePicture = profilePicture;
        }
        if (isPrivate !== undefined && isPrivate !== profile.isPrivate) {
            historyLogs.push({ userId, action: 'PRIVACY_CHANGE', oldValue: profile.isPrivate ? 'PRIVATE' : 'PUBLIC', newValue: isPrivate ? 'PRIVATE' : 'PUBLIC' });
            profile.isPrivate = isPrivate;
        }
        if (showAccountSuggestions !== undefined && showAccountSuggestions !== profile.showAccountSuggestions) {
            // No specific history log required for this preference, or we can add one.
            profile.showAccountSuggestions = showAccountSuggestions;
        }
        if (allowSearchIndexing !== undefined && allowSearchIndexing !== profile.allowSearchIndexing) {
            profile.allowSearchIndexing = allowSearchIndexing;
        }

        // Handle username update (check uniqueness)
        if (username && username !== profile.username) {
            const existing = await UserProfile.findOne({ where: { username } });
            if (existing) {
                return res.status(400).json({ status: 'error', message: 'Username already taken' });
            }
            historyLogs.push({ userId, action: 'USERNAME_CHANGE', oldValue: profile.username, newValue: username });
            profile.username = username;
        }

        await profile.save();

        // Save history logs
        if (historyLogs.length > 0) {
            await AccountHistory.bulkCreate(historyLogs);
        }

        // Publish profile update event
        await publishEvent('PROFILE_UPDATED', {
            userId: profile.userId,
            username: profile.username,
            fullName: profile.fullName,
            profilePicture: profile.profilePicture,
            timestamp: new Date()
        });

        res.json({
            status: 'success',
            data: profile,
            message: 'Profile updated successfully'
        });
    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

/**
 * Delete profile photo
 * DELETE /api/v1/profile/photo
 */

/**
 * Get user's posts
 * GET /api/v1/profile/:userId/posts
 */
exports.getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUserId = req.headers['x-user-id'] || req.query.currentUserId;

        // Get user profile
        const profile = await UserProfile.findOne({ where: { userId } });

        if (!profile) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        // Privacy Check
        if (profile.isPrivate && (!currentUserId || parseInt(currentUserId) !== parseInt(userId))) {
            // Check if following
            const isFollowing = await Follow.findOne({
                where: { followerId: currentUserId, followingId: userId }
            });

            if (!isFollowing) {
                return res.json({ status: 'success', data: [], message: 'Account is private' });
            }
        }

        // Fetch posts from post-service
        try {
            const url = `http://localhost:5003/?username=${profile.username}`;
            console.log(`[UserService] Fetching posts from: ${url}`);
            const postsRes = await axios.get(url);

            if (postsRes.data.status === 'success') {
                res.json({
                    status: 'success',
                    data: postsRes.data.data
                });
            } else {
                res.json({ status: 'success', data: [] });
            }
        } catch (error) {
            console.error('Error fetching posts:', error.message);
            res.json({ status: 'success', data: [] });
        }
    } catch (error) {
        console.error('Get User Posts Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

/**
 * Get user's reels
 * GET /api/v1/profile/:userId/reels
 */
exports.getUserReels = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUserId = req.headers['x-user-id'] || req.query.currentUserId;

        const profile = await UserProfile.findOne({ where: { userId } });
        if (!profile) return res.status(404).json({ status: 'error', message: 'User not found' });

        // Privacy Check
        if (profile.isPrivate && (!currentUserId || parseInt(currentUserId) !== parseInt(userId))) {
            const isFollowing = await Follow.findOne({
                where: { followerId: currentUserId, followingId: userId }
            });
            if (!isFollowing) return res.json({ status: 'success', data: [], message: 'Account is private' });
        }

        try {
            const url = `http://localhost:5004/user?username=${profile.username}`;
            console.log(`[UserService] Fetching reels from: ${url}`);
            const reelsRes = await axios.get(url);
            res.json({ status: 'success', data: reelsRes.data.data || [] });
        } catch (error) {
            console.error('Error fetching reels:', error.message);
            res.json({ status: 'success', data: [] });
        }
    } catch (error) {
        console.error('Get User Reels Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

/**
 * Get current user's saved posts
 * GET /api/v1/profile/me/saved
 */
exports.getMySavedPosts = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.query.userId;

        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        // Fetch saved posts from post-service
        try {
            const savedRes = await axios.get(`http://localhost:5003/saved?userId=${userId}`);

            if (savedRes.data.status === 'success') {
                res.json({
                    status: 'success',
                    data: savedRes.data.data
                });
            } else {
                res.json({ status: 'success', data: [] });
            }
        } catch (error) {
            console.error('Error fetching saved posts:', error.message);
            res.json({ status: 'success', data: [] });
        }
    } catch (error) {
        console.error('Get Saved Posts Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

/**
 * Get user's followers list with details
 * GET /api/v1/profile/:userId/followers
 */
exports.getFollowersList = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUserId = req.headers['x-user-id'] || req.query.currentUserId;

        const followers = await Follow.findAll({
            where: { followingId: userId },
            attributes: ['followerId', 'createdAt']
        });

        const followerIds = followers.map(f => f.followerId);

        if (followerIds.length === 0) {
            return res.json({ status: 'success', data: [] });
        }

        const profiles = await UserProfile.findAll({
            where: { userId: followerIds },
            attributes: ['userId', 'username', 'fullName', 'profilePicture', 'bio']
        });

        // Check if current user is following each follower
        let currentUserFollowing = [];
        if (currentUserId) {
            const following = await Follow.findAll({
                where: {
                    followerId: currentUserId,
                    followingId: followerIds
                },
                attributes: ['followingId']
            });
            currentUserFollowing = following.map(f => f.followingId);
        }

        const result = profiles.map(profile => ({
            ...profile.toJSON(),
            isFollowing: currentUserFollowing.includes(profile.userId),
            followedAt: followers.find(f => f.followerId === profile.userId)?.createdAt
        }));

        res.json({ status: 'success', data: result });
    } catch (error) {
        console.error('Get Followers List Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

/**
 * Get user's following list with details
 * GET /api/v1/profile/:userId/following
 */
exports.getFollowingList = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUserId = req.headers['x-user-id'] || req.query.currentUserId;

        const following = await Follow.findAll({
            where: { followerId: userId },
            attributes: ['followingId', 'createdAt']
        });

        const followingIds = following.map(f => f.followingId);

        if (followingIds.length === 0) {
            return res.json({ status: 'success', data: [] });
        }

        const profiles = await UserProfile.findAll({
            where: { userId: followingIds },
            attributes: ['userId', 'username', 'fullName', 'profilePicture', 'bio']
        });

        // Check if current user is following each person
        let currentUserFollowing = [];
        if (currentUserId) {
            const followingCheck = await Follow.findAll({
                where: {
                    followerId: currentUserId,
                    followingId: followingIds
                },
                attributes: ['followingId']
            });
            currentUserFollowing = followingCheck.map(f => f.followingId);
        }

        const result = profiles.map(profile => ({
            ...profile.toJSON(),
            isFollowing: currentUserFollowing.includes(profile.userId),
            followedAt: following.find(f => f.followingId === profile.userId)?.createdAt
        }));

        res.json({ status: 'success', data: result });
    } catch (error) {
        console.error('Get Following List Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

/**
 * Remove a follower (only profile owner can do this)
 * DELETE /api/v1/profile/followers/:followerId
 */
exports.removeFollower = async (req, res) => {
    try {
        const { followerId } = req.params;
        const userId = req.headers['x-user-id'] || req.body.userId;

        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        // Remove the follow relationship
        const deleted = await Follow.destroy({
            where: {
                followerId: followerId,
                followingId: userId
            }
        });

        if (deleted) {
            // Update counts
            await UserProfile.decrement('followingCount', { where: { userId: followerId } });
            await UserProfile.decrement('followersCount', { where: { userId } });

            res.json({
                status: 'success',
                message: 'Follower removed successfully'
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Follow relationship not found'
            });
        }
    } catch (error) {
        console.error('Remove Follower Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

/**
 * Update Profile Photo
 * POST /api/v1/profile/profile-photo
 */
exports.updateProfilePhoto = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.body.userId;
        const { profilePicture } = req.body;

        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        const profile = await UserProfile.findOne({ where: { userId } });
        if (!profile) {
            return res.status(404).json({ status: 'error', message: 'Profile not found' });
        }

        const oldPhoto = profile.profilePicture;
        profile.profilePicture = profilePicture;
        await profile.save();

        // Log history
        await AccountHistory.create({
            userId,
            action: 'PROFILE_PHOTO_CHANGE',
            oldValue: oldPhoto,
            newValue: profilePicture
        });

        // Publish event
        await publishEvent('PROFILE_UPDATED', {
            userId: profile.userId,
            username: profile.username,
            fullName: profile.fullName,
            profilePicture: profile.profilePicture,
            timestamp: new Date()
        });

        res.json({
            status: 'success',
            data: profile,
            message: 'Profile photo updated successfully'
        });
    } catch (error) {
        console.error('Update Profile Photo Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

/**
 * Remove Profile Photo
 * DELETE /api/v1/profile/profile-photo
 */
exports.removeProfilePhoto = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.body.userId;

        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        const profile = await UserProfile.findOne({ where: { userId } });
        if (!profile) {
            return res.status(404).json({ status: 'error', message: 'Profile not found' });
        }

        const oldPhoto = profile.profilePicture;
        profile.profilePicture = '';
        await profile.save();

        // Log History
        await AccountHistory.create({
            userId,
            action: 'PROFILE_PHOTO_REMOVED',
            oldValue: oldPhoto,
            newValue: ''
        });

        // Publish Event
        await publishEvent('PROFILE_UPDATED', {
            userId: profile.userId,
            username: profile.username,
            fullName: profile.fullName,
            profilePicture: '',
            timestamp: new Date()
        });

        res.json({
            status: 'success',
            data: profile,
            message: 'Profile photo removed successfully'
        });
    } catch (error) {
        console.error('Remove Profile Photo Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

/**
 * Get multiple profiles by IDs
 * POST /api/v1/profile/batch
 */
exports.getBatchProfiles = async (req, res) => {
    try {
        const { userIds } = req.body;
        const currentUserId = req.body.currentUserId || req.headers['x-user-id'];
        if (!userIds || !Array.isArray(userIds)) {
            return res.status(400).json({ status: 'error', message: 'userIds array required' });
        }

        const profiles = await UserProfile.findAll({
            where: { userId: userIds },
            attributes: ['userId', 'username', 'fullName', 'profilePicture']
        });

        let followingMap = {};
        let blockedMap = {};

        if (currentUserId) {
            const following = await Follow.findAll({
                where: {
                    followerId: currentUserId,
                    followingId: userIds
                },
                attributes: ['followingId']
            });
            following.forEach(f => {
                followingMap[f.followingId] = true;
            });

            const blocked = await BlockedUser.findAll({
                where: {
                    blockerId: currentUserId,
                    blockedId: userIds
                },
                attributes: ['blockedId']
            });
            blocked.forEach(b => {
                blockedMap[b.blockedId] = true;
            });
        }

        const result = profiles.map(p => ({
            ...p.toJSON(),
            isFollowing: !!followingMap[p.userId],
            isBlocked: !!blockedMap[p.userId]
        }));

        res.json({ status: 'success', data: result });
    } catch (error) {
        console.error('Batch Profile Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

/**
 * Get Account History
 * GET /api/v1/profile/activity/account-history
 */
exports.getAccountHistory = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const history = await AccountHistory.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']]
        });

        res.json({
            status: 'success',
            data: history
        });
    } catch (error) {
        console.error('Get Account History Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

module.exports = exports;
