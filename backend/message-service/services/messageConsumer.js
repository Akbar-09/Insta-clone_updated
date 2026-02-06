const amqp = require('amqplib');
const Message = require('../models/Message');

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672');
        const channel = await connection.createChannel();
        const exchange = 'instagram-events';

        await channel.assertExchange(exchange, 'topic', { durable: true });
        const q = await channel.assertQueue('message-service-media-sync-queue', { durable: true });

        await channel.bindQueue(q.queue, exchange, 'MEDIA.OPTIMIZED');

        console.log('Message Service listening for Media Optimization events...');

        channel.consume(q.queue, async (msg) => {
            if (msg.content) {
                const data = JSON.parse(msg.content.toString());
                const routingKey = msg.fields.routingKey;

                if (routingKey === 'MEDIA.OPTIMIZED') {
                    const { originalUrl, optimizedUrl } = data;

                    try {
                        const messages = await Message.findAll({ where: { mediaUrl: originalUrl } });
                        if (messages.length > 0) {
                            for (const message of messages) {
                                message.mediaUrl = optimizedUrl;
                                await message.save();
                                console.log(`Message ${message.id} updated with optimized media.`);
                            }
                        }
                    } catch (err) {
                        console.error('Error syncing message media:', err);
                    }
                }

                channel.ack(msg);
            }
        });

    } catch (error) {
        console.error('RabbitMQ Connection Failed in Message Consumer:', error);
    }
};

module.exports = { connectRabbitMQ };
