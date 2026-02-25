const LiveStream = require('../models/LiveStream');
const ScheduledStream = require('../models/ScheduledStream');
const LiveChatMessage = require('../models/LiveChatMessage');
const LiveViewer = require('../models/LiveViewer');
const LiveModerator = require('../models/LiveModerator');
const { randomUUID: uuidv4 } = require('crypto');
const { publishEvent } = require('../config/rabbitmq');
const { uploadThumbnail } = require('../utils/storage');
require('dotenv').config();

const generateStreamKey = () => {
    return uuidv4().replace(/-/g, '') + Date.now().toString(36);
};

const getIngestUrls = (streamKey) => {
    const host = process.env.STREAM_HOST || 'localhost';
    const rtmpPort = process.env.RTMP_PORT || '1935';
    const httpPort = process.env.PORT || '5015'; // Use the main express port for HLS

    return {
        rtmpUrl: `rtmp://${host}:${rtmpPort}/live`,
        hlsUrl: `http://${host}:${httpPort}/live/${streamKey}/index.m3u8`
    };
};

// FEATURE 1: GO LIVE NOW
exports.goLiveNow = async (req, res) => {
    try {
        const { title, category, visibility } = req.body;
        const userId = req.headers['x-user-id'];
        const file = req.file;

        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        if (!title) return res.status(400).json({ status: 'error', message: 'Title is required' });

        let thumbnailUrl = null;
        if (file) {
            thumbnailUrl = await uploadThumbnail(file.buffer, file.originalname);
        }

        const streamKey = generateStreamKey();
        const { rtmpUrl } = getIngestUrls(streamKey);

        const stream = await LiveStream.create({
            id: uuidv4(),
            userId,
            title,
            category: category || 'Social',
            visibility: visibility || 'Public',
            thumbnailUrl,
            streamKey,
            ingestUrl: rtmpUrl,
            status: 'LIVE',
            startedAt: new Date()
        });

        res.status(201).json({
            status: 'success',
            data: {
                stream,
                streamKey,
                rtmpUrl,
                instructions: "Use this RTMP URL and Stream Key in OBS"
            }
        });
    } catch (error) {
        console.error('Go Live Error:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// FEATURE 2: SCHEDULE STREAM
exports.scheduleStream = async (req, res) => {
    try {
        const { title, scheduledAt, category, visibility } = req.body;
        const userId = req.headers['x-user-id'];
        const file = req.file;

        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        if (!title || !scheduledAt) {
            return res.status(400).json({ status: 'error', message: 'Title and scheduled time are required' });
        }

        let thumbnailUrl = null;
        if (file) {
            thumbnailUrl = await uploadThumbnail(file.buffer, file.originalname);
        }

        const scheduledStream = await ScheduledStream.create({
            id: uuidv4(),
            userId,
            title,
            scheduledAt,
            category: category || 'Social',
            visibility: visibility || 'Public',
            thumbnailUrl,
            status: 'SCHEDULED'
        });

        // Notify followers (simplified event)
        await publishEvent('STREAM_SCHEDULED', {
            userId,
            streamId: scheduledStream.id,
            title,
            scheduledAt
        });

        res.status(201).json({
            status: 'success',
            data: scheduledStream
        });
    } catch (error) {
        console.error('Schedule Stream Error:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// GET FEED (Active Streams)
exports.getLiveFeed = async (req, res) => {
    try {
        const streams = await LiveStream.findAll({
            where: { status: 'LIVE', visibility: 'Public' },
            order: [['startedAt', 'DESC']],
            limit: 20
        });

        res.json({
            status: 'success',
            data: streams.map(s => {
                const { hlsUrl } = getIngestUrls(s.streamKey);
                return { ...s.toJSON(), hlsUrl };
            })
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// GET STREAM DETAILS
exports.getStreamDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const stream = await LiveStream.findByPk(id, {
            include: [{ model: LiveChatMessage, limit: 50, order: [['createdAt', 'DESC']] }]
        });

        if (!stream) return res.status(404).json({ status: 'error', message: 'Stream not found' });

        const { hlsUrl } = getIngestUrls(stream.streamKey);

        res.json({
            status: 'success',
            data: {
                ...stream.toJSON(),
                hlsUrl: stream.status === 'LIVE' ? hlsUrl : null
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// END STREAM
exports.endStream = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers['x-user-id'];

        const stream = await LiveStream.findByPk(id);
        if (!stream) return res.status(404).json({ status: 'error', message: 'Stream not found' });

        if (stream.userId !== userId) {
            return res.status(403).json({ status: 'error', message: 'Forbidden' });
        }

        stream.status = 'ENDED';
        stream.endedAt = new Date();
        await stream.save();

        res.json({ status: 'success', message: 'Stream ended' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// CHAT MESSAGES
exports.addChatMessage = async (req, res) => {
    try {
        const { id } = req.params; // streamId
        const { message } = req.body;
        const userId = req.headers['x-user-id'];
        const username = req.headers['x-user-username'];

        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const chatMessage = await LiveChatMessage.create({
            id: uuidv4(),
            streamId: id,
            userId,
            username,
            message
        });

        // Publish to Socket Service
        await publishEvent('LIVE_CHAT_MESSAGE', {
            streamId: id,
            message: chatMessage
        });

        res.status(201).json({ status: 'success', data: chatMessage });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Webhooks for Node-Media-Server (Internal)
exports.onPublish = async (req, res) => {
    try {
        const { name } = req.body; // streamKey
        const stream = await LiveStream.findOne({ where: { streamKey: name } });
        if (stream) {
            stream.status = 'LIVE';
            stream.startedAt = new Date();
            await stream.save();
            console.log(`[Stream Started] ${stream.id}`);
        }
        res.send('OK');
    } catch (error) {
        res.status(500).send('Error');
    }
};

exports.onDone = async (req, res) => {
    try {
        const { name } = req.body;
        const stream = await LiveStream.findOne({ where: { streamKey: name } });
        if (stream) {
            stream.status = 'ENDED';
            stream.endedAt = new Date();
            await stream.save();
            console.log(`[Stream Finished] ${stream.id}`);
        }
        res.send('OK');
    } catch (error) {
        res.status(500).send('Error');
    }
};
