const express = require('express');
const cors = require('cors');
const { connectRabbitMQ } = require('./config/rabbitmq');
const sequelize = require('./config/database');
const messageRoutes = require('./routes/messageRoutes');
require('dotenv').config();

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
        await connectRabbitMQ();
        app.listen(PORT, () => {
            console.log(`Message Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start Message Service:', error);
    }
};

startServer();
