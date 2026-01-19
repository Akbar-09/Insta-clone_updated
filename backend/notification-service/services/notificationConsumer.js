const amqp = require('amqplib');
const Notification = require('../models/Notification');

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672');
        const channel = await connection.createChannel();
        const exchange = 'instagram-events';

        await channel.assertExchange(exchange, 'topic', { durable: true });

        // Queue for Notification Service
        const q = await channel.assertQueue('notification-service-queue', { durable: true });

        // Bind to relevant events
        await channel.bindQueue(q.queue, exchange, 'COMMENT_ADDED');
        await channel.bindQueue(q.queue, exchange, 'POST_LIKED');
        await channel.bindQueue(q.queue, exchange, 'USER_FOLLOWED');
        await channel.bindQueue(q.queue, exchange, 'MESSAGE_SENT');

        console.log('Listening for Notification events...');

        channel.consume(q.queue, async (msg) => {
            if (msg.content) {
                const data = JSON.parse(msg.content.toString());
                const routingKey = msg.fields.routingKey;

                console.log(`Received ${routingKey}:`, data);

                try {
                    if (routingKey === 'COMMENT_ADDED') {
                        // Logic for comment notification
                        console.log(`[NOTIFICATION_CREATED] Comment on post ${data.postId} by ${data.username}`);
                    } else if (routingKey === 'POST_LIKED') {
                        // Logic for like notification
                        console.log(`[NOTIFICATION_CREATED] Like on post ${data.postId} by user ${data.userId}`);
                    } else if (routingKey === 'USER_FOLLOWED') {
                        // Logic for follow notification
                        console.log(`[NOTIFICATION_CREATED] User ${data.followedId} followed by ${data.followerId}`);
                    } else if (routingKey === 'MESSAGE_SENT') {
                        // Logic for DM notification
                        console.log(`[NOTIFICATION_CREATED] Message to ${data.recipientId} from ${data.senderId}`);
                    }

                    // In a real implementation, we would save to DB here:
                    // await Notification.create({ ... });

                } catch (err) {
                    console.error('Error processing notification:', err);
                }


                channel.ack(msg);
            }
        });

    } catch (error) {
        console.error('RabbitMQ Connection Failed', error);
    }
};

module.exports = { connectRabbitMQ };
