const amqp = require('amqplib');

let channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672');
        channel = await connection.createChannel();

        // Assert exchange for topic-based events
        await channel.assertExchange('instagram-events', 'topic', { durable: true });

        // Assert queue for direct socket events
        await channel.assertQueue('socket_events', { durable: true });

        console.log('Connected to RabbitMQ');
    } catch (error) {
        console.error('RabbitMQ Connection Failed', error);
    }
};

const getRabbitMQChannel = () => channel;

const publishEvent = async (routingKey, data) => {
    if (!channel) {
        console.error('RabbitMQ channel not active');
        return;
    }
    channel.publish(
        'instagram-events',
        routingKey,
        Buffer.from(JSON.stringify(data))
    );
    console.log(`Event Published: ${routingKey}`);
};

const publishNotification = async (notification) => {
    if (!channel) {
        console.error('RabbitMQ channel not active');
        return;
    }
    await channel.assertQueue('notification_queue', { durable: true });
    channel.sendToQueue('notification_queue', Buffer.from(JSON.stringify(notification)), {
        persistent: true,
    });
    console.log(`Notification Published: ${notification.type}`);
};

module.exports = { connectRabbitMQ, publishEvent, getRabbitMQChannel, publishNotification };

