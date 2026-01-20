const amqp = require('amqplib');
const { getIO } = require('./socketManager'); // Need to export getIO or pass it

let channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
        channel = await connection.createChannel();
        await channel.assertQueue('socket_events');

        console.log('Socket Service connected to RabbitMQ');

        channel.consume('socket_events', (data) => {
            if (data) {
                const event = JSON.parse(data.content.toString());
                handleEvent(event);
                channel.ack(data);
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

    switch (event.type) {
        case 'MESSAGE_SENT':
            // payload: { message, receiverId }
            // Emit to receiver's room
            io.to(`user:${event.payload.receiverId}`).emit('message:receive', event.payload.message);
            // Optionally emit to sender for confirmation if not optimistic
            break;
        case 'MESSAGES_SEEN':
            // payload: { conversationId, seenBy, receiverId }
            io.to(`user:${event.payload.receiverId}`).emit('message:seen', event.payload);
            break;
        default:
            console.warn('Unknown event type:', event.type);
    }
};

module.exports = { connectRabbitMQ };
