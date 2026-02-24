require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectRabbitMQ: connectRabbitManager } = require('./config/rabbitmq');
const { connectRabbitMQ: startMessageConsumer } = require('./services/messageConsumer');
const sequelize = require('./config/database');
const messageRoutes = require('./routes/messageRoutes');


const app = express();
const PORT = process.env.PORT || 5010;

app.use(cors());
app.use(express.json());

// Routes
// Routes
const internalRoutes = require('./routes/internalRoutes');
app.use('/internal', internalRoutes);
app.use('/', messageRoutes);



const startServer = async () => {
    try {
        await sequelize.sync({ alter: true });
        await connectRabbitManager();
        await startMessageConsumer();
        app.listen(PORT, () => {
            console.log(`Message Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start Message Service:', error);
    }
};

startServer();
