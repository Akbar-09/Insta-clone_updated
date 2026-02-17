const Story = require('../models/Story');
const StoryReply = require('../models/StoryReply');
const StoryView = require('../models/StoryView');
const StoryReport = require('../models/StoryReport');
const { publishEvent } = require('../config/rabbitmq');
const { Op } = require('sequelize');

const createStory = async (req, res) => {
    try {
        const { userId, username, mediaUrl, mediaType } = req.body;

        if (!userId || isNaN(userId)) {
            return res.status(400).json({ status: 'error', message: 'Valid User ID is required' });
        }

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

const StoryReaction = require('../models/StoryReaction');

// ... existing imports

const getStories = async (req, res) => {
    try {
        const userIdRaw = req.headers['x-user-id'];
        const userId = (userIdRaw && !isNaN(userIdRaw)) ? parseInt(userIdRaw) : null;

        // Get all valid stories
        const stories = await Story.findAll({
            where: {
                expiresAt: {
                    [Op.gt]: new Date()
                }
            },
            order: [['createdAt', 'DESC']]
        });

        // If user logged in, enrich with seen/liked status
        if (userId) {
            const storyIds = stories.map(s => s.id);

            // Get Views
            const views = await StoryView.findAll({
                where: {
                    storyId: storyIds,
                    viewerId: userId
                }
            });
            const viewedStoryIds = new Set(views.map(v => v.storyId));

            // Get Reactions
            const reactions = await StoryReaction.findAll({
                where: {
                    storyId: storyIds,
                    reactorId: userId
                }
            });
            const reactedStoryIds = new Set(reactions.map(r => r.storyId));

            const enrichedStories = stories.map(s => ({
                ...s.toJSON(),
                seen: viewedStoryIds.has(s.id),
                isLiked: reactedStoryIds.has(s.id)
            }));

            return res.json({ status: 'success', data: enrichedStories });
        }

        res.json({ status: 'success', data: stories });
    } catch (error) {
        console.error("Get Stories Error", error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const reactToStory = async (req, res) => {
    try {
        const { id } = req.params;
        const userIdRaw = req.headers['x-user-id'];
        const userId = (userIdRaw && !isNaN(userIdRaw)) ? parseInt(userIdRaw) : null;
        const { type = 'LIKE' } = req.body;

        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        await StoryReaction.findOrCreate({
            where: { storyId: id, reactorId: userId },
            defaults: { storyId: id, reactorId: userId, type }
        });

        res.json({ status: 'success', message: 'Reaction added' });
    } catch (error) {
        console.error('React Story Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const unreactToStory = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers['x-user-id'];

        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        await StoryReaction.destroy({
            where: { storyId: id, reactorId: userId }
        });

        res.json({ status: 'success', message: 'Reaction removed' });
    } catch (error) {
        console.error('Unreact Story Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};


const getArchivedStories = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.query.userId;
        const { sort = 'newest', startDate, endDate } = req.query;

        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        const whereClause = { userId };
        if (startDate && endDate) {
            whereClause.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }

        const stories = await Story.findAll({
            where: whereClause,
            order: [['createdAt', sort === 'oldest' ? 'ASC' : 'DESC']]
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

        const mediaUrl = story.mediaUrl;
        await story.destroy();

        await publishEvent('STORY_DELETED', { storyId: id, userId, mediaUrl });

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

const getStoryReplies = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.query.userId;
        const { sort = 'newest', startDate, endDate } = req.query;

        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        const whereClause = { senderId: userId };
        if (startDate && endDate) {
            whereClause.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }

        const replies = await StoryReply.findAll({
            where: whereClause,
            order: [['createdAt', sort === 'oldest' ? 'ASC' : 'DESC']]
        });

        res.json({ status: 'success', data: replies });
    } catch (error) {
        console.error('Get Story Replies Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

module.exports = {
    createStory,
    getStories,
    getArchivedStories,
    deleteStory,
    reportStory,
    viewStory,
    getStoryReplies,
    reactToStory,
    unreactToStory
};
