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

        // Bind queue to USER_CREATED and MEDIA.OPTIMIZED
        await channel.bindQueue(q.queue, exchange, 'USER_CREATED');
        await channel.bindQueue(q.queue, exchange, 'MEDIA.OPTIMIZED');

        console.log('User Service listening for events...');

        channel.consume(q.queue, async (msg) => {
            if (msg.content) {
                const data = JSON.parse(msg.content.toString());
                const routingKey = msg.fields.routingKey;
                console.log(`Received ${routingKey}:`, data);

                try {
                    if (routingKey === 'USER_CREATED') {
                        // Upsert Profile (Update if exists, Create if not)
                        const [profile, created] = await UserProfile.findOrCreate({
                            where: { userId: data.id },
                            defaults: {
                                username: data.username,
                                fullName: data.fullName || data.username,
                            }
                        });

                        if (!created) {
                            console.log(`User Profile for ID ${data.id} already exists (placeholder found). Updating profile...`);
                            profile.username = data.username;
                            profile.fullName = data.fullName || data.username;
                            profile.createdAt = new Date(); // Reset creation date to now since this is a new registration
                            await profile.save();
                        }
                        console.log('User Profile Synced');
                    } else if (routingKey === 'MEDIA.OPTIMIZED') {
                        const { originalUrl, optimizedUrl } = data;
                        console.log(`Optimizing profile pic update: ${originalUrl} -> ${optimizedUrl}`);

                        // Update all users who were using the original temp URL
                        const [updatedCount] = await UserProfile.update(
                            { profilePic: optimizedUrl },
                            { where: { profilePic: originalUrl } }
                        );
                        if (updatedCount > 0) {
                            console.log(`Updated ${updatedCount} user profiles with optimized pic.`);
                        }
                    }
                } catch (err) {
                    console.error('Error handling event:', err);
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
