const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const { getRabbitMQChannel } = require('../config/rabbitmq');
const { Op } = require('sequelize');
const axios = require('axios');

// Fetch all conversations for the logged-in user
const getConversations = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find conversations
        const conversationsRaw = await Conversation.findAll({
            where: {
                [Op.or]: [{ user1Id: userId }, { user2Id: userId }]
            },
            order: [['lastMessageAt', 'DESC']]
        });

        if (conversationsRaw.length === 0) {
            return res.json({ status: 'success', data: [] });
        }

        // Identify other users to fetch profiles
        const otherUserIds = conversationsRaw.map(c =>
            c.user1Id === userId ? c.user2Id : c.user1Id
        );

        // Fetch user profiles from user-service
        let profilesMap = {};
        try {
            const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:5002';
            const response = await axios.post(`${userServiceUrl}/profile/batch`, { userIds: otherUserIds }, {
                headers: { 'x-user-id': userId }
            });
            if (response.data.status === 'success') {
                response.data.data.forEach(p => {
                    profilesMap[p.userId] = p;
                });
            }
        } catch (error) {
            console.error('Error fetching batch profiles:', error.message);
        }

        // Fetch unread counts for each conversation
        const hydratedConversations = await Promise.all(conversationsRaw.map(async (conv) => {
            const otherUserId = conv.user1Id === userId ? conv.user2Id : conv.user1Id;
            const unreadCount = await Message.count({
                where: {
                    conversationId: conv.id,
                    senderId: otherUserId,
                    isSeen: false
                }
            });

            return {
                ...conv.toJSON(),
                otherUser: profilesMap[otherUserId] || { userId: otherUserId, username: 'User' },
                unreadCount
            };
        }));

        res.json({
            status: 'success',
            data: hydratedConversations
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
        const userId = req.user.id;

        const messages = await Message.findAll({
            where: { conversationId },
            order: [['createdAt', 'ASC']]
        });

        // Mark messages from OTHER user as seen
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

        // Notify via socket (asynchronously)
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
        const senderId = req.user.id;
        const { conversationId, receiverId, content, type, mediaUrl, replyToStoryId } = req.body;

        let convId = conversationId;
        let conversation;

        // 1. Handle conversation find/create
        if ((!convId || convId === 'new') && receiverId) {
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
            content,
            type: type || 'text',
            mediaUrl,
            replyToStoryId,
            isSeen: false
        });

        // 3. Update Conversation snippet
        let snippet = content;
        if (type === 'image') snippet = '📷 Image';
        else if (type === 'video') snippet = '🎥 Video';
        else if (type === 'story_reply') snippet = '✉️ Replied to your story';
        else if (type === 'sticker') snippet = '🖼️ Sticker';
        else if (type === 'voice') snippet = '🎤 Voice message';

        await conversation.update({
            lastMessageContent: snippet ? snippet.substring(0, 50) : '',
            lastMessageSenderId: senderId,
            lastMessageAt: new Date()
        });

        // 4. Publish to RabbitMQ
        const channel = getRabbitMQChannel();
        if (channel) {
            const otherUserId = conversation.user1Id === senderId ? conversation.user2Id : conversation.user1Id;
            const event = {
                type: 'MESSAGE_SENT',
                payload: {
                    message,
                    receiverId: otherUserId
                }
            };
            channel.sendToQueue('socket_events', Buffer.from(JSON.stringify(event)));
        }

        res.status(201).json({
            status: 'success',
            data: message,
            conversationId: convId
        });

    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ status: 'error', message: 'Failed to send message' });
    }
};

