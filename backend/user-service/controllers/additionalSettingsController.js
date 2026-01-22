const MutedAccount = require('../models/MutedAccount');
const ContentPreferences = require('../models/ContentPreferences');
const LikeShareSettings = require('../models/LikeShareSettings');
const Subscription = require('../models/Subscription');
const UserProfile = require('../models/UserProfile');

// --- Muted Accounts ---
exports.getMutedAccounts = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const muted = await MutedAccount.findAll({
            where: { userId },
            attributes: ['mutedUserId']
        });

        const ids = muted.map(m => m.mutedUserId);
        const profiles = await UserProfile.findAll({
            where: { userId: ids },
            attributes: ['userId', 'username', 'fullName', 'profilePicture']
        });

        res.json({ status: 'success', data: profiles });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.muteUser = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { userId: mutedUserId } = req.params;

        if (parseInt(userId) === parseInt(mutedUserId)) return res.status(400).json({ status: 'error', message: 'Cannot mute yourself' });

        await MutedAccount.findOrCreate({ where: { userId, mutedUserId } });
        res.json({ status: 'success', message: 'Account muted' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.unmuteUser = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { userId: mutedUserId } = req.params;

        await MutedAccount.destroy({ where: { userId, mutedUserId } });
        res.json({ status: 'success', message: 'Account unmuted' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// --- Content Preferences ---
exports.getContentPreferences = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const [prefs] = await ContentPreferences.findOrCreate({
            where: { userId },
            defaults: { userId }
        });
        res.json({ status: 'success', data: prefs });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.updateContentPreferences = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const [prefs] = await ContentPreferences.findOrCreate({ where: { userId }, defaults: { userId } });

        if (req.body.sensitiveContentLevel) prefs.sensitiveContentLevel = req.body.sensitiveContentLevel;

        await prefs.save();
        res.json({ status: 'success', data: prefs });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// --- Like and Share Counts ---
exports.getLikeShareSettings = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const [settings] = await LikeShareSettings.findOrCreate({ where: { userId }, defaults: { userId } });
        res.json({ status: 'success', data: settings });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.updateLikeShareSettings = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const [settings] = await LikeShareSettings.findOrCreate({ where: { userId }, defaults: { userId } });

        if (req.body.hideLikeShareCounts !== undefined) settings.hideLikeShareCounts = req.body.hideLikeShareCounts;

        await settings.save();
        res.json({ status: 'success', data: settings });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// --- Subscriptions ---
exports.getSubscriptions = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const subs = await Subscription.findAll({ where: { userId, status: 'active' } });
        // Join with profiles if needed, but sticking to basic list for now as per minimal requirement if no data
        res.json({ status: 'success', data: subs });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
