const express = require('express');
const cors = require('cors');
const { connectRabbitMQ } = require('./config/rabbitmq');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[AuthSvc] ${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/', authRoutes);

// Start
const startServer = async () => {
    try {
        await sequelize.sync(); // Auto-create tables for now
        await connectRabbitMQ();
        app.listen(PORT, () => {
            console.log(`Auth Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();
