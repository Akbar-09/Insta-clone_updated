const Story = require('../models/Story');
const { publishEvent } = require('../config/rabbitmq');
const { Op } = require('sequelize');

const createStory = async (req, res) => {
    try {
        const { userId, username, mediaUrl } = req.body;

        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24); // Expires in 24 hours

        const story = await Story.create({
            userId,
            username,
            mediaUrl,
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

module.exports = { createStory, getStories };
