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
        // Retry logic could be added here
        setTimeout(connectRabbitMQ, 5000);
    }
};

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

module.exports = { connectRabbitMQ, publishEvent };
