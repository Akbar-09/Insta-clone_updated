const CloseFriend = require('../models/CloseFriend');
const UserProfile = require('../models/UserProfile');
const { Op } = require('sequelize');

exports.getCloseFriends = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const closeFriends = await CloseFriend.findAll({
            where: { userId },
            attributes: ['friendId']
        });

        const friendIds = closeFriends.map(cf => cf.friendId);

        if (friendIds.length === 0) {
            return res.json({ status: 'success', data: [] });
        }

        const profiles = await UserProfile.findAll({
            where: { userId: friendIds },
            attributes: ['userId', 'username', 'fullName', 'profilePicture']
        });

        res.json({ status: 'success', data: profiles });
    } catch (err) {
        console.error('Get Close Friends Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

exports.addCloseFriend = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { friendId } = req.params;

        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        if (parseInt(userId) === parseInt(friendId)) return res.status(400).json({ status: 'error', message: 'Cannot add yourself' });

        await CloseFriend.findOrCreate({
            where: { userId, friendId }
        });

        res.json({ status: 'success', message: 'Added to close friends' });
    } catch (err) {
        console.error('Add Close Friend Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

exports.removeCloseFriend = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { friendId } = req.params;

        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        await CloseFriend.destroy({
            where: { userId, friendId }
        });

        res.json({ status: 'success', message: 'Removed from close friends' });
    } catch (err) {
        console.error('Remove Close Friend Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Check if a specific user is a close friend (Internal/Helper)
exports.isCloseFriend = async (userId, friendId) => {
    const cf = await CloseFriend.findOne({ where: { userId, friendId } });
    return !!cf;
};
