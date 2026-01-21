const Story = require('../models/Story');
const StoryView = require('../models/StoryView');
const StoryReport = require('../models/StoryReport');
const { publishEvent } = require('../config/rabbitmq');
const { Op } = require('sequelize');

const createStory = async (req, res) => {
    try {
        const { userId, username, mediaUrl, mediaType } = req.body;

        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24); // Expires in 24 hours

        const story = await Story.create({
            userId,
            username,
            mediaUrl,
            mediaType: mediaType || 'IMAGE',
            expiresAt
        });

        // Publish Event
        await publishEvent('STORY_CREATED', story.toJSON());

        res.status(201).json({ status: 'success', data: story });
    } catch (error) {
        console.error('Create Story Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getStories = async (req, res) => {
    try {
        // Get all valid stories
        const stories = await Story.findAll({
            where: {
                expiresAt: {
                    [Op.gt]: new Date() // Only stories that haven't expired
                }
            },
            order: [['createdAt', 'DESC']]
        });
        res.json({ status: 'success', data: stories });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getArchivedStories = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.query.userId;

        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        const stories = await Story.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']]
        });

        res.json({ status: 'success', data: stories });
    } catch (error) {
        console.error('Get Archived Stories Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const deleteStory = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers['x-user-id'];

        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        const story = await Story.findByPk(id);
        if (!story) {
            return res.status(404).json({ status: 'error', message: 'Story not found' });
        }

        // Only owner can delete
        if (String(story.userId) !== String(userId)) {
            return res.status(403).json({ status: 'error', message: 'Forbidden' });
        }

        await story.destroy();

        await publishEvent('STORY_DELETED', { storyId: id, userId });

        res.json({ status: 'success', message: 'Story deleted successfully' });
    } catch (error) {
        console.error('Delete Story Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const reportStory = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers['x-user-id'];
        const { reason } = req.body;

        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        // Check if already reported
        const existing = await StoryReport.findOne({
            where: { storyId: id, reporterId: userId }
        });

        if (existing) {
            return res.status(400).json({ status: 'error', message: 'Already reported' });
        }

        await StoryReport.create({
            storyId: id,
            reporterId: userId,
            reason
        });

        res.json({ status: 'success', message: 'Story reported' });
    } catch (error) {
        console.error('Report Story Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const viewStory = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers['x-user-id'];

        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        // Prevent duplicate views
        await StoryView.findOrCreate({
            where: { storyId: id, viewerId: userId },
            defaults: { storyId: id, viewerId: userId }
        });

        res.json({ status: 'success' });
    } catch (error) {
        // Unique constraint error is fine (already viewed)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.json({ status: 'success' });
        }
        console.error('View Story Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

module.exports = {
    createStory,
    getStories,
    getArchivedStories,
    deleteStory,
    reportStory,
    viewStory
};
