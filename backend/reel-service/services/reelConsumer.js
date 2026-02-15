const amqp = require('amqplib');
const Reel = require('../models/Reel');

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672');
        const channel = await connection.createChannel();
        const exchange = 'instagram-events';

        await channel.assertExchange(exchange, 'topic', { durable: true });

        const q = await channel.assertQueue('reel-service-comment-queue', { durable: true });

        await channel.bindQueue(q.queue, exchange, 'COMMENT_ADDED');
        await channel.bindQueue(q.queue, exchange, 'COMMENT_DELETED');

        console.log('Reel Service listening for Comment events...');

        channel.consume(q.queue, async (msg) => {
            if (msg.content) {
                const data = JSON.parse(msg.content.toString());
                const routingKey = msg.fields.routingKey;

                console.log(`Received ${routingKey} for reel sync`);

                try {
                    const reelId = data.postId;
                    const targetType = data.targetType;

                    if (targetType === 'reel') {
                        const reel = await Reel.findByPk(reelId);
                        if (reel) {
                            if (routingKey === 'COMMENT_ADDED') {
                                await reel.increment('commentsCount');
                                console.log(`Incremented commentsCount for reel ${reelId}`);
                            } else if (routingKey === 'COMMENT_DELETED') {
                                await reel.decrement('commentsCount');
                                console.log(`Decremented commentsCount for reel ${reelId}`);
                            }
                        }
                    }
                } catch (err) {
                    console.error('Error syncing reel comments:', err);
                }

                channel.ack(msg);
            }
        });

    } catch (error) {
        console.error('RabbitMQ Connection Failed in Reel Consumer:', error);
    }
};

module.exports = { connectRabbitMQ };
