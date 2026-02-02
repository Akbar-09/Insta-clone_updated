const amqp = require('amqplib');

let channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
        channel = await connection.createChannel();
        console.log('Admin Service: Connected to RabbitMQ');
    } catch (error) {
        console.error('RabbitMQ Connection Error:', error);
    }
};

const publishEvent = async (pattern, data) => {
    if (!channel) return;
    try {
        await channel.assertExchange('instagram_events', 'topic', { durable: true });
        channel.publish('instagram_events', pattern, Buffer.from(JSON.stringify(data)));
        console.log(`Event Published: ${pattern}`);
    } catch (error) {
        console.error('Error publishing event:', error);
    }
};

module.exports = { connectRabbitMQ, publishEvent };
