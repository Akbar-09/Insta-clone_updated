const amqp = require('amqplib');

let channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672');

        connection.on('error', (err) => {
            console.error('[RabbitMQ Config] Connection error:', err.message);
        });

        connection.on('close', () => {
            console.error('[RabbitMQ Config] Connection closed. Reconnecting in 5s...');
            setTimeout(connectRabbitMQ, 5000);
        });

        channel = await connection.createChannel();

        channel.on('error', (err) => {
            console.error('[RabbitMQ Config] Channel error:', err.message);
        });

        await channel.assertExchange('instagram-events', 'topic', { durable: true });
        console.log('Connected to RabbitMQ');
    } catch (error) {
        console.error('RabbitMQ Connection Failed', error.message);
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
