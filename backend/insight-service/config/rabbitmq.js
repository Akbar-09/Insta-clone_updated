const amqp = require('amqplib');
require('dotenv').config();

let channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672');
        channel = await connection.createChannel();
        await channel.assertExchange('instagram-events', 'topic', { durable: true });
        console.log('Insight Service: Connected to RabbitMQ');
        return channel;
    } catch (error) {
        console.error('Insight Service: RabbitMQ Connection Failed', error);
        setTimeout(connectRabbitMQ, 5000);
    }
};

const getChannel = () => channel;

module.exports = { connectRabbitMQ, getChannel };
