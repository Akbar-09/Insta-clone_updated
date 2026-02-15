const amqp = require('amqplib');
const axios = require('axios');
const Notification = require('../models/Notification');
const NotificationSettings = require('../models/NotificationSettings');

const checkSettings = async (userId, type, actionUserId) => {
    try {
        const settings = await NotificationSettings.findOne({ where: { userId } });
        if (!settings) return true;

        if (settings.pauseAllPush) return false;

        switch (type) {
            case 'LIKE':
                if (settings.likes === 'OFF') return false;
                if (settings.likes === 'FOLLOWING') {
                    const isFollowing = await checkIsFollowing(actionUserId, userId);
                    return isFollowing;
                }
                return true;
            case 'COMMENT':
            case 'REPLY':
                if (settings.comments === 'OFF') return false;
                if (settings.comments === 'FOLLOWING') {
                    const isFollowing = await checkIsFollowing(actionUserId, userId);
                    return isFollowing;
                }
                return true;
            case 'FOLLOW':
                return settings.follows;
            case 'MESSAGE':
                return settings.messages;
            default:
                return true;
        }
    } catch (err) {
        console.error('Check Settings Error:', err);
        return true;
    }
};

async function checkIsFollowing(followerId, followedId) {
    try {
        const response = await axios.get(`http://localhost:5002/users/${followerId}/following/${followedId}`);
        return response.data.isFollowing;
    } catch (error) {
        return false;
    }
}

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672');
        const channel = await connection.createChannel();
        const exchange = 'instagram-events';

        await channel.assertExchange(exchange, 'topic', { durable: true });
        const q = await channel.assertQueue('notification-service-queue', { durable: true });

        await channel.bindQueue(q.queue, exchange, 'COMMENT_ADDED');
        await channel.bindQueue(q.queue, exchange, 'POST_LIKED');
        await channel.bindQueue(q.queue, exchange, 'USER_FOLLOWED');
        await channel.bindQueue(q.queue, exchange, 'MESSAGE_SENT');

        console.log('Listening for Notification events...');

        channel.consume(q.queue, async (msg) => {
            if (msg.content) {
                const data = JSON.parse(msg.content.toString());
                const routingKey = msg.fields.routingKey;

                try {
                    let type = '';
                    let targetUserId = '';
                    let actionUserId = data.userId || data.followerId || data.senderId;

                    if (routingKey === 'COMMENT_ADDED') {
                        type = data.parentId ? 'REPLY' : 'COMMENT';
                        targetUserId = data.postOwnerId;
                    } else if (routingKey === 'POST_LIKED') {
                        type = 'LIKE';
                        targetUserId = data.postOwnerId;
                    } else if (routingKey === 'USER_FOLLOWED') {
                        type = 'FOLLOW';
                        targetUserId = data.followedId;
                    } else if (routingKey === 'MESSAGE_SENT') {
                        type = 'MESSAGE';
                        targetUserId = data.receiverId;
                    }

                    if (targetUserId && String(actionUserId) !== String(targetUserId)) {
                        const canNotify = await checkSettings(targetUserId, type, actionUserId);

                        if (canNotify) {
                            const actor = await fetchActorDetails(actionUserId);
                            let resourceImage = '';

                            if (data.postId) {
                                const post = await fetchPostDetails(data.postId);
                                resourceImage = post.mediaUrl || '';
                            }

                            await Notification.create({
                                userId: targetUserId,
                                fromUserId: actionUserId,
                                fromUsername: actor.username || data.username || 'User',
                                fromUserAvatar: actor.profilePicture || '',
                                type: type,
                                resourceId: data.postId || 0,
                                resourceImage: resourceImage,
                                message: data.text || '',
                                isRead: false
                            });
                        }
                    }
                } catch (err) {
                    console.error('Error processing notification:', err);
                }
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('RabbitMQ Connection Failed', error);
    }
};

async function fetchActorDetails(userId) {
    try {
        const response = await axios.get(`http://localhost:5002/users/${userId}`);
        if (response.data.status === 'success') {
            return response.data.data;
        }
        return {};
    } catch (error) {
        console.error(`Failed to fetch actor details for ${userId}:`, error.message);
        return {};
    }
}

async function fetchPostDetails(postId) {
    try {
        const response = await axios.get(`http://localhost:5003/posts/${postId}`);
        if (response.data.status === 'success') {
            return response.data.data;
        }
        return {};
    } catch (error) {
        console.error(`Failed to fetch post details for ${postId}:`, error.message);
        return {};
    }
}

module.exports = { connectRabbitMQ };
