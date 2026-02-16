const amqp = require('amqplib');

let channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672');
        channel = await connection.createChannel();
        await channel.assertQueue('notification_queue', { durable: true });
        console.log('Notification Publisher connected to RabbitMQ');
    } catch (error) {
        console.error('RabbitMQ Publisher Connection Error:', error);
    }
};

const publishNotification = async (notification) => {
    if (!channel) {
        await connectRabbitMQ();
    }

    try {
        channel.sendToQueue('notification_queue', Buffer.from(JSON.stringify(notification)), {
            persistent: true,
        });
        console.log('Notification published to queue:', notification.type);
    } catch (error) {
        console.error('Failed to publish notification:', error);
    }
};

module.exports = { publishNotification };
