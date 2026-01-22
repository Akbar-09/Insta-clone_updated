const express = require('express');
const cors = require('cors');
const { connectRabbitMQ } = require('./services/notificationConsumer');
const sequelize = require('./config/database');
const notificationRoutes = require('./routes/notificationRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5008;

app.use(cors());
app.use(express.json());

// Routes
app.use('/', notificationRoutes);

const startServer = async () => {
    try {
        await sequelize.sync({ alter: true });
        await connectRabbitMQ();
        app.listen(PORT, () => {
            console.log(`Notification Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start Notification Service:', error);
    }
};

startServer();
