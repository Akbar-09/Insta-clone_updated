const amqp = require('amqplib');
const Story = require('../models/Story');

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672');
        const channel = await connection.createChannel();
        const exchange = 'instagram-events';

        await channel.assertExchange(exchange, 'topic', { durable: true });
        const q = await channel.assertQueue('story-service-media-sync-queue', { durable: true });

        await channel.bindQueue(q.queue, exchange, 'MEDIA.OPTIMIZED');

        console.log('Story Service listening for Media Optimization events...');

        channel.consume(q.queue, async (msg) => {
            if (msg.content) {
                const data = JSON.parse(msg.content.toString());
                const routingKey = msg.fields.routingKey;

                if (routingKey === 'MEDIA.OPTIMIZED') {
                    const { originalUrl, optimizedUrl, thumbnailUrl } = data;

                    try {
                        const stories = await Story.findAll({ where: { mediaUrl: originalUrl } });
                        if (stories.length > 0) {
                            for (const story of stories) {
                                story.mediaUrl = optimizedUrl;
                                if (thumbnailUrl) {
                                    story.thumbnailUrl = thumbnailUrl;
                                }
                                await story.save();
                                console.log(`Story ${story.id} updated with optimized media.`);
                            }
                        }
                    } catch (err) {
                        console.error('Error syncing story media:', err);
                    }
                }

                channel.ack(msg);
            }
        });

    } catch (error) {
        console.error('RabbitMQ Connection Failed in Story Consumer:', error);
    }
};

module.exports = { connectRabbitMQ };
