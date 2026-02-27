const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/db');
const models = require('./src/models');
const liveRoutes = require('./src/routes/liveRoutes');
const { connectRabbitMQ } = require('./src/config/rabbitmq');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5015;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.send({ status: 'OK', service: 'Live Service (LiveKit)', v: 17 }));

app.use('/', liveRoutes);

app.use((req, res) => {
    console.log(`[API 404] ${req.method} ${req.url}`);
    res.status(404).json({ status: 'error', message: 'Route not found' });
});

const startServer = async () => {
    try {
        // Warning: alter: true might recreate tables with strict constraints if changed
        await sequelize.sync({ alter: true });
        console.log('Database synced');

        await connectRabbitMQ();

        app.listen(PORT, () => {
            console.log(`Live Service API running on port ${PORT} with LiveKit integration`);
        });
    } catch (error) {
        console.error('Failed to start Live Service:', error);
    }
};

startServer();
