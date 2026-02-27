const LiveStream = require('../models/LiveStream');
const ScheduledStream = require('../models/ScheduledStream');
const LiveChatMessage = require('../models/LiveChatMessage');
const LiveViewer = require('../models/LiveViewer');
const { randomUUID: uuidv4 } = require('crypto');
const { publishEvent } = require('../config/rabbitmq');
const { uploadThumbnail } = require('../utils/storage');
const { AccessToken } = require('livekit-server-sdk');
require('dotenv').config();

const LIVEKIT_URL = process.env.LIVEKIT_URL || 'ws://localhost:7880';
const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY || 'devkey';
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET || 'secret';

const generateRoomName = () => {
    return 'room_' + uuidv4().replace(/-/g, '') + Date.now().toString(36);
};

// 1. Create Stream - Creates DB record, generates room_name, Status = scheduled or live
exports.createStream = async (req, res) => {
    try {
        const { title, category, visibility, scheduledAt } = req.body;
        const host_id = req.headers['x-user-id']; // Host user ID
        const file = req.file;

        if (!host_id) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        if (!title) return res.status(400).json({ status: 'error', message: 'Title is required' });

        let thumbnail_url = null;
        if (file) {
            thumbnail_url = await uploadThumbnail(file.buffer, file.originalname);
        }

        const room_name = generateRoomName();
        const status = scheduledAt ? 'scheduled' : 'live';

        // Automatically clean up any zombie "live" streams from this host
        // if they closed the browser without ending their last stream properly.
        await LiveStream.update(
            { status: 'ended', ended_at: new Date() },
            { where: { host_id, status: ['live', 'scheduled'] } }
        );

        const stream = await LiveStream.create({
            id: uuidv4(),
            room_name,
            host_id,
            title,
            category: category || 'Social',
            visibility: visibility || 'public',
            thumbnail_url,
            status,
            scheduled_at: scheduledAt || null,
            started_at: status === 'live' ? new Date() : null
        });

        res.status(201).json({
            status: 'success',
            data: stream
        });
    } catch (error) {
        console.error('Create Stream Error:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// 2. Start Stream - Validate host, status = live, generate LiveKit token (broadcaster)
exports.startStream = async (req, res) => {
    try {
        const { id } = req.params;
        const host_id = req.headers['x-user-id'];
        const username = req.headers['x-user-username'] || 'Host';

        if (!host_id) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const stream = await LiveStream.findByPk(id);
        if (!stream) return res.status(404).json({ status: 'error', message: 'Stream not found' });
        if (stream.host_id !== host_id) return res.status(403).json({ status: 'error', message: 'Not authorized to start this stream' });

        if (stream.status !== 'live') {
            stream.status = 'live';
            if (!stream.started_at) stream.started_at = new Date();
            await stream.save();
        }

        // Generate LiveKit token for presenter (can Publish)
        const participantName = username;
        const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
            identity: host_id,
            name: participantName,
        });

        at.addGrant({
            roomJoin: true,
            room: stream.room_name,
            canPublish: true,
            canSubscribe: true,
        });

        const token = await at.toJwt();

        res.status(200).json({
            status: 'success',
            data: {
                room_name: stream.room_name,
                token,
                livekit_url: LIVEKIT_URL
            }
        });
    } catch (error) {
        console.error('Start Stream Error:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// 3. Join Stream - Validate visibility, Generate LiveKit token (subscriber)
exports.joinStream = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.headers['x-user-id'];
        const username = req.headers['x-user-username'] || 'Viewer';

        if (!user_id) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const stream = await LiveStream.findByPk(id);
        if (!stream) return res.status(404).json({ status: 'error', message: 'Stream not found' });
        if (stream.status !== 'live') return res.status(400).json({ status: 'error', message: 'Stream is not live currently' });

        // Add Viewer to DB Tracking (optional initial log, but Socket.io could do it via RabbitMQ)
        await LiveViewer.create({
            id: uuidv4(),
            stream_id: stream.id,
            user_id
        });

        stream.total_viewers++;
        if (stream.total_viewers > stream.peak_viewers) {
            stream.peak_viewers = stream.total_viewers;
        }
        await stream.save();

        // Generate LiveKit token for viewer (can NOT Publish by default)
        const role = req.query.role || 'viewer';
        const participantName = username;
        const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
            identity: user_id,
            name: participantName,
        });

        at.addGrant({
            roomJoin: true,
            room: stream.room_name,
            canPublish: role === 'guest',
            canSubscribe: true,
        });

        const token = await at.toJwt();

        res.status(200).json({
            status: 'success',
            data: {
                room_name: stream.room_name,
                token,
                livekit_url: LIVEKIT_URL
            }
        });
    } catch (error) {
        console.error('Join Stream Error:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// 4. End Stream - Update status = ended, Save ended_at
exports.endStream = async (req, res) => {
    try {
        const { id } = req.params;
        const host_id = req.headers['x-user-id'];

        const stream = await LiveStream.findByPk(id);
        if (!stream) return res.status(404).json({ status: 'error', message: 'Stream not found' });

        if (stream.host_id !== host_id) {
            return res.status(403).json({ status: 'error', message: 'Forbidden' });
        }

        stream.status = 'ended';
        stream.ended_at = new Date();
        await stream.save();

        try {
            await publishEvent('LIVE_STREAM_STATUS', { streamId: stream.id, status: 'ENDED' });
        } catch (e) {
            console.error('Failed to publish end event', e);
        }

        res.json({
            status: 'success',
            message: 'Stream ended',
            data: {
                peak_viewers: stream.peak_viewers,
                duration_seconds: stream.started_at ? Math.floor((stream.ended_at.getTime() - stream.started_at.getTime()) / 1000) : 0
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// GET FEED (Active Streams)
exports.getLiveFeed = async (req, res) => {
    try {
        const streams = await LiveStream.findAll({
            where: { status: 'live', visibility: 'public' },
            order: [['started_at', 'DESC']],
            limit: 20
        });

        res.json({
            status: 'success',
            data: streams
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
            include: [{ model: LiveChatMessage, limit: 50, order: [['created_at', 'DESC']] }]
        });

        if (!stream) return res.status(404).json({ status: 'error', message: 'Stream not found' });

        res.json({
            status: 'success',
            data: stream
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// CHAT MESSAGES
exports.addChatMessage = async (req, res) => {
    try {
        const { id } = req.params; // stream_id
        const { message } = req.body;
        const user_id = req.headers['x-user-id'];

        if (!user_id) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const chatMessage = await LiveChatMessage.create({
            id: uuidv4(),
            stream_id: id,
            user_id,
            message
        });

        res.status(201).json({ status: 'success', data: chatMessage });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
