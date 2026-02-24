require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const callRoutes = require('./webrtc/call.routes');


const app = express();
const PORT = process.env.PORT || 5018;

app.use(cors());
app.use(express.json());

// Routes
app.use('/', callRoutes);

const startServer = async () => {
    try {
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Call Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start Call Service:', error);
    }
};

startServer();
