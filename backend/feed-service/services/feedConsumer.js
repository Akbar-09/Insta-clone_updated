const amqp = require('amqplib');
const { client } = require('../config/redis');

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672');
        const channel = await connection.createChannel();
        const exchange = 'instagram-events';

        await channel.assertExchange(exchange, 'topic', { durable: true });

        // Queue for Feed Service
        const q = await channel.assertQueue('feed-service-queue', { durable: true });

        // Bind to POST_CREATED
        await channel.bindQueue(q.queue, exchange, 'POST_CREATED');
        // Bind to USER_FOLLOWED (To be implemented in User Service)
        await channel.bindQueue(q.queue, exchange, 'USER_FOLLOWED');

        console.log('Listening for Feed events...');

        channel.consume(q.queue, async (msg) => {
            if (msg.content) {
                const data = JSON.parse(msg.content.toString());
                const routingKey = msg.fields.routingKey;

                console.log(`Received ${routingKey}:`, data);

                if (routingKey === 'POST_CREATED') {
                    // In a real app, we'd find all followers of data.userId and push to their feed lists.
                    // For this MVP, we will push to a "global_feed" list in Redis for simplicity, 
                    // or simulate pushing to a specific user's feed if followers were provided.

                    await client.lPush('global_feed', JSON.stringify(data));
                    // Keep only last 100 items
                    await client.lTrim('global_feed', 0, 99);
                    console.log('Added post to global_feed in Redis');
                }

                channel.ack(msg);
            }
        });

    } catch (error) {
        console.error('RabbitMQ Connection Failed', error);
    }
};

module.exports = { connectRabbitMQ };
