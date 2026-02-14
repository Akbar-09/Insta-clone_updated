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
        // Bind to POST_DELETED
        await channel.bindQueue(q.queue, exchange, 'POST_DELETED');

        console.log('Listening for Feed events...');

        channel.consume(q.queue, async (msg) => {
            if (msg.content) {
                const data = JSON.parse(msg.content.toString());
                const routingKey = msg.fields.routingKey;

                console.log(`Received ${routingKey}:`, data);

                if (routingKey === 'POST_CREATED') {
                    // Push to "global_feed" list in Redis
                    await client.lPush('global_feed', JSON.stringify(data));
                    // Keep only last 100 items
                    await client.lTrim('global_feed', 0, 99);
                    console.log('Added post to global_feed in Redis');
                } else if (routingKey === 'POST_DELETED') {
                    // Remove from "global_feed"
                    console.log(`Removing post ${data.postId} from global_feed`);

                    // Fetch all items
                    const items = await client.lRange('global_feed', 0, -1);
                    const filtered = items.filter(itemStr => {
                        try {
                            const item = JSON.parse(itemStr);
                            // Keep item if ID does not match
                            return String(item.id) !== String(data.postId);
                        } catch (e) {
                            return true;
                        }
                    });

                    if (items.length !== filtered.length) {
                        // Replace list if changed
                        await client.del('global_feed');
                        // Push back in reverse order because lPush puts at head
                        // Originally: [newest, ..., oldest]
                        // lPush loop: push oldest -> [oldest], push next -> [next, oldest]...
                        // So we should iterate from end of 'filtered' to start.
                        for (let i = filtered.length - 1; i >= 0; i--) {
                            await client.lPush('global_feed', filtered[i]);
                        }
                        console.log(`Removed post ${data.postId} from Redis cache`);
                    } else {
                        console.log(`Post ${data.postId} not found in cache`);
                    }
                }

                channel.ack(msg);
            }
        });

    } catch (error) {
        console.error('RabbitMQ Connection Failed', error);
    }
};

module.exports = { connectRabbitMQ };
