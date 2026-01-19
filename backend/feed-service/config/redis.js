const { createClient } = require('redis');
require('dotenv').config();

const client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

client.on('error', (err) => console.log('Redis Client Error', err));

const connectRedis = async () => {
    await client.connect();
    console.log('Connected to Redis');
};

module.exports = { client, connectRedis };
