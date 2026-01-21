const UserProfile = require('../models/UserProfile');
const Follow = require('../models/Follow');
const { publishEvent } = require('../config/rabbitmq');
const axios = require('axios');

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
            const postsRes = await axios.get(`http://localhost:5001/posts?authorId=${profile.userId}`);
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
            const postsRes = await axios.get(`http://localhost:5001/posts?authorId=${profile.userId}`);
            if (postsRes.data.status === 'success') {
                postsCount = postsRes.data.data.length;
            }
        } catch (error) {
            console.error('Error fetching posts count:', error.message);
        }

        // Check if current user is following this profile
        let isFollowing = false;
        if (currentUserId && currentUserId !== profile.userId.toString()) {
            const follow = await Follow.findOne({
                where: { followerId: currentUserId, followingId: profile.userId }
            });
            isFollowing = !!follow;
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
                isFollowing
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

        const { fullName, bio, website, gender, profilePicture, username, isPrivate } = req.body;

        const profile = await UserProfile.findOne({ where: { userId } });

        if (!profile) {
            return res.status(404).json({ status: 'error', message: 'Profile not found' });
        }

        // Update fields if provided
        if (fullName !== undefined) profile.fullName = fullName;
        if (bio !== undefined) profile.bio = bio;
        if (website !== undefined) profile.website = website;
        if (gender !== undefined) profile.gender = gender;
        if (profilePicture !== undefined) profile.profilePicture = profilePicture;
        if (isPrivate !== undefined) profile.isPrivate = isPrivate;

        // Handle username update (check uniqueness)
        if (username && username !== profile.username) {
            const existing = await UserProfile.findOne({ where: { username } });
            if (existing) {
                return res.status(400).json({ status: 'error', message: 'Username already taken' });
            }
            profile.username = username;
        }

        await profile.save();

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
 * Get user's posts
 * GET /api/v1/profile/:userId/posts
 */
exports.getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;

        // Get user profile to get username
        const profile = await UserProfile.findOne({ where: { userId } });

        if (!profile) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        // Fetch posts from post-service
        try {
            const url = `http://localhost:5001/posts?authorId=${profile.userId}`;
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
            const savedRes = await axios.get(`http://localhost:5001/posts/saved?userId=${userId}`);

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

        profile.profilePicture = profilePicture;
        await profile.save();

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

        profile.profilePicture = '';
        await profile.save();

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

module.exports = exports;
