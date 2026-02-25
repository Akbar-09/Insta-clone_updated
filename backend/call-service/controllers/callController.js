const { AccessToken } = require('livekit-server-sdk');
const { v4: uuidv4 } = require('uuid');
const CallSession = require('../models/CallSession');
require('dotenv').config();

const apiKey = process.env.LIVEKIT_API_KEY;
const apiSecret = process.env.LIVEKIT_API_SECRET;

const createToken = async (roomName, participantName) => {
    const at = new AccessToken(apiKey, apiSecret, {
        identity: participantName,
    });
    at.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true });
    return await at.toJwt();
};

exports.startCall = async (req, res) => {
    try {
        const { caller_id, receiver_id, call_type } = req.body;

        if (!caller_id || !receiver_id || !call_type) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const roomName = `call_${uuidv4()}`;

        const session = await CallSession.create({
            room_name: roomName,
            caller_id,
            receiver_id,
            call_type,
            status: 'ringing',
            started_at: new Date()
        });

        const token = await createToken(roomName, caller_id.toString());
        console.log(`[CallController] Generated token for caller ${caller_id}:`, token);

        const responseData = {
            session,
            token,
            livekit_url: process.env.LIVEKIT_URL
        };
        console.log('[CallController] StartCall response data:', responseData);
        res.status(201).json(responseData);
    } catch (error) {
        console.error('Start call error:', error);
        res.status(500).json({ error: 'Failed to start call' });
    }
};

exports.acceptCall = async (req, res) => {
    try {
        const { session_id, user_id } = req.body;
        console.log(`[CallController] AcceptCall attempt: session=${session_id}, user=${user_id}`);

        const session = await CallSession.findByPk(session_id);
        if (!session) {
            return res.status(404).json({ error: 'Call session not found' });
        }

        session.status = 'active';
        await session.save();

        const token = await createToken(session.room_name, user_id.toString());
        console.log(`[CallController] Generated token for receiver ${user_id}:`, token);

        const responseData = {
            session,
            token,
            livekit_url: process.env.LIVEKIT_URL
        };
        console.log('[CallController] AcceptCall response data:', responseData);
        res.status(200).json(responseData);
    } catch (error) {
        console.error('Accept call error:', error);
        res.status(500).json({ error: 'Failed to accept call' });
    }
};

exports.rejectCall = async (req, res) => {
    try {
        const { session_id } = req.body;

        const session = await CallSession.findByPk(session_id);
        if (!session) {
            return res.status(404).json({ error: 'Call session not found' });
        }

        session.status = 'rejected';
        session.ended_at = new Date();
        await session.save();

        res.status(200).json({ message: 'Call rejected' });
    } catch (error) {
        console.error('Reject call error:', error);
        res.status(500).json({ error: 'Failed to reject call' });
    }
};

exports.endCall = async (req, res) => {
    try {
        const { session_id } = req.body;

        const session = await CallSession.findByPk(session_id);
        if (!session) {
            return res.status(404).json({ error: 'Call session not found' });
        }

        const endedAt = new Date();
        const duration = Math.floor((endedAt - session.started_at) / 1000);

        session.status = 'ended';
        session.ended_at = endedAt;
        session.duration_seconds = duration;
        await session.save();

        res.status(200).json({ session });
    } catch (error) {
        console.error('End call error:', error);
        res.status(500).json({ error: 'Failed to end call' });
    }
};
