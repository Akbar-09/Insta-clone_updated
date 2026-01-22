const BlockedUser = require('../models/BlockedUser');
const UserProfile = require('../models/UserProfile');
const Follow = require('../models/Follow');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

exports.getBlockedUsers = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const blocked = await BlockedUser.findAll({
            where: { blockerId: userId },
            attributes: ['blockedId']
        });

        const blockedIds = blocked.map(b => b.blockedId);

        if (blockedIds.length === 0) {
            return res.json({ status: 'success', data: [] });
        }

        const profiles = await UserProfile.findAll({
            where: { userId: blockedIds },
            attributes: ['userId', 'username', 'fullName', 'profilePicture']
        });

        res.json({ status: 'success', data: profiles });
    } catch (err) {
        console.error('Get Blocked Users Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

exports.blockUser = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const userId = req.headers['x-user-id'];
        const { userId: blockedId } = req.params;

        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        if (parseInt(userId) === parseInt(blockedId)) return res.status(400).json({ status: 'error', message: 'Cannot block yourself' });

        // 1. Create Block Record
        await BlockedUser.findOrCreate({
            where: { blockerId: userId, blockedId },
            transaction
        });

        // 2. Force Unfollow (Both directions)
        // Me unfollowing them
        const outbound = await Follow.destroy({
            where: { followerId: userId, followingId: blockedId },
            transaction
        });
        if (outbound) {
            await UserProfile.decrement('followingCount', { where: { userId }, transaction });
            await UserProfile.decrement('followersCount', { where: { userId: blockedId }, transaction });
        }

        // Them unfollowing me
        const inbound = await Follow.destroy({
            where: { followerId: blockedId, followingId: userId },
            transaction
        });
        if (inbound) {
            await UserProfile.decrement('followingCount', { where: { userId: blockedId }, transaction });
            await UserProfile.decrement('followersCount', { where: { userId }, transaction });
        }

        await transaction.commit();
        res.json({ status: 'success', message: 'User blocked' });
    } catch (err) {
        await transaction.rollback();
        console.error('Block User Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

exports.unblockUser = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { userId: blockedId } = req.params;

        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        await BlockedUser.destroy({
            where: { blockerId: userId, blockedId }
        });

        res.json({ status: 'success', message: 'User unblocked' });
    } catch (err) {
        console.error('Unblock User Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Check if there is ANY block between two users (bidirectional)
// Used for shielding content
exports.checkBlockStatus = async (userA, userB) => {
    if (!userA || !userB) return false;
    const block = await BlockedUser.findOne({
        where: {
            [Op.or]: [
                { blockerId: userA, blockedId: userB },
                { blockerId: userB, blockedId: userA }
            ]
        }
    });
    return !!block;
};
