const amqp = require('amqplib');
const { getIO } = require('./socketManager'); // Need to export getIO or pass it

let channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
        channel = await connection.createChannel();
        const exchange = 'instagram-events';
        await channel.assertExchange(exchange, 'topic', { durable: true });
        const q = await channel.assertQueue('socket_events');
        await channel.bindQueue(q.queue, exchange, '#'); // Receive all events

        console.log('Socket Service connected to RabbitMQ');

        channel.consume('socket_events', (msg) => {
            if (msg) {
                try {
                    const content = JSON.parse(msg.content.toString());
                    let type = msg.fields.routingKey;

                    // If routing key is not specific (e.g. just the queue name or empty),
                    // try to extract type from the message content itself
                    if ((!type || type === 'socket_events' || type === '') && content.type) {
                        type = content.type;
                    }

                    handleEvent({ type, payload: content.payload || content });
                    channel.ack(msg);
                } catch (error) {
                    console.error('Error processing msg:', error);
                    channel.nack(msg, false, false);
                }
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
        case 'LIVE_CHAT_MESSAGE':
            // payload: { sessionId/streamId, comment/message }
            const streamId = payload.streamId || payload.sessionId;
            const chatMsg = payload.message || payload.comment;
            io.to(`live:${streamId}`).emit('receive-comment', chatMsg);
            break;
        case 'LIVE_STREAM_STATUS':
            io.to(`live:${payload.streamId}`).emit('stream-status', payload.status);
            break;
        case 'new_notification':
            console.log(`Emitting new_notification to user:${payload.userId}`);
            io.to(`user:${payload.userId}`).emit('new_notification', payload.notification);
            break;
        default:

            // console.warn('Unknown event type:', event.type);
            break;
    }
};

module.exports = { connectRabbitMQ };
