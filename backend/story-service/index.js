const express = require('express');
const cors = require('cors');
const { connectRabbitMQ } = require('./config/rabbitmq');
const sequelize = require('./config/database');
const storyRoutes = require('./routes/storyRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors());
app.use(express.json());

// Routes
app.use('/', storyRoutes);

const startServer = async () => {
    try {
        await sequelize.sync();
        await connectRabbitMQ();
        app.listen(PORT, () => {
            console.log(`Story Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start Story Service:', error);
    }
};

startServer();
