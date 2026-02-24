const amqp = require('amqplib');
const Reel = require('../models/Reel');
const { Op } = require('sequelize');

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672');
        const channel = await connection.createChannel();
        const exchange = 'instagram-events';

        await channel.assertExchange(exchange, 'topic', { durable: true });

        // Queue for Comments
        const q = await channel.assertQueue('reel-service-comment-queue', { durable: true });
        await channel.bindQueue(q.queue, exchange, 'COMMENT_ADDED');
        await channel.bindQueue(q.queue, exchange, 'COMMENT_DELETED');

        // Queue for Posts
        const postQ = await channel.assertQueue('reel-service-post-queue', { durable: true });
        await channel.bindQueue(postQ.queue, exchange, 'POST_CREATED');
        await channel.bindQueue(postQ.queue, exchange, 'POST_DELETED');

        console.log('Reel Service listening for Post and Comment events...');

        // Handle Comment Events
        channel.consume(q.queue, async (msg) => {
            if (msg.content) {
                const data = JSON.parse(msg.content.toString());
                const routingKey = msg.fields.routingKey;

                console.log(`Received ${routingKey} for reel sync`);

                try {
                    const reelId = data.postId;
                    const targetType = data.targetType;

                    if (targetType === 'reel') {
                        const reel = await Reel.findOne({
                            where: {
                                [Op.or]: [
                                    { id: isNaN(reelId) ? -1 : parseInt(reelId) },
                                    { videoUrl: data.mediaUrl || '' }
                                ]
                            }
                        });
                        if (reel) {
                            if (routingKey === 'COMMENT_ADDED') {
                                await reel.increment('commentsCount');
                                console.log(`Incremented commentsCount for reel ${reel.id}`);
                            } else if (routingKey === 'COMMENT_DELETED') {
                                await reel.decrement('commentsCount');
                                console.log(`Decremented commentsCount for reel ${reel.id}`);
                            }
                        }
                    }
                } catch (err) {
                    console.error('Error syncing reel comments:', err);
                }

                channel.ack(msg);
            }
        });

        // Handle Post Events (for video to reel sync)
        channel.consume(postQ.queue, async (msg) => {
            if (msg.content) {
                const post = JSON.parse(msg.content.toString());
                const routingKey = msg.fields.routingKey;

                console.log(`Received ${routingKey} (ID: ${post.id}, Type: ${post.mediaType})`);

                if (routingKey === 'POST_CREATED' && String(post.mediaType).toUpperCase() === 'VIDEO') {
                    try {
                        // Check if already exists (idempotency)
                        const existing = await Reel.findOne({ where: { videoUrl: post.mediaUrl } });
                        if (!existing) {
                            await Reel.create({
                                userId: post.userId,
                                username: post.username,
                                caption: post.caption,
                                videoUrl: post.mediaUrl,
                                isHidden: false
                            });
                            console.log(`Successfully auto-created Reel from Video Post ${post.id}`);
                        }
                    } catch (err) {
                        console.error('Error auto-creating reel from post:', err);
                    }
                } else if (routingKey === 'POST_DELETED') {
                    try {
                        // Delete any reel associated with this post's media
                        if (post.mediaUrl) {
                            const deleted = await Reel.destroy({ where: { videoUrl: post.mediaUrl } });
                            if (deleted > 0) {
                                console.log(`Deleted reel associated with deleted post media: ${post.mediaUrl}`);
                            }
                        }
                    } catch (err) {
                        console.error('Error deleting reel on post deletion:', err);
                    }
                }

                channel.ack(msg);
            }
        });

    } catch (error) {
        console.error('RabbitMQ Connection Failed in Reel Consumer:', error);
    }
};

module.exports = { connectRabbitMQ };
