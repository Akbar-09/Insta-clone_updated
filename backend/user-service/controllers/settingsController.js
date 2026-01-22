const UserMessageSettings = require('../models/UserMessageSettings');
const UserStorySettings = require('../models/UserStorySettings');
const UserActivitySettings = require('../models/UserActivitySettings');

// Messages Settings
exports.getMessageSettings = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const [settings] = await UserMessageSettings.findOrCreate({
            where: { userId },
            defaults: { userId }
        });

        res.json({ status: 'success', data: settings });
    } catch (err) {
        console.error('Get Message Settings Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

exports.updateMessageSettings = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { messageRequestsFrom, groupAddPermission } = req.body;
        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const [settings] = await UserMessageSettings.findOrCreate({
            where: { userId },
            defaults: { userId }
        });

        if (messageRequestsFrom) settings.messageRequestsFrom = messageRequestsFrom;
        if (groupAddPermission) settings.groupAddPermission = groupAddPermission;

        await settings.save();
        res.json({ status: 'success', data: settings });
    } catch (err) {
        console.error('Update Message Settings Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Story Replies Settings
exports.getStorySettings = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const [settings] = await UserStorySettings.findOrCreate({
            where: { userId },
            defaults: { userId }
        });

        res.json({ status: 'success', data: settings });
    } catch (err) {
        console.error('Get Story Settings Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

exports.updateStorySettings = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { storyReplies } = req.body;
        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const [settings] = await UserStorySettings.findOrCreate({
            where: { userId },
            defaults: { userId }
        });

        if (storyReplies) settings.storyReplies = storyReplies;

        await settings.save();
        res.json({ status: 'success', data: settings });
    } catch (err) {
        console.error('Update Story Settings Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Activity Status Settings
exports.getActivitySettings = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const [settings] = await UserActivitySettings.findOrCreate({
            where: { userId },
            defaults: { userId }
        });

        res.json({ status: 'success', data: settings });
    } catch (err) {
        console.error('Get Activity Settings Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

exports.updateActivitySettings = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { showActivityStatus } = req.body;
        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const [settings] = await UserActivitySettings.findOrCreate({
            where: { userId },
            defaults: { userId }
        });

        if (showActivityStatus !== undefined) settings.showActivityStatus = showActivityStatus;
        // logic to update lastActiveAt could be middleware based, or explicit.
        // For now, we just update the preference.

        await settings.save();
        res.json({ status: 'success', data: settings });
    } catch (err) {
        console.error('Update Activity Settings Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};
