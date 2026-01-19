const Reel = require('../models/Reel');
const { publishEvent } = require('../config/rabbitmq');

const createReel = async (req, res) => {
    try {
        const { userId, username, caption, videoUrl } = req.body;

        const reel = await Reel.create({
            userId,
            username,
            caption,
            videoUrl
        });

        // Publish Event
        await publishEvent('REEL_CREATED', reel.toJSON());

        res.status(201).json({ status: 'success', data: reel });
    } catch (error) {
        console.error('Create Reel Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getReels = async (req, res) => {
    try {
        const reels = await Reel.findAll({ order: [['createdAt', 'DESC']] });
        res.json({ status: 'success', data: reels });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

module.exports = { createReel, getReels };
