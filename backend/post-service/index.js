const express = require('express');
const cors = require('cors');
const { connectRabbitMQ } = require('./config/rabbitmq');
const sequelize = require('./config/database');
const postRoutes = require('./routes/postRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());

// Routes
app.use('/', postRoutes);

const startServer = async () => {
    try {
        // Initialize models
        require('./models/SavedPost');
        await sequelize.sync({ alter: true });
        await connectRabbitMQ();
        app.listen(PORT, () => {
            console.log(`Post Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start Post Service:', error);
    }
};

startServer();
