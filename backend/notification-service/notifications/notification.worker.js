const amqp = require('amqplib');
const webpush = require('web-push');
const Notification = require('../models/Notification');
const PushSubscription = require('../models/PushSubscription');
require('dotenv').config();

// Configure Web Push
webpush.setVapidDetails(
    process.env.VAPID_SUBJECT,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

let channel;

const startWorker = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672');

        connection.on('error', (err) => {
            console.error('[RabbitMQ Worker] Connection error:', err.message);
        });

        connection.on('close', () => {
            console.error('[RabbitMQ Worker] Connection closed. Reconnecting in 5s...');
            setTimeout(startWorker, 5000);
        });

        channel = await connection.createChannel();

        channel.on('error', (err) => {
            console.error('[RabbitMQ Worker] Channel error:', err.message);
        });

        await channel.assertQueue('notification_queue', { durable: true });

        const exchange = 'instagram-events';
        await channel.assertExchange(exchange, 'topic', { durable: true });

        console.log('Notification Worker waiting for messages...');

        channel.consume('notification_queue', async (msg) => {
            if (msg !== null) {
                const payload = JSON.parse(msg.content.toString());
                let { userId, type, title, message, link, fromUserId, fromUsername, fromUserAvatar } = payload;

                // Fallback for missing fromUsername if message has a colon (like "username: hello")
                if (!fromUsername && message && message.includes(':')) {
                    fromUsername = message.split(':')[0];
                }

                try {
                    // 1. Save to PostgreSQL
                    const notification = await Notification.create({
                        userId,
                        type,
                        title,
                        message,
                        link,
                        fromUserId,
                        fromUsername,
                        fromUserAvatar
                    });

                    // 2. Emit Socket.io event (via RabbitMQ to Socket Service)
                    channel.publish(exchange, 'new_notification', Buffer.from(JSON.stringify({
                        type: 'new_notification',
                        payload: {
                            userId,
                            notification
                        }
                    })));

                    // 3. Fetch Push Subscriptions
                    const subscriptions = await PushSubscription.findAll({
                        where: { userId }
                    });


                    // 4. Send Web Push
                    const pushPayload = JSON.stringify({
                        title: title,
                        body: message,
                        url: link || '/',
                        icon: fromUserAvatar || '/vite.svg', // Use sender avatar or fallback
                        badge: '/vite.svg'
                    });

                    const pushPromises = subscriptions.map(async (sub) => {
                        const pushSubscription = {
                            endpoint: sub.endpoint,
                            keys: {
                                p256dh: sub.p256dh,
                                auth: sub.auth
                            }
                        };

                        try {
                            console.log(`[PushWorker] Sending push to user ${userId} via endpoint: ${pushSubscription.endpoint.substring(0, 40)}...`);
                            await webpush.sendNotification(pushSubscription, pushPayload);
                        } catch (error) {
                            if (error.statusCode === 410 || error.statusCode === 404) {
                                // Subscriptions expired or no longer valid
                                await sub.destroy();
                                console.log(`[PushWorker] Removed invalid/expired subscription for user ${userId}`);
                            } else {
                                console.error('[PushWorker] Web Push error:', error.message);
                            }
                        }
                    });

                    await Promise.all(pushPromises);

                    // Acknowledge message
                    channel.ack(msg);
                    console.log(`Notification processed for user ${userId}: ${type}`);
                } catch (error) {
                    console.error('Error processing notification worker:', error.message);
                    // Optionally nack and requeue
                    channel.nack(msg, false, true);
                }
            }
        });
    } catch (error) {
        console.error('Notification Worker Error:', error.message);
        setTimeout(startWorker, 5000);
    }
};


if (require.main === module) {
    startWorker();
}

module.exports = { startWorker };
