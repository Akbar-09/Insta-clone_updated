const UserPrivacySettings = require('../models/UserPrivacySettings');
const PendingTag = require('../models/PendingTag');
const UserProfile = require('../models/UserProfile');

// Get Settings
exports.getTagsMentionsSettings = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const [settings] = await UserPrivacySettings.findOrCreate({
            where: { userId },
            defaults: { userId }
        });

        res.json({ status: 'success', data: settings });
    } catch (err) {
        console.error('Get Tags Settings Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Update Settings
exports.updateTagsMentionsSettings = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { allowTagsFrom, manualTagApproval, allowMentionsFrom } = req.body;

        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const [settings] = await UserPrivacySettings.findOrCreate({
            where: { userId },
            defaults: { userId }
        });

        if (allowTagsFrom) settings.allowTagsFrom = allowTagsFrom;
        if (manualTagApproval !== undefined) settings.manualTagApproval = manualTagApproval;
        if (allowMentionsFrom) settings.allowMentionsFrom = allowMentionsFrom;

        await settings.save();
        res.json({ status: 'success', data: settings });
    } catch (err) {
        console.error('Update Tags Settings Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Get Pending Tags
exports.getPendingTags = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const pending = await PendingTag.findAll({
            where: { taggedUserId: userId, status: 'pending' }
        });

        // In a real app, you would join with Post and UserProfile tables here
        // For now returning the raw list
        res.json({ status: 'success', data: pending });
    } catch (err) {
        console.error('Get Pending Tags Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Approve Tag
exports.approveTag = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { id } = req.params;

        const tag = await PendingTag.findOne({ where: { id, taggedUserId: userId } });
        if (!tag) return res.status(404).json({ status: 'error', message: 'Tag request not found' });

        tag.status = 'approved';
        await tag.save();

        res.json({ status: 'success', message: 'Tag approved' });
    } catch (err) {
        console.error('Approve Tag Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Remove Tag
exports.removeTag = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { id } = req.params;

        const tag = await PendingTag.findOne({ where: { id, taggedUserId: userId } });
        if (!tag) return res.status(404).json({ status: 'error', message: 'Tag request not found' });

        tag.status = 'removed';
        await tag.save();

        res.json({ status: 'success', message: 'Tag removed' });
    } catch (err) {
        console.error('Remove Tag Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};
