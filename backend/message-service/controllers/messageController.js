const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const { getRabbitMQChannel } = require('../config/rabbitmq');
const { Op } = require('sequelize');

// Fetch all conversations for the logged-in user
const getConversations = async (req, res) => {
    try {
        const userId = req.user.id; // From middleware
        // Find conversations where user1Id or user2Id is the current user
        const conversations = await Conversation.findAll({
            where: {
                [Op.or]: [{ user1Id: userId }, { user2Id: userId }]
            },
            order: [['updatedAt', 'DESC']]
        });

        // In a real app, we would fetch User details (avatar, username) from user-service for the OTHER user
        // efficiently. For now, we will return the conversation data and let frontend fetch user details
        // or helper function here if we can call user-service.
        // Assuming frontend will handle user details fetching or we mock it for now.

        res.json({
            status: 'success',
            data: conversations
        });
    } catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({ status: 'error', message: 'Failed to fetch conversations' });
    }
};

// Fetch messages for a specific conversation
const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const messages = await Message.findAll({
            where: { conversationId },
            order: [['createdAt', 'ASC']]
        });

        res.json({
            status: 'success',
            data: messages
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ status: 'error', message: 'Failed to fetch messages' });
    }
};

// Send a new message
const sendMessage = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { content, receiverId } = req.body; // receiverId needed if creating new conversation
        const senderId = req.user.id;

        let convId = conversationId;
        let conversation;

        // 1. If "new" or explicit creation needed, handle conversation find/create
        if (convId === 'new' && receiverId) {
            // Check if conversation exists
            conversation = await Conversation.findOne({
                where: {
                    [Op.or]: [
                        { user1Id: senderId, user2Id: receiverId },
                        { user1Id: receiverId, user2Id: senderId }
                    ]
                }
            });

            if (!conversation) {
                conversation = await Conversation.create({
                    user1Id: senderId,
                    user2Id: receiverId
                });
            }
            convId = conversation.id;
        } else {
            conversation = await Conversation.findByPk(convId);
            if (!conversation) {
                return res.status(404).json({ status: 'error', message: 'Conversation not found' });
            }
        }

        // 2. Create Message
        const message = await Message.create({
            conversationId: convId,
            senderId,
            content
        });

        // 3. Update Conversation (last message)
        await conversation.update({
            lastMessageContent: content.substring(0, 50),
            lastMessageSenderId: senderId,
            lastMessageAt: new Date()
        });

        // 4. Publish Event to RabbitMQ for Socket Service
        const channel = getRabbitMQChannel();
        if (channel) {
            const event = {
                type: 'MESSAGE_SENT',
                payload: {
                    message,
                    receiverId: conversation.user1Id === senderId ? conversation.user2Id : conversation.user1Id
                }
            };
            channel.sendToQueue('socket_events', Buffer.from(JSON.stringify(event)));
        }

        res.status(201).json({
            status: 'success',
            data: message,
            conversationId: convId // Return ID in case it was 'new'
        });

    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ status: 'error', message: 'Failed to send message' });
    }
};

// Mark conversation as seen
const markAsSeen = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user.id;

        // Update all messages in this conversation sent by the OTHER user as seen
        await Message.update(
            { isSeen: true },
            {
                where: {
                    conversationId,
                    senderId: { [Op.ne]: userId },
                    isSeen: false
                }
            }
        );

        // Notify via socket that messages were seen
        const conversation = await Conversation.findByPk(conversationId);
        if (conversation) {
            const channel = getRabbitMQChannel();
            if (channel) {
                const event = {
                    type: 'MESSAGES_SEEN',
                    payload: {
                        conversationId,
                        seenBy: userId,
                        receiverId: conversation.user1Id === userId ? conversation.user2Id : conversation.user1Id
                    }
                };
                channel.sendToQueue('socket_events', Buffer.from(JSON.stringify(event)));
            }
        }

        res.json({ status: 'success' });
    } catch (error) {
        console.error('Error marking as seen:', error);
        res.status(500).json({ status: 'error', message: 'Failed to mark as seen' });
    }
};

module.exports = {
    getConversations,
    getMessages,
    sendMessage,
    markAsSeen
};
