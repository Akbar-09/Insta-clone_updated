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

        console.log('Post Service listening for Comment events...');

        channel.consume(q.queue, async (msg) => {
            if (msg.content) {
                const data = JSON.parse(msg.content.toString());
                const routingKey = msg.fields.routingKey;

                console.log(`Received ${routingKey} for post sync`);

                try {
                    if (routingKey === 'COMMENT_ADDED') {
                        const postId = data.postId;
                        const post = await Post.findByPk(postId);
                        if (post) {
                            await post.increment('commentsCount');
                            console.log(`Incremented commentsCount for post ${postId}`);
                        }
                    } else if (routingKey === 'COMMENT_DELETED') {
                        const postId = data.postId;
                        const post = await Post.findByPk(postId);
                        if (post) {
                            await post.decrement('commentsCount');
                            console.log(`Decremented commentsCount for post ${postId}`);
                        }
                    }
                } catch (err) {
                    console.error('Error syncing post comments:', err);
                }

                channel.ack(msg);
            }
        });

    } catch (error) {
        console.error('RabbitMQ Connection Failed in Post Consumer:', error);
    }
};

module.exports = { connectRabbitMQ };
