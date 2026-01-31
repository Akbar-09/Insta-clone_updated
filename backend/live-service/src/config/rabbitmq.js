const amqp = require('amqplib');

let channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672');
        channel = await connection.createChannel();
        const exchange = 'instagram-events';

        await channel.assertExchange(exchange, 'topic', { durable: true });
        console.log('Connected to RabbitMQ');

        // We can add consumers here if needed
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
