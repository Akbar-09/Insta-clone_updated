const amqp = require('amqplib');
const User = require('../models/UserModel');

let channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672');
        channel = await connection.createChannel();
        await channel.assertExchange('instagram-events', 'topic', { durable: true });

        // Setup listener
        const q = await channel.assertQueue('auth-service-queue', { durable: true });
        await channel.bindQueue(q.queue, 'instagram-events', 'ACCOUNT_TYPE_CHANGED');

        console.log('Connected to RabbitMQ and listening...');

        channel.consume(q.queue, async (msg) => {
            if (msg.content) {
                const data = JSON.parse(msg.content.toString());
                const routingKey = msg.fields.routingKey;

                try {
                    if (routingKey === 'ACCOUNT_TYPE_CHANGED') {
                        const { userId, accountType } = data;
                        await User.update({ accountType }, { where: { id: userId } });
                        console.log(`AuthService: Synced accountType=${accountType} for user=${userId}`);
                    }
                } catch (err) {
                    console.error('AuthService event error:', err);
                }
                channel.ack(msg);
            }
        });
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
