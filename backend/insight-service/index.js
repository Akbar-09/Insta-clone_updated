require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const { connectRabbitMQ } = require('./config/rabbitmq');
const { startConsumers } = require('./consumers/insightConsumer');


const app = express();
const PORT = process.env.PORT || 5017;

app.use(cors());
app.use(express.json());

// Routes
const insightRoutes = require('./routes/insightRoutes');
app.use('/', insightRoutes);

const startServer = async () => {
    try {
        // Sync database (Professional Dashboard requires these tables)
        await sequelize.sync({ alter: true });
        console.log('Insight Service: Database synced.');

        // Connect RabbitMQ and start consumers
        await connectRabbitMQ();
        await startConsumers();

        app.listen(PORT, () => {
            console.log(`Insight Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start Insight Service:', error);
    }
};

startServer();
