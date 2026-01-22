const UserCommentSettings = require('../models/UserCommentSettings');
const UserSharingSettings = require('../models/UserSharingSettings');
const RestrictedAccount = require('../models/RestrictedAccount');
const UserHiddenSettings = require('../models/UserHiddenSettings');
const UserCustomWord = require('../models/UserCustomWord');
const UserProfile = require('../models/UserProfile');

// --- Comments ---
exports.getCommentSettings = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const [settings] = await UserCommentSettings.findOrCreate({ where: { userId }, defaults: { userId } });
        res.json({ status: 'success', data: settings });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.updateCommentSettings = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const [settings] = await UserCommentSettings.findOrCreate({ where: { userId }, defaults: { userId } });
        if (req.body.allowFrom) settings.allowFrom = req.body.allowFrom;
        if (req.body.allowGif !== undefined) settings.allowGif = req.body.allowGif;
        await settings.save();
        res.json({ status: 'success', data: settings });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// --- Sharing ---
exports.getSharingSettings = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const [settings] = await UserSharingSettings.findOrCreate({ where: { userId }, defaults: { userId } });
        res.json({ status: 'success', data: settings });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.updateSharingSettings = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const [settings] = await UserSharingSettings.findOrCreate({ where: { userId }, defaults: { userId } });
        const { storyShares, postToStory, reposts, websiteEmbeds, featuredRequests } = req.body;

        if (storyShares !== undefined) settings.storyShares = storyShares;
        if (postToStory !== undefined) settings.postToStory = postToStory;
        if (reposts !== undefined) settings.reposts = reposts;
        if (websiteEmbeds !== undefined) settings.websiteEmbeds = websiteEmbeds;
        if (featuredRequests !== undefined) settings.featuredRequests = featuredRequests;

        await settings.save();
        res.json({ status: 'success', data: settings });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// --- Restricted Accounts ---
exports.getRestrictedAccounts = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const restricted = await RestrictedAccount.findAll({
            where: { userId },
            attributes: ['restrictedUserId']
        });

        const ids = restricted.map(r => r.restrictedUserId);
        const profiles = await UserProfile.findAll({
            where: { userId: ids },
            attributes: ['userId', 'username', 'fullName', 'profilePicture']
        });

        res.json({ status: 'success', data: profiles });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.restrictUser = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { userId: restrictedUserId } = req.params;

        if (parseInt(userId) === parseInt(restrictedUserId)) return res.status(400).json({ status: 'error', message: 'Cannot restrict yourself' });

        await RestrictedAccount.findOrCreate({ where: { userId, restrictedUserId } });
        res.json({ status: 'success', message: 'Account restricted' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.unrestrictUser = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { userId: restrictedUserId } = req.params;

        await RestrictedAccount.destroy({ where: { userId, restrictedUserId } });
        res.json({ status: 'success', message: 'Account unrestricted' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// --- Hidden Words ---
exports.getHiddenWordsSettings = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const [settings] = await UserHiddenSettings.findOrCreate({ where: { userId }, defaults: { userId } });
        const customWords = await UserCustomWord.findAll({ where: { userId } });

        res.json({
            status: 'success',
            data: {
                settings,
                customWords: customWords.map(w => ({ id: w.id, word: w.word }))
            }
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.updateHiddenWordsSettings = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const [settings] = await UserHiddenSettings.findOrCreate({ where: { userId }, defaults: { userId } });

        if (req.body.hideComments !== undefined) settings.hideComments = req.body.hideComments;
        if (req.body.advancedFilter !== undefined) settings.advancedFilter = req.body.advancedFilter;
        if (req.body.hideMessageRequests !== undefined) settings.hideMessageRequests = req.body.hideMessageRequests;

        await settings.save();
        res.json({ status: 'success', data: settings });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.addHiddenWord = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { word } = req.body;
        if (!word) return res.status(400).json({ status: 'error', message: 'Word is required' });

        const newWord = await UserCustomWord.create({ userId, word });
        res.json({ status: 'success', data: newWord });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.deleteHiddenWord = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { id } = req.params;

        await UserCustomWord.destroy({ where: { id, userId } });
        res.json({ status: 'success', message: 'Word removed' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
