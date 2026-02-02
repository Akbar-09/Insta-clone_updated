const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const adRoutes = require('./routes/adRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5014;

app.use(cors());
app.use(express.json());

// Routes
app.use('/', adRoutes);

const startServer = async () => {
    try {
        // Initialize models and sync
        require('./models/Ad');
        require('./models/AdImpression');
        require('./models/AdClick');

        await sequelize.sync({ alter: true });
        console.log('Ad Service: Database connected and synced.');

        app.listen(PORT, () => {
            console.log(`Ad Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start Ad Service:', error);
    }
};

startServer();
