const amqp = require('amqplib');

let channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672');
        channel = await connection.createChannel();
        await channel.assertExchange('instagram-events', 'topic', { durable: true });
        console.log('Connected to RabbitMQ');
    } catch (error) {
        console.error('RabbitMQ Connection Failed', error);
    }
};

const publishEvent = async (routingKey, data) => {
    if (!channel) {
        console.error(`[RabbitMQ] No active channel — cannot publish event: ${routingKey}`);
        return;
    }
    try {
        channel.publish(
            'instagram-events',
            routingKey,
            Buffer.from(JSON.stringify(data))
        );
        console.log(`Event Published: ${routingKey}`);
    } catch (err) {
        console.error(`[RabbitMQ] Failed to publish event ${routingKey}:`, err.message);
        // Clear the stale channel so next call tries reconnecting
        channel = null;
    }
};


const publishNotification = async (notification) => {
    if (!channel) {
        console.error('[RabbitMQ] No active channel — cannot publish notification');
        return;
    }
    try {
        await channel.assertQueue('notification_queue', { durable: true });
        channel.sendToQueue('notification_queue', Buffer.from(JSON.stringify(notification)), {
            persistent: true,
        });
        console.log(`Notification Published: ${notification.type}`);
    } catch (err) {
        console.error('[RabbitMQ] Failed to publish notification:', err.message);
        channel = null;
    }
};

module.exports = { connectRabbitMQ, publishEvent, publishNotification };

