const io = require('socket.io-client');
const jwt = require('jsonwebtoken');
const amqp = require('amqplib');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const PORT = process.env.PORT || 5011;
const RABBITMQ_URI = process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672';

// 1. Generate Token for User 1
const user1 = { id: 1, username: 'user1' };
const token = jwt.sign(user1, JWT_SECRET, { expiresIn: '1h' });

async function verify() {
    console.log('Starting verification...');

    // 2. Connect Socket Client
    const socket = io(`http://localhost:${PORT}`, {
        query: { token },
        transports: ['websocket'],
        reconnection: false
    });

    const completionTimeout = setTimeout(() => {
        console.error('FAILURE: Timeout waiting for event.');
        socket.disconnect();
        process.exit(1);
    }, 10000);

    socket.on('connect', async () => {
        console.log('SUCCESS: Socket connected.');

        // Join the room for user 1
        socket.emit('join', 1);
        console.log('Joined user:1 room.');

        // 3. Publish RabbitMQ Event to trigger socket emission
        try {
            const connection = await amqp.connect(RABBITMQ_URI);
            const channel = await connection.createChannel();
            const exchange = 'instagram-events';

            await channel.assertExchange(exchange, 'topic', { durable: true });

            const messagePayload = {
                message: {
                    id: 999,
                    senderId: 2,
                    content: 'Socket Verification Message',
                    createdAt: new Date()
                },
                receiverId: 1 // Match the field used in socketConsumer.js
            };

            // Wrap in the format handleEvent expects if not using routing key purely, 
            // but here type is passed as routing key.
            channel.publish(exchange, 'MESSAGE_SENT', Buffer.from(JSON.stringify(messagePayload)));
            console.log('Published MESSAGE_SENT event to RabbitMQ');

            setTimeout(async () => {
                await channel.close();
                await connection.close();
            }, 1000);

        } catch (error) {
            console.error('RabbitMQ Error:', error);
            process.exit(1);
        }
    });

    socket.on('connect_error', (err) => {
        console.error('Socket Connection Error:', err.message);
        process.exit(1);
    });

    // Match the event name emitted by socketConsumer.js
    socket.on('message:receive', (data) => {
        console.log('Received message:receive event:', data);
        if (data.id === 999 && data.content === 'Socket Verification Message') {
            console.log('SUCCESS: Received expected message via socket.');
            clearTimeout(completionTimeout);
            socket.disconnect();
            process.exit(0);
        }
    });
}

verify();

