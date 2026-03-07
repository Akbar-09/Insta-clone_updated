const UserProfile = require('../models/UserProfile');
const Follow = require('../models/Follow');
const BlockedUser = require('../models/BlockedUser');
const RestrictedAccount = require('../models/RestrictedAccount');
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
            const postsRes = await axios.get(`http://localhost:5003/?authorId=${profile.userId}`);
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

        // Get newly added profile features
        const ProfileLink = require('../models/ProfileLink');
        const PinnedPost = require('../models/PinnedPost');
        const links = await ProfileLink.findAll({ where: { userId }, order: [['position', 'ASC']] });
        const pinnedPosts = await PinnedPost.findAll({ where: { userId }, order: [['position', 'ASC']] });

        res.json({
            status: 'success',
            data: {
                ...profile.toJSON(),
                postsCount,
                followersCount,
                followingCount,
                links,
                pinnedPosts
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
            const postsRes = await axios.get(`http://localhost:5003/?authorId=${profile.userId}`);
            if (postsRes.data.status === 'success') {
                postsCount = postsRes.data.data.length;
            }
        } catch (error) {
            console.error('Error fetching posts count:', error.message);
        }

        // Check if current user is following this profile
        let isFollowing = false;
        let isBlocked = false;
        let isRestricted = false;
        let mutualFollowers = { count: 0, users: [] };
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

            const restriction = await RestrictedAccount.findOne({
                where: {
                    userId: currentUserId,
                    restrictedUserId: profile.userId
                }
            });
            isRestricted = !!restriction;

            // Mutual Followers
            try {
                const currentUserFollowing = await Follow.findAll({
                    where: { followerId: currentUserId },
                    attributes: ['followingId']
                });
                const currentUserFollowingIds = currentUserFollowing.map(f => f.followingId);
                
                const profileFollowers = await Follow.findAll({
                    where: { followingId: profile.userId },
                    attributes: ['followerId']
                });
                const profileFollowerIds = profileFollowers.map(f => f.followerId);

                const mutualIds = currentUserFollowingIds.filter(id => profileFollowerIds.includes(id));
                
                mutualFollowers.count = mutualIds.length;
                if (mutualIds.length > 0) {
                    const mutualProfiles = await UserProfile.findAll({
                        where: { userId: mutualIds.slice(0, 3) },
                        attributes: ['username', 'profilePicture']
                    });
                    mutualFollowers.users = mutualProfiles.map(p => ({
                        username: p.username,
                        profilePicture: p.profilePicture
                    }));
                }
            } catch (err) {
                console.error('Error fetching mutual followers:', err.message);
            }
        }

        // Update counts
        await profile.update({
            followersCount,
            followingCount,
            postCount: postsCount
        });

        // Get newly added profile features
        const ProfileLink = require('../models/ProfileLink');
        const PinnedPost = require('../models/PinnedPost');
        const links = await ProfileLink.findAll({ where: { userId: profile.userId }, order: [['position', 'ASC']] });
        const pinnedPosts = await PinnedPost.findAll({ where: { userId: profile.userId }, order: [['position', 'ASC']] });

        res.json({
            status: 'success',
            data: {
                ...profile.toJSON(),
                postsCount,
                followersCount,
                followingCount,
                isFollowing,
                isBlocked,
                isRestricted,
                mutualFollowers,
                links,
                pinnedPosts
            }
        });
    } catch (error) {
        console.error('Get User Profile Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

/**
 * Get embed code for a profile
 * GET /api/v1/profile/:username/embed-code
 */
exports.getProfileEmbedCode = async (req, res) => {
    try {
        const { username } = req.params;

        const profile = await UserProfile.findOne({ where: { username } });

        if (!profile) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        // Generate embed HTML
        const embedUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/embed/profile/${username}`;
        const embedHtml = `<iframe src="${embedUrl}" width="400" height="480" frameborder="0" scrolling="no" allowtransparency="true"></iframe>`;

        res.json({
            status: 'success',
            data: {
                embedUrl,
                embedHtml,
                username: profile.username
            }
        });
    } catch (error) {
        console.error('Get Profile Embed Error:', error);
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

        const { fullName, bio, website, gender, profilePicture, username, isPrivate, showAccountSuggestions, allowSearchIndexing, displayName, pronouns, pronounVisibility, categoryId, contactEmail, contactPhone, contactAddress, avatarType, avatarUrl } = req.body;

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

        // Add new profile upgrade fields
        if (displayName !== undefined && displayName !== profile.displayName) profile.displayName = displayName;
        if (pronouns !== undefined && pronouns !== profile.pronouns) profile.pronouns = pronouns;
        if (pronounVisibility !== undefined && pronounVisibility !== profile.pronounVisibility) profile.pronounVisibility = pronounVisibility;
        if (categoryId !== undefined && categoryId !== profile.categoryId) profile.categoryId = categoryId;
        if (contactEmail !== undefined && contactEmail !== profile.contactEmail) profile.contactEmail = contactEmail;
        if (contactPhone !== undefined && contactPhone !== profile.contactPhone) profile.contactPhone = contactPhone;
        if (contactAddress !== undefined && contactAddress !== profile.contactAddress) profile.contactAddress = contactAddress;
        if (avatarType !== undefined && avatarType !== profile.avatarType) profile.avatarType = avatarType;
        if (avatarUrl !== undefined && avatarUrl !== profile.avatarUrl) profile.avatarUrl = avatarUrl;

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
 * Update Bio
 * PUT /api/v1/profile/bio
 */
exports.updateBio = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.body.userId;
        const { bio } = req.body;

        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const profile = await UserProfile.findOne({ where: { userId } });
        if (!profile) return res.status(404).json({ status: 'error', message: 'Profile not found' });

        if (bio !== undefined && bio !== profile.bio) {
            await AccountHistory.create({ userId, action: 'BIO_CHANGE', oldValue: profile.bio, newValue: bio });
            profile.bio = bio;
            await profile.save();

            // Publish event
            await publishEvent('PROFILE_UPDATED', {
                userId: profile.userId,
                username: profile.username,
                bio: profile.bio,
                timestamp: new Date()
            });
        }

        res.json({ status: 'success', data: profile, message: 'Bio updated successfully' });
    } catch (error) {
        console.error('Update Bio Error:', error);
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
            let isFollowing = false;
            if (currentUserId) {
                const follow = await Follow.findOne({
                    where: { followerId: currentUserId, followingId: userId }
                });
                isFollowing = !!follow;
            }

            if (!isFollowing) {
                return res.json({ status: 'success', data: [], message: 'Account is private' });
            }
        }

        // Fetch posts from post-service
        try {
            const url = `http://localhost:5003/?authorId=${userId}`;
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
            let isFollowing = false;
            if (currentUserId) {
                const follow = await Follow.findOne({
                    where: { followerId: currentUserId, followingId: userId }
                });
                isFollowing = !!follow;
            }
            if (!isFollowing) return res.json({ status: 'success', data: [], message: 'Account is private' });
        }

        try {
            const url = `http://localhost:5005/user?userId=${userId}`;
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
 * Get user's tagged posts
 * GET /api/v1/profile/:userId/tagged
 */
exports.getUserTaggedPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUserId = req.headers['x-user-id'] || req.query.currentUserId;
        const PostTag = require('../models/PostTag');

        // Privacy Check
        const profile = await UserProfile.findOne({ where: { userId } });
        if (!profile) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        
        if (profile.isPrivate && (!currentUserId || parseInt(currentUserId) !== parseInt(userId))) {
            let isFollowing = false;
            if (currentUserId) {
                const follow = await Follow.findOne({
                    where: { followerId: currentUserId, followingId: userId }
                });
                isFollowing = !!follow;
            }
            if (!isFollowing) {
                return res.json({ status: 'success', data: [], message: 'Account is private' });
            }
        }

        // Only show approved tags
        const tags = await PostTag.findAll({
            where: { taggedUserId: userId, approved: true },
            attributes: ['postId']
        });

        const postIds = tags.map(t => t.postId);

        if (postIds.length === 0) {
            return res.json({ status: 'success', data: [] });
        }

        // Fetch posts from post-service
        try {
            const url = `http://localhost:5003/?ids=${postIds.join(',')}`;
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
            console.error('Error fetching tagged posts:', error.message);
            res.json({ status: 'success', data: [] });
        }
    } catch (error) {
        console.error('Get User Tagged Posts Error:', error);
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

        let combinedSaved = [];

        // 1. Fetch saved posts from post-service
        try {
            const savedRes = await axios.get(`http://localhost:5003/saved?userId=${userId}`);
            if (savedRes.data.status === 'success' && Array.isArray(savedRes.data.data)) {
                combinedSaved = [...combinedSaved, ...savedRes.data.data.map(p => ({ ...p, type: 'POST' }))];
            }
        } catch (error) {
            console.error('Error fetching saved posts:', error.message);
        }

        // 2. Fetch saved reels from reel-service
        try {
            const savedReelsRes = await axios.get(`http://localhost:5005/saved?userId=${userId}`);
            if (savedReelsRes.data.status === 'success' && Array.isArray(savedReelsRes.data.data)) {
                combinedSaved = [...combinedSaved, ...savedReelsRes.data.data.map(r => ({ ...r, type: 'REEL' }))];
            }
        } catch (error) {
            console.error('Error fetching saved reels:', error.message);
        }

        // Sort by createdAt if available
        combinedSaved.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.json({
            status: 'success',
            data: combinedSaved
        });
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
        if (currentUserId && currentUserId !== 'undefined') {
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
        if (currentUserId && currentUserId !== 'undefined') {
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
        let restrictedMap = {};

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

            const restricted = await RestrictedAccount.findAll({
                where: {
                    userId: currentUserId,
                    restrictedUserId: userIds
                },
                attributes: ['restrictedUserId']
            });
            restricted.forEach(r => {
                restrictedMap[r.restrictedUserId] = true;
            });
        }

        const result = profiles.map(p => ({
            ...p.toJSON(),
            isFollowing: !!followingMap[p.userId],
            isBlocked: !!blockedMap[p.userId],
            isRestricted: !!restrictedMap[p.userId]
        }));

        res.json({ status: 'success', data: result });
    } catch (error) {
        console.error('Batch Profile Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

/**
 * Add Link
 * POST /api/v1/profile/link
 */
exports.addLink = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.body.userId;
        const { title, url, position } = req.body;

        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        if (!url) return res.status(400).json({ status: 'error', message: 'URL is required' });

        const ProfileLink = require('../models/ProfileLink');
        const link = await ProfileLink.create({
            userId,
            title: title || 'Website',
            url,
            position: position || 0
        });

        res.json({ status: 'success', data: link, message: 'Link added successfully' });
    } catch (error) {
        console.error('Add Link Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

/**
 * Pin Post
 * POST /api/v1/profile/pin-post
 */
exports.pinPost = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.body.userId;
        const { postId } = req.body;

        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        if (!postId) return res.status(400).json({ status: 'error', message: 'Post ID is required' });

        const PinnedPost = require('../models/PinnedPost');
        
        // Check limit
        const pinnedCount = await PinnedPost.count({ where: { userId } });
        if (pinnedCount >= 3) {
            return res.status(400).json({ status: 'error', message: 'Max 3 pinned posts allowed' });
        }

        const existing = await PinnedPost.findOne({ where: { userId, postId } });
        if (existing) {
            return res.status(400).json({ status: 'error', message: 'Post already pinned' });
        }

        const pin = await PinnedPost.create({
            userId,
            postId,
            position: pinnedCount
        });

        res.json({ status: 'success', data: pin, message: 'Post pinned successfully' });
    } catch (error) {
        console.error('Pin Post Error:', error);
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

/**
 * Get similar accounts
 * GET /api/v1/profile/:userId/similar
 */
exports.getSimilarAccounts = async (req, res) => {
    try {
        const { userId } = req.params;
        const profile = await UserProfile.findOne({ where: { userId } });
        if (!profile) return res.status(404).json({ status: 'error', message: 'User not found' });

        const currentUserId = req.headers['x-user-id'];

        // 1. Same category
        let similarIds = [];
        if (profile.categoryId) {
            const sameCategory = await UserProfile.findAll({
                where: { 
                    categoryId: profile.categoryId,
                    userId: { [Op.ne]: userId }
                },
                attributes: ['userId'],
                limit: 10
            });
            similarIds = sameCategory.map(u => u.userId);
        }

        // 2. Shared followers (People who follow this user also follow...)
        const myFollowers = await Follow.findAll({ where: { followingId: userId }, attributes: ['followerId'] });
        const followerIds = myFollowers.map(f => f.followerId);

        if (followerIds.length > 0) {
            const otherFollowing = await Follow.findAll({
                where: { 
                    followerId: { [Op.in]: followerIds },
                    followingId: { [Op.ne]: userId }
                },
                attributes: ['followingId'],
                limit: 50
            });
            const otherIds = otherFollowing.map(f => f.followingId);
            similarIds = [...new Set([...similarIds, ...otherIds])];
        }

        // Remove block/restricted users and self if applicable
        if (currentUserId) {
            similarIds = similarIds.filter(id => id.toString() !== currentUserId.toString());
        }

        const profiles = await UserProfile.findAll({
            where: { userId: similarIds },
            limit: 10,
            attributes: ['userId', 'username', 'fullName', 'profilePicture', 'followersCount']
        });

        res.json({ status: 'success', data: profiles });
    } catch (err) {
        console.error('getSimilarAccounts error:', err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

const followService = require('../services/followService');

exports.getFollowersList = async (req, res) => {
    try {
        const { userId } = req.params;
        const followers = await followService.getFollowers(userId);
        res.json({ status: 'success', data: followers });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.getFollowingList = async (req, res) => {
    try {
        const { userId } = req.params;
        const following = await followService.getFollowing(userId);
        res.json({ status: 'success', data: following });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

module.exports = exports;
