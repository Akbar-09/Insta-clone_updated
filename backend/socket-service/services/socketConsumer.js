const amqp = require('amqplib');
const { getIO } = require('./socketManager'); // Need to export getIO or pass it

let channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');

        // Prevent process crash on connection errors (like heartbeat timeouts)
        connection.on('error', (err) => {
            console.error('[RabbitMQ] Connection error:', err.message);
        });

        connection.on('close', () => {
            console.error('[RabbitMQ] Connection closed. Reconnecting in 5s...');
            setTimeout(connectRabbitMQ, 5000);
        });

        channel = await connection.createChannel();

        channel.on('error', (err) => {
            console.error('[RabbitMQ] Channel error:', err.message);
        });

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

                    if ((!type || type === 'socket_events' || type === '') && content.type) {
                        type = content.type;
                    }

                    console.log(`[SocketConsumer] Received event: type=${type}`, content);
                    handleEvent({ type, payload: content.payload || content });
                    channel.ack(msg);
                } catch (error) {
                    console.error('Error processing msg:', error);
                    channel.nack(msg, false, false);
                }
            }
        });
    } catch (error) {
        console.error('RabbitMQ connect error:', error.message);
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
            io.to(`user:${payload.seenBy}`).emit('message:seen', payload);
            break;
        case 'LIVE_COMMENT':
        case 'LIVE_CHAT_MESSAGE':
            // payload: { sessionId/streamId, comment/message }
            const streamId = payload.streamId || payload.sessionId;
            const chatMsg = payload.message || payload.comment;
            io.to(`live:${streamId}`).emit('receive-comment', chatMsg);
            break;
        case 'LIVE_STREAM_STATUS':
            if (payload.status === 'ENDED') {
                io.to(`live_stream_${payload.streamId}`).emit('stream_ended');
            }
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
