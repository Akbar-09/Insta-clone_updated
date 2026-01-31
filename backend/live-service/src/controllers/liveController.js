const LiveSession = require('../models/LiveSession');
const LiveComment = require('../models/LiveComment');
const LiveViewer = require('../models/LiveViewer');
const { v4: uuidv4 } = require('uuid');
const { publishEvent } = require('../config/rabbitmq');

const generateStreamKey = () => {
    return uuidv4().replace(/-/g, '') + Date.now().toString(36);
};

exports.createSession = async (req, res) => {
    try {
        const { title, audience } = req.body;
        const userId = req.headers['x-user-id']; // From Gateway

        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        const streamKey = generateStreamKey();

        const session = await LiveSession.create({
            userId,
            title,
            audience,
            streamKey,
            status: 'scheduled'
        });

        const rtmpUrl = `rtmp://${process.env.Stream_HOST || 'localhost'}:1935/live`;

        // HLS URL will be available once streaming starts
        // usually http://host:8000/live/{streamKey}/index.m3u8

        res.status(201).json({
            status: 'success',
            data: {
                streamKey,
                streamUrl: rtmpUrl,
                sessionId: session.id
            }
        });
    } catch (error) {
        console.error('Create Session Error:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getSession = async (req, res) => {
    try {
        const { id } = req.params;
        const session = await LiveSession.findByPk(id);

        if (!session) {
            return res.status(404).json({ status: 'error', message: 'Session not found' });
        }

        const hlsUrl = `http://${process.env.Stream_HOST || 'localhost'}:8000/live/${session.streamKey}/index.m3u8`;

        res.json({
            status: 'success',
            data: {
                ...session.toJSON(),
                hlsUrl: session.status === 'live' ? hlsUrl : null
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getLiveFeed = async (req, res) => {
    try {
        // Fetch active live sessions
        const sessions = await LiveSession.findAll({
            where: { status: 'live' },
            order: [['startedAt', 'DESC']],
            limit: 20
        });

        res.json({ status: 'success', data: sessions });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.addComment = async (req, res) => {
    try {
        const { id } = req.params; // sessionId
        const { content } = req.body;
        const userId = req.headers['x-user-id'];
        const username = req.headers['x-user-username'];

        // We might want to fetch profile pic here, but skip for now

        const comment = await LiveComment.create({
            liveSessionId: id,
            userId,
            username,
            content
        });

        // Publish event for Socket Service
        const eventData = {
            sessionId: id,
            comment: {
                id: comment.id,
                userId,
                username,
                content,
                createdAt: comment.createdAt
            }
        };

        await publishEvent('LIVE_COMMENT', eventData);

        res.status(201).json({ status: 'success', data: comment });
    } catch (error) {
        console.error("Add Comment Error:", error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Webhooks from Node-Media-Server
exports.onPublish = async (req, res) => {
    // req.body = { app, name (streamKey), id, ... }
    try {
        const { name } = req.body; // 'name' is the streamKey in NMS
        console.log(`[Live Webhook] Stream started: ${name}`);

        const session = await LiveSession.findOne({ where: { streamKey: name } });
        if (session) {
            session.status = 'live';
            session.startedAt = new Date();
            await session.save();
            console.log(`[Live Webhook] Session ${session.id} is now LIVE`);
        } else {
            console.log(`[Live Webhook] Unknown stream key: ${name}`);
            // Potentially reject stream? NMS doesn't easily allow rejecting via webhook return code (it might if using auth)
        }
        res.status(200).send('OK');
    } catch (error) {
        console.error('Webhook Error:', error);
        res.status(500).send('Error');
    }
};

exports.onDone = async (req, res) => {
    try {
        const { name } = req.body;
        console.log(`[Live Webhook] Stream ended: ${name}`);

        const session = await LiveSession.findOne({ where: { streamKey: name } });
        if (session) {
            session.status = 'ended';
            session.endedAt = new Date();
            await session.save();
            console.log(`[Live Webhook] Session ${session.id} ENDED`);
        }
        res.status(200).send('OK');
    } catch (error) {
        console.error('Webhook Error:', error);
        res.status(500).send('Error');
    }
};
