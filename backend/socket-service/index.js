const express = require('express');
const http = require('http');
const { initSocket } = require('./services/socketManager');
const { connectRabbitMQ } = require('./services/socketConsumer');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5011;

// Initialize Socket.io
initSocket(server);

// Initialize RabbitMQ Consumer
connectRabbitMQ();

server.listen(PORT, () => {
    console.log(`Socket Service running on port ${PORT}`);
});
