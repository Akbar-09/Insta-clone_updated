require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mediaRoutes = require('./routes/mediaRoutes');
const sequelize = require('./config/database');
const Media = require('./models/Media');
const { connectRabbitMQ: startMediaConsumer } = require('./services/mediaConsumer');

const app = express();
const PORT = process.env.PORT || 5013;

// Start Consumer
startMediaConsumer();

app.use(cors());
app.use(express.json());

const { serveFile } = require('./controllers/mediaR2Controller');

// Serve static files - with R2 fallback for migrated files
app.use('/uploads', (req, res, next) => {
    res.header("Cross-Origin-Resource-Policy", "cross-origin");
    res.header("Access-Control-Allow-Origin", "*");
    next();
}, express.static(path.join(__dirname, 'uploads')), (req, res, next) => {
    // Local file not found - delegate to R2 serveFile using the filename
    // Fake req.params[0] to be just the filename so serveFile can pattern-match in R2
    const filename = path.basename(req.path);
    req.params = { 0: filename };
    console.log(`[Uploads Fallback] Local file not found, trying R2 for: ${filename}`);
    serveFile(req, res, next);
});

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
