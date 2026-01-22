const StoryPrivacy = require('../models/StoryPrivacy');
const UserProfile = require('../models/UserProfile');
const Follow = require('../models/Follow');
const { Op } = require('sequelize');

exports.getHiddenUsers = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const hidden = await StoryPrivacy.findAll({
            where: { userId },
            attributes: ['hiddenUserId']
        });

        const hiddenIds = hidden.map(h => h.hiddenUserId);

        // Fetch user profiles for better frontend UX
        const profiles = await UserProfile.findAll({
            where: { userId: hiddenIds },
            attributes: ['userId', 'username', 'fullName', 'profilePicture']
        });

        res.json({ status: 'success', data: profiles });
    } catch (err) {
        console.error('Get Hidden Users Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

exports.hideStoryFrom = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { hiddenUserId } = req.body;

        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        if (!hiddenUserId) return res.status(400).json({ status: 'error', message: 'Hidden User ID required' });
        if (parseInt(userId) === parseInt(hiddenUserId)) return res.status(400).json({ status: 'error', message: 'Cannot hide from yourself' });

        await StoryPrivacy.findOrCreate({
            where: { userId, hiddenUserId }
        });

        res.json({ status: 'success', message: 'Story hidden from user' });
    } catch (err) {
        console.error('Hide Story Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

exports.unhideStoryFrom = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { hiddenUserId } = req.params;

        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        await StoryPrivacy.destroy({
            where: { userId, hiddenUserId }
        });

        res.json({ status: 'success', message: 'Story visible to user' });
    } catch (err) {
        console.error('Unhide Story Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Check if viewer is hidden (Helper)
exports.isViewerHidden = async (ownerId, viewerId) => {
    const hidden = await StoryPrivacy.findOne({
        where: { userId: ownerId, hiddenUserId: viewerId }
    });
    return !!hidden;
};
