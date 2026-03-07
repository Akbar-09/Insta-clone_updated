const MutedAccount = require('../models/MutedAccount');
const ContentPreferences = require('../models/ContentPreferences');
const LikeShareSettings = require('../models/LikeShareSettings');
const Subscription = require('../models/Subscription');
const UserProfile = require('../models/UserProfile');
const FavoriteAccount = require('../models/FavoriteAccount');

// --- Muted Accounts ---
exports.getMutedAccounts = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const muted = await MutedAccount.findAll({
            where: { userId }
        });

        const ids = muted.map(m => m.mutedUserId);
        const profiles = await UserProfile.findAll({
            where: { userId: ids },
            attributes: ['userId', 'username', 'fullName', 'profilePicture']
        });

        // Enrich with mute settings
        const results = profiles.map(p => {
            const m = muted.find(item => item.mutedUserId === p.userId);
            return {
                ...p.toJSON(),
                mutePosts: m.mutePosts,
                muteStories: m.muteStories
            };
        });

        res.json({ status: 'success', data: results });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.muteUser = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { userId: mutedUserId } = req.params;
        const { mutePosts = true, muteStories = true } = req.body;

        if (parseInt(userId) === parseInt(mutedUserId)) return res.status(400).json({ status: 'error', message: 'Cannot mute yourself' });

        const [m, created] = await MutedAccount.findOrCreate({ 
            where: { userId, mutedUserId },
            defaults: { mutePosts, muteStories }
        });

        if (!created) {
            m.mutePosts = mutePosts;
            m.muteStories = muteStories;
            await m.save();
        }

        res.json({ status: 'success', message: 'Account muted', data: m });
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

// --- Favorite Accounts ---
exports.getFavoriteAccounts = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const favorites = await FavoriteAccount.findAll({
            where: { userId },
            attributes: ['favoriteUserId']
        });

        const ids = favorites.map(f => f.favoriteUserId);
        const profiles = await UserProfile.findAll({
            where: { userId: ids },
            attributes: ['userId', 'username', 'fullName', 'profilePicture']
        });

        res.json({ status: 'success', data: profiles });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.addFavoriteAccount = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { userId: favoriteUserId } = req.params;

        if (parseInt(userId) === parseInt(favoriteUserId)) return res.status(400).json({ status: 'error', message: 'Cannot favorite yourself' });

        await FavoriteAccount.findOrCreate({ where: { userId, favoriteUserId } });
        res.json({ status: 'success', message: 'Added to favorites' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.removeFavoriteAccount = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { userId: favoriteUserId } = req.params;

        await FavoriteAccount.destroy({ where: { userId, favoriteUserId } });
        res.json({ status: 'success', message: 'Removed from favorites' });
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
