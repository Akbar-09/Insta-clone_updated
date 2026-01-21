const Follow = require('../models/Follow');
const UserProfile = require('../models/UserProfile');
const { publishEvent } = require('../config/rabbitmq');

/**
 * Follow a user
 * @param {string} followerId 
 * @param {string} followingId 
 * @returns {Object} result
 */
exports.followUser = async (followerId, followingId) => {
    if (followerId === followingId) {
        throw new Error('You cannot follow yourself');
    }

    const existingFollow = await Follow.findOne({
        where: { followerId, followingId }
    });

    if (existingFollow) {
        // Already following
        const followingUser = await UserProfile.findOne({ where: { userId: followingId } });
        return { isFollowing: true, followersCount: followingUser.followersCount };
    }

    // Create follow
    await Follow.create({ followerId, followingId });

    // Update counts
    await UserProfile.increment('followingCount', { where: { userId: followerId } });
    const followingUser = await UserProfile.increment('followersCount', { where: { userId: followingId } });

    // Publish event for notifications
    await publishEvent('USER_FOLLOWED', {
        followerId,
        followedId: followingId,
        timestamp: new Date()
    });

    return {
        isFollowing: true,
        followersCount: followingUser.followersCount
    };
};

/**
 * Unfollow a user
 * @param {string} followerId 
 * @param {string} followingId 
 * @returns {Object} result
 */
exports.unfollowUser = async (followerId, followingId) => {
    const deleted = await Follow.destroy({
        where: { followerId, followingId }
    });

    if (deleted) {
        // Update counts
        await UserProfile.decrement('followingCount', { where: { userId: followerId } });
        const followingUser = await UserProfile.decrement('followersCount', { where: { userId: followingId } });

        return {
            isFollowing: false,
            followersCount: followingUser.followersCount
        };
    }

    // Fallback if not found, just return current state
    const followingUser = await UserProfile.findOne({ where: { userId: followingId } });
    return {
        isFollowing: false,
        followersCount: followingUser ? followingUser.followersCount : 0
    };
};

/**
 * Check follow status
 * @param {string} followerId 
 * @param {string} followingId 
 * @returns {boolean}
 */
exports.isFollowing = async (followerId, followingId) => {
    const follow = await Follow.findOne({
        where: { followerId, followingId }
    });
    return !!follow;
};

/**
 * Get followers list
 * @param {string} userId 
 * @returns {Array}
 */
exports.getFollowers = async (userId) => {
    const followers = await Follow.findAll({
        where: { followingId: userId },
        attributes: ['followerId']
    });

    // In a real app, we would join with UserProfile to get details. 
    // Here we can fetch profiles.
    const followerIds = followers.map(f => f.followerId);
    const profiles = await UserProfile.findAll({
        where: { userId: followerIds }
    });

    return profiles;
};

/**
 * Get following list
 * @param {string} userId 
 * @returns {Array}
 */
exports.getFollowing = async (userId) => {
    const following = await Follow.findAll({
        where: { followerId: userId },
        attributes: ['followingId']
    });

    const followingIds = following.map(f => f.followingId);
    const profiles = await UserProfile.findAll({
        where: { userId: followingIds }
    });

    return profiles;
};
