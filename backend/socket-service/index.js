require('dotenv').config();
const express = require('express');
const http = require('http');
const { initSocket } = require('./services/socketManager');
const { connectRabbitMQ } = require('./services/socketConsumer');


// Global error handlers to prevent crashes from unhandled library errors
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception thrown:', err);
});


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
