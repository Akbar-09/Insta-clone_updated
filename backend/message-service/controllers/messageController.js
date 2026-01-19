const { Op } = require('sequelize');
const Message = require('../models/Message');
const { publishEvent } = require('../config/rabbitmq');

const sendMessage = async (req, res) => {
    try {
        const { senderId, recipientId, text } = req.body;

        const message = await Message.create({
            senderId,
            recipientId,
            text
        });

        // Publish Event
        await publishEvent('MESSAGE_SENT', message.toJSON());

        res.status(201).json({ status: 'success', data: message });
    } catch (error) {
        console.error('Send Message Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getMessages = async (req, res) => {
    try {
        const { userId1, userId2 } = req.query;

        let whereClause = {};

        if (userId1 && userId2) {
            // Get chat between two specific users
            whereClause = {
                [Op.or]: [
                    { senderId: userId1, recipientId: userId2 },
                    { senderId: userId2, recipientId: userId1 }
                ]
            };
        } else if (userId1) {
            // Get all messages for one user (to build inbox)
            whereClause = {
                [Op.or]: [
                    { senderId: userId1 },
                    { recipientId: userId1 }
                ]
            };
        } else {
            return res.status(400).json({ status: 'error', message: 'Missing userId1' });
        }

        const messages = await Message.findAll({
            where: whereClause,
            order: [['createdAt', 'ASC']]
        });

        res.json({ status: 'success', data: messages });
    } catch (error) {
        console.error("Get Messages Error:", error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

module.exports = { sendMessage, getMessages };