const getConversationDetails = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user.id;

        const conversation = await Conversation.findByPk(conversationId);
        if (!conversation) return res.status(404).json({ status: 'error', message: 'Not found' });

        const otherUserId = conversation.user1Id === userId ? conversation.user2Id : conversation.user1Id;

        // Fetch other user profile
        let otherUser = { userId: otherUserId, username: 'User' };
        try {
            const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:5002';
            // Use batch endpoint which supports checking by ID and returns blocked status
            const batchRes = await axios.post(`${userServiceUrl}/profile/batch`,
                { userIds: [otherUserId] },
                { headers: { 'x-user-id': userId } }
            );

            if (batchRes.data.status === 'success' && batchRes.data.data.length > 0) {
                otherUser = batchRes.data.data[0];
            }
        } catch (e) { console.error('Profile fetch failed', e.message); }

        // Fetch media (images/videos/stickers/voice)
        const media = await Message.findAll({
            where: {
                conversationId,
                type: { [Op.in]: ['image', 'video', 'sticker', 'voice'] }
            },
            order: [['createdAt', 'DESC']],
            limit: 50
        });

        res.json({
            status: 'success',
            data: {
                conversation: {
                    ...conversation.toJSON(),
                    isMuted: conversation.user1Id === userId ? conversation.user1Muted : conversation.user2Muted
                },
                otherUser,
                media
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const toggleMute = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user.id;

        const conversation = await Conversation.findByPk(conversationId);
        if (!conversation) return res.status(404).json({ status: 'error', message: 'Not found' });

        if (conversation.user1Id === userId) {
            conversation.user1Muted = !conversation.user1Muted;
        } else {
            conversation.user2Muted = !conversation.user2Muted;
        }

        await conversation.save();
        res.json({ status: 'success', isMuted: conversation.user1Id === userId ? conversation.user1Muted : conversation.user2Muted });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const deleteConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        // In a real app, we might soft delete or mark as hidden for this user.
        // For simplicity, we'll hard delete messages or the conversation.
        await Message.destroy({ where: { conversationId } });
        await Conversation.destroy({ where: { id: conversationId } });
        res.json({ status: 'success' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const getActivityStoryReplies = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { sort, startDate, endDate } = req.query;
        const currentUserId = userId || (req.user && req.user.id);
        if (!currentUserId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const whereClause = { senderId: currentUserId, type: 'story_reply' };
        if (startDate && endDate) {
            whereClause.createdAt = { [Op.between]: [new Date(startDate), new Date(endDate)] };
        }

        const replies = await Message.findAll({
            where: whereClause,
            order: [['createdAt', sort === 'oldest' ? 'ASC' : 'DESC']]
        });
        res.json({ status: 'success', data: replies });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const markAsSeen = async (req, res) => {
    try {
        const { conversationId } = req.body;
        const userId = req.user.id;

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
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const blockUser = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user.id;
        const conversation = await Conversation.findByPk(conversationId);
        if (!conversation) return res.status(404).json({ status: 'error', message: 'Not found' });

        const otherUserId = conversation.user1Id === userId ? conversation.user2Id : conversation.user1Id;

        try {
            const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:5002';
            await axios.post(`${userServiceUrl}/profile/block/${otherUserId}`, {}, {
                headers: { 'x-user-id': userId }
            });
            res.json({ status: 'success', message: 'User blocked' });
        } catch (apiError) {
            console.error('User service block failed', apiError.message);
            res.status(500).json({ status: 'error', message: 'Failed to block user' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const unblockUser = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user.id;
        const conversation = await Conversation.findByPk(conversationId);
        if (!conversation) return res.status(404).json({ status: 'error', message: 'Not found' });

        const otherUserId = conversation.user1Id === userId ? conversation.user2Id : conversation.user1Id;

        try {
            const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:5002';
            await axios.delete(`${userServiceUrl}/profile/unblock/${otherUserId}`, {
                headers: { 'x-user-id': userId }
            });
            res.json({ status: 'success', message: 'User unblocked' });
        } catch (apiError) {
            console.error('User service unblock failed', apiError.message);
            res.status(500).json({ status: 'error', message: 'Failed to unblock user' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const reportConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { reason } = req.body;
        // In a real app, logic to handle report
        res.json({ status: 'success', message: 'Report submitted' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    getConversations,
    getMessages,
    sendMessage,
    markAsSeen,
    getActivityStoryReplies,
    getConversationDetails,
    toggleMute,
    deleteConversation,
    blockUser,
    unblockUser,
    reportConversation
};

