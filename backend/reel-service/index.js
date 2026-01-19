const express = require('express');
const cors = require('cors');
const { connectRabbitMQ } = require('./config/rabbitmq');
const sequelize = require('./config/database');
const reelRoutes = require('./routes/reelRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());

// Routes
app.use('/', reelRoutes);

const startServer = async () => {
    try {
        await sequelize.sync();
        await connectRabbitMQ();
        app.listen(PORT, () => {
            console.log(`Reel Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start Reel Service:', error);
    }
};

startServer();
