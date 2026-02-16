const express = require('express');
const cors = require('cors');
const { connectRabbitMQ: connectRabbitPublisher } = require('./config/rabbitmq');
const { connectRabbitMQ: connectRabbitConsumer } = require('./services/reelConsumer');
const sequelize = require('./config/database');
const reelRoutes = require('./routes/reelRoutes');
require('./models/ReelReport'); // Ensure ReelReport is synced
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());

// Routes
app.use('/', reelRoutes);

const internalRoutes = require('./routes/internalRoutes');
app.use('/internal', internalRoutes);

const startServer = async () => {
    try {
        await sequelize.sync({ alter: true });
        await connectRabbitPublisher();
        await connectRabbitConsumer();
        app.listen(PORT, () => {
            console.log(`Reel Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start Reel Service:', error);
    }
};

startServer();
