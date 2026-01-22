const Follow = require('../models/Follow');
const FollowRequest = require('../models/FollowRequest');
const UserProfile = require('../models/UserProfile');
const { publishEvent } = require('../config/rabbitmq');
const sequelize = require('../config/database');

/**
 * Follow a user
 */
exports.followUser = async (followerId, followingId) => {
    if (followerId === followingId) {
        throw new Error('You cannot follow yourself');
    }

    // Check if already following
    const existingFollow = await Follow.findOne({
        where: { followerId, followingId }
    });

    const followingUser = await UserProfile.findOne({ where: { userId: followingId } });
    if (!followingUser) throw new Error('User not found');

    if (existingFollow) {
        return {
            status: 'following',
            isFollowing: true,
            isRequested: false,
            followersCount: followingUser.followersCount
        };
    }

    // Check if request already pending
    const existingRequest = await FollowRequest.findOne({
        where: { requesterId: followerId, targetUserId: followingId, status: 'PENDING' }
    });

    if (existingRequest) {
        return {
            status: 'requested',
            isFollowing: false,
            isRequested: true,
            followersCount: followingUser.followersCount
        };
    }

    // If private, create request
    if (followingUser.isPrivate) {
        await FollowRequest.create({
            requesterId: followerId,
            targetUserId: followingId,
            status: 'PENDING'
        });

        // Publish event (optional notification)
        // await publishEvent('FOLLOW_REQUESTED', { ... });

        return {
            status: 'requested',
            isFollowing: false,
            isRequested: true,
            followersCount: followingUser.followersCount
        };
    }

    // If public, proceed with follow
    await Follow.create({ followerId, followingId });

    // Update counts
    await UserProfile.increment('followingCount', { where: { userId: followerId } });
    await followingUser.increment('followersCount');

    // Publish event
    await publishEvent('USER_FOLLOWED', {
        followerId,
        followedId: followingId,
        timestamp: new Date()
    });

    return {
        status: 'following',
        isFollowing: true,
        isRequested: false,
        followersCount: followingUser.followersCount + 1
    };
};

/**
 * Unfollow a user (or cancel request)
 */
exports.unfollowUser = async (followerId, followingId) => {
    // Check for active follow
    const deletedFollow = await Follow.destroy({
        where: { followerId, followingId }
    });

    if (deletedFollow) {
        await UserProfile.decrement('followingCount', { where: { userId: followerId } });
        const followingUser = await UserProfile.decrement('followersCount', { where: { userId: followingId } });

        return {
            status: 'none',
            isFollowing: false,
            isRequested: false,
            followersCount: followingUser.followersCount
        };
    }

    // Check for pending request
    const deletedRequest = await FollowRequest.destroy({
        where: { requesterId: followerId, targetUserId: followingId, status: 'PENDING' }
    });

    const followingUser = await UserProfile.findOne({ where: { userId: followingId } });

    return {
        status: 'none',
        isFollowing: false,
        isRequested: false,
        followersCount: followingUser ? followingUser.followersCount : 0
    };
};

/**
 * Check follow status
 */
exports.isFollowing = async (followerId, followingId) => {
    const follow = await Follow.findOne({
        where: { followerId, followingId }
    });

    if (follow) return { padding: false, following: true, requested: false };

    const request = await FollowRequest.findOne({
        where: { requesterId: followerId, targetUserId: followingId, status: 'PENDING' }
    });

    if (request) return { padding: false, following: false, requested: true };

    return { padding: false, following: false, requested: false };
};

/**
 * Get followers list
 */
exports.getFollowers = async (userId) => {
    const followers = await Follow.findAll({
        where: { followingId: userId },
        attributes: ['followerId']
    });

    const followerIds = followers.map(f => f.followerId);
    return await UserProfile.findAll({
        where: { userId: followerIds }
    });
};

/**
 * Get following list
 */
exports.getFollowing = async (userId) => {
    const following = await Follow.findAll({
        where: { followerId: userId },
        attributes: ['followingId']
    });

    const followingIds = following.map(f => f.followingId);
    return await UserProfile.findAll({
        where: { userId: followingIds }
    });
};

/**
 * Get Pending Requests
 */
exports.getFollowRequests = async (userId) => {
    const requests = await FollowRequest.findAll({
        where: { targetUserId: userId, status: 'PENDING' },
        include: []
    });

    const requesterIds = requests.map(r => r.requesterId);
    const profiles = await UserProfile.findAll({ where: { userId: requesterIds } });

    return profiles.map(p => ({
        ...p.dataValues,
        requestId: requests.find(r => r.requesterId === p.userId).id
    }));
};

/**
 * Accept Request
 */
exports.acceptRequest = async (currentUserId, requesterId) => {
    const transaction = await sequelize.transaction();
    try {
        const request = await FollowRequest.findOne({
            where: { requesterId, targetUserId: currentUserId, status: 'PENDING' }
        });

        if (!request) throw new Error('Request not found');

        // Create follow
        await Follow.create({
            followerId: requesterId,
            followingId: currentUserId
        }, { transaction });

        // Update request status
        await request.update({ status: 'ACCEPTED' }, { transaction });

        // Update counts
        await UserProfile.increment('followingCount', { where: { userId: requesterId }, transaction });
        await UserProfile.increment('followersCount', { where: { userId: currentUserId }, transaction });

        await transaction.commit();

        await publishEvent('USER_FOLLOWED', {
            followerId: requesterId,
            followedId: currentUserId,
            timestamp: new Date()
        });

        return { success: true };
    } catch (err) {
        await transaction.rollback();
        throw err;
    }
};

/**
 * Reject Request
 */
exports.rejectRequest = async (currentUserId, requesterId) => {
    const request = await FollowRequest.findOne({
        where: { requesterId, targetUserId: currentUserId, status: 'PENDING' }
    });

    if (request) {
        await request.update({ status: 'REJECTED' });
    }

    return { success: true };
};
