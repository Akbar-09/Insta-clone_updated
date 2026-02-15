const express = require('express');
const cors = require('cors');
const path = require('path');
const mediaRoutes = require('./routes/mediaRoutes');
const sequelize = require('./config/database');
const Media = require('./models/Media');
const { connectRabbitMQ: startMediaConsumer } = require('./services/mediaConsumer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5013;

// Start Consumer
startMediaConsumer();

app.use(cors());
app.use(express.json());

// Serve static files
app.use('/uploads', (req, res, next) => {
    res.header("Cross-Origin-Resource-Policy", "cross-origin");
    res.header("Access-Control-Allow-Origin", "*");
    next();
}, express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/', mediaRoutes);

// Sync DB and Start Server
sequelize.sync({ alter: true }) // Using alter to update schema if needed
    .then(() => {
        console.log('Database connected and models synced');
        app.listen(PORT, () => {
            console.log(`Media Service running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to database:', err);
    });
