const amqp = require('amqplib');
const { getIO } = require('./socketManager'); // Need to export getIO or pass it

let channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
        const exchange = 'instagram-events';
        await channel.assertExchange(exchange, 'topic', { durable: true });
        const q = await channel.assertQueue('socket_events');
        await channel.bindQueue(q.queue, exchange, '#'); // Receive all events

        console.log('Socket Service connected to RabbitMQ');

        channel.consume('socket_events', (msg) => {
            if (msg) {
                const content = JSON.parse(msg.content.toString());
                const type = msg.fields.routingKey;
                handleEvent({ type, payload: content });
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('RabbitMQ connect error:', error);
        setTimeout(connectRabbitMQ, 5000);
    }
};

const handleEvent = (event) => {
    const io = getIO();
    if (!io) return;

    // Check if event wraps data inside 'data' or 'payload'
    const payload = event.payload || event.data || event;

    switch (event.type) {
        case 'MESSAGE_SENT':
            io.to(`user:${payload.receiverId}`).emit('message:receive', payload.message);
            break;
        case 'MESSAGES_SEEN':
            io.to(`user:${payload.receiverId}`).emit('message:seen', payload);
            break;
        case 'LIVE_COMMENT':
            // payload: { sessionId, comment }
            io.to(`live:${payload.sessionId}`).emit('receive-comment', payload.comment);
            break;
        default:
            // console.warn('Unknown event type:', event.type);
            break;
    }
};

module.exports = { connectRabbitMQ };
