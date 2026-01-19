const amqp = require('amqplib');
const SearchIndex = require('../models/SearchIndex');

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672');
        const channel = await connection.createChannel();
        const exchange = 'instagram-events';

        await channel.assertExchange(exchange, 'topic', { durable: true });

        const q = await channel.assertQueue('search-service-queue', { durable: true });

        await channel.bindQueue(q.queue, exchange, 'USER_CREATED');
        await channel.bindQueue(q.queue, exchange, 'POST_CREATED');

        console.log('Listening for Search Indexing events...');

        channel.consume(q.queue, async (msg) => {
            if (msg.content) {
                const data = JSON.parse(msg.content.toString());
                const routingKey = msg.fields.routingKey;

                console.log(`Received ${routingKey} for indexing`);

                try {
                    if (routingKey === 'USER_CREATED') {
                        await SearchIndex.create({
                            type: 'USER',
                            referenceId: data.id,
                            content: data.username, // Index username
                            metadata: { fullName: data.fullName }
                        });
                    } else if (routingKey === 'POST_CREATED') {
                        await SearchIndex.create({
                            type: 'POST',
                            referenceId: data.id,
                            content: data.caption || '', // Index caption
                            metadata: { mediaUrl: data.mediaUrl }
                        });
                        // Extract HashTags? (Skipped for MVP brevity)
                    }
                } catch (err) {
                    console.error('Error indexing:', err);
                }

                channel.ack(msg);
            }
        });

    } catch (error) {
        console.error('RabbitMQ Connection Failed', error);
    }
};

module.exports = { connectRabbitMQ };
