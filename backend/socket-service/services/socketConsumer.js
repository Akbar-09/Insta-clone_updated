const amqp = require('amqplib');
const { emitToUser } = require('./socketManager');

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672');
        const channel = await connection.createChannel();
        const exchange = 'instagram-events';

        await channel.assertExchange(exchange, 'topic', { durable: true });

        const q = await channel.assertQueue('socket-service-queue', { durable: true });

        await channel.bindQueue(q.queue, exchange, 'MESSAGE_SENT');
        await channel.bindQueue(q.queue, exchange, 'NOTIFICATION_NEW'); // Needed if Notification Service emits this
        // We can also bind to COMMENT_ADDED and construct a notification here if Notification Service doesn't emit one
        // For now, let's assume we want to push DMs.

        console.log('Listening for Socket events...');

        channel.consume(q.queue, async (msg) => {
            if (msg.content) {
                const data = JSON.parse(msg.content.toString());
                const routingKey = msg.fields.routingKey;

                console.log(`Received ${routingKey} in Socket Service`);

                if (routingKey === 'MESSAGE_SENT') {
                    // Send to recipient
                    emitToUser(data.recipientId, 'new_message', data);
                }

                channel.ack(msg);
            }
        });

    } catch (error) {
        console.error('RabbitMQ Connection Failed', error);
    }
};

module.exports = { connectRabbitMQ };
