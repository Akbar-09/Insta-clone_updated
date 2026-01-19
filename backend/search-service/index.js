const express = require('express');
const cors = require('cors');
const { connectRabbitMQ } = require('./services/searchConsumer');
const sequelize = require('./config/database');
const searchRoutes = require('./routes/searchRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5009;

app.use(cors());
app.use(express.json());

// Routes
app.use('/', searchRoutes);

const startServer = async () => {
    try {
        await sequelize.sync();
        await connectRabbitMQ();
        app.listen(PORT, () => {
            console.log(`Search Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start Search Service:', error);
    }
};

startServer();
