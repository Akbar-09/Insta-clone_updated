const express = require('express');
const cors = require('cors');
const { connectRedis } = require('./config/redis');
const { connectRabbitMQ } = require('./services/feedConsumer');
const feedRoutes = require('./routes/feedRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5007;

app.use(cors());
app.use(express.json());

app.use('/', feedRoutes);

const startServer = async () => {
    try {
        await connectRedis();
        await connectRabbitMQ();
        app.listen(PORT, () => {
            console.log(`Feed Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start Feed Service:', error);
    }
};

startServer();
