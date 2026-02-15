const amqp = require('amqplib');
const Post = require('../models/Post');

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672');
        const channel = await connection.createChannel();
        const exchange = 'instagram-events';

        await channel.assertExchange(exchange, 'topic', { durable: true });

        const q = await channel.assertQueue('post-service-comment-queue', { durable: true });

        await channel.bindQueue(q.queue, exchange, 'COMMENT_ADDED');
        await channel.bindQueue(q.queue, exchange, 'COMMENT_DELETED');
        await channel.bindQueue(q.queue, exchange, 'MEDIA.OPTIMIZED');

        console.log('Post Service listening for Comment events...');

        channel.consume(q.queue, async (msg) => {
            if (msg.content) {
                const data = JSON.parse(msg.content.toString());
                const routingKey = msg.fields.routingKey;

                console.log(`Received ${routingKey} for post sync`);

                try {
                    const postId = data.postId;
                    const targetType = data.targetType || 'post';

                    if (targetType === 'post') {
                        const post = await Post.findByPk(postId);
                        if (post) {
                            if (routingKey === 'COMMENT_ADDED') {
                                await post.increment('commentsCount');
                                console.log(`Incremented commentsCount for post ${postId}`);
                            } else if (routingKey === 'COMMENT_DELETED') {
                                await post.decrement('commentsCount');
                                console.log(`Decremented commentsCount for post ${postId}`);
                            }
                        }
                    } else if (routingKey === 'MEDIA.OPTIMIZED') {
                        const { originalUrl, optimizedUrl, thumbnailUrl, type } = data;
                        console.log(`Updating post with optimized media... ${originalUrl} -> ${optimizedUrl}`);

                        // Find potential posts that use this media (originalUrl)
                        const posts = await Post.findAll({ where: { mediaUrl: originalUrl } });

                        if (posts.length > 0) {
                            for (const post of posts) {
                                post.mediaUrl = optimizedUrl;
                                if (thumbnailUrl) {
                                    post.thumbnailUrl = thumbnailUrl;
                                }
                                await post.save();
                                console.log(`Post ${post.id} updated with optimized media.`);
                            }
                        } else {
                            console.log('No posts found with original URL:', originalUrl);
                        }
                    }
                } catch (err) {
                    console.error('Error syncing post data:', err);
                }

                channel.ack(msg);
            }
        });

    } catch (error) {
        console.error('RabbitMQ Connection Failed in Post Consumer:', error);
    }
};

module.exports = { connectRabbitMQ };
