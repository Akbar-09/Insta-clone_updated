const amqp = require('amqplib');
const UserProfile = require('../models/UserProfile');

let channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672');
        channel = await connection.createChannel();
        const exchange = 'instagram-events';

        await channel.assertExchange(exchange, 'topic', { durable: true });

        // Create queue for User Service
        const q = await channel.assertQueue('user-service-queue', { durable: true });

        // Bind queue to USER_CREATED
        await channel.bindQueue(q.queue, exchange, 'USER_CREATED');

        console.log('Listening for USER_CREATED events...');

        channel.consume(q.queue, async (msg) => {
            if (msg.content) {
                const data = JSON.parse(msg.content.toString());
                console.log('Received USER_CREATED:', data);

                try {
                    // Create Profile
                    await UserProfile.create({
                        userId: data.id,
                        username: data.username,
                        fullName: data.fullName,
                    });
                    console.log('User Profile Created');
                } catch (err) {
                    console.error('Error creating profile:', err);
                }

                channel.ack(msg);
            }
        });

    } catch (error) {
        console.error('RabbitMQ Connection Failed', error);
    }
};

const publishEvent = async (eventName, data) => {
    if (!channel) {
        console.error('RabbitMQ channel not ready');
        return;
    }
    const exchange = 'instagram-events';
    channel.publish(exchange, eventName, Buffer.from(JSON.stringify(data)));
    console.log(`Event Published: ${eventName}`);
};

module.exports = { connectRabbitMQ, publishEvent };
