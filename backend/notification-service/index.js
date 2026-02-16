const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const notificationRoutes = require('./notifications/notification.routes');
const { startWorker } = require('./notifications/notification.worker');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5008;

app.use(cors());
app.use(express.json());

// Routes
app.use('/', notificationRoutes);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');

        await sequelize.sync({ alter: true });
        console.log('Models synced...');

        // Start the worker
        startWorker();

        app.listen(PORT, () => {
            console.log(`Notification Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start Notification Service:', error);
    }
};

startServer();

