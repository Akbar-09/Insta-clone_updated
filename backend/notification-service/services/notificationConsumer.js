const amqp = require('amqplib');
const Notification = require('../models/Notification');

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672');
        const channel = await connection.createChannel();
        const exchange = 'instagram-events';

        await channel.assertExchange(exchange, 'topic', { durable: true });

        // Queue for Notification Service
        const q = await channel.assertQueue('notification-service-queue', { durable: true });

        // Bind to relevant events
        await channel.bindQueue(q.queue, exchange, 'COMMENT_ADDED');
        await channel.bindQueue(q.queue, exchange, 'POST_LIKED');
        await channel.bindQueue(q.queue, exchange, 'USER_FOLLOWED');
        await channel.bindQueue(q.queue, exchange, 'MESSAGE_SENT');

        console.log('Listening for Notification events...');

        channel.consume(q.queue, async (msg) => {
            if (msg.content) {
                const data = JSON.parse(msg.content.toString());
                const routingKey = msg.fields.routingKey;

                console.log(`Received ${routingKey}:`, data);

                try {
                    if (routingKey === 'COMMENT_ADDED') {
                        // Data: { id, text, postId, userId, username, postOwnerId, parentId... }
                        // If it's your own post, don't notify (unless reply?)
                        if (String(data.userId) !== String(data.postOwnerId)) {
                            const actor = await fetchActorDetails(data.userId);
                            const post = await fetchPostDetails(data.postId);
                            await Notification.create({
                                userId: data.postOwnerId,
                                fromUserId: data.userId,
                                fromUsername: actor.username || data.username || 'User',
                                fromUserAvatar: actor.profilePicture || '',
                                type: data.parentId ? 'REPLY' : 'COMMENT', // Logic for REPLY if data supports it
                                resourceId: data.postId,
                                resourceImage: post.mediaUrl || '',
                                isRead: false
                            });
                        }
                    } else if (routingKey === 'POST_LIKED') {
                        // Data: { postId, userId, postOwnerId, timestamp }
                        if (String(data.userId) !== String(data.postOwnerId)) {
                            const actor = await fetchActorDetails(data.userId);
                            // Check if duplicate like notification exists?
                            // For MVP, just create. (Or findOne first to avoid spam if user unlike/like)
                            const existing = await Notification.findOne({
                                where: {
                                    userId: data.postOwnerId,
                                    fromUserId: data.userId,
                                    type: 'LIKE',
                                    resourceId: data.postId
                                }
                            });

                            if (!existing) {
                                const post = await fetchPostDetails(data.postId);
                                await Notification.create({
                                    userId: data.postOwnerId,
                                    fromUserId: data.userId,
                                    fromUsername: actor.username || 'User',
                                    fromUserAvatar: actor.profilePicture || '',
                                    type: 'LIKE',
                                    resourceId: data.postId,
                                    resourceImage: post.mediaUrl || '',
                                    isRead: false
                                });
                            }
                        }
                    } else if (routingKey === 'USER_FOLLOWED') {
                        // Data: { followerId, followedId, timestamp }
                        const actor = await fetchActorDetails(data.followerId);

                        // Avoid duplicates
                        const existing = await Notification.findOne({
                            where: {
                                userId: data.followedId,
                                fromUserId: data.followerId,
                                type: 'FOLLOW'
                            }
                        });

                        if (!existing) {
                            await Notification.create({
                                userId: data.followedId,
                                fromUserId: data.followerId,
                                fromUsername: actor.username || 'User',
                                fromUserAvatar: actor.profilePicture || '',
                                type: 'FOLLOW',
                                resourceId: 0, // No resource for follow
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

const axios = require('axios');

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
