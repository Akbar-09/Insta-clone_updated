const express = require('express');
const cors = require('cors');
const path = require('path');
const mediaRoutes = require('./routes/mediaRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5013;

app.use(cors());
app.use(express.json());

// Serve static files
// Serve static files
app.use('/uploads', (req, res, next) => {
    res.header("Cross-Origin-Resource-Policy", "cross-origin");
    res.header("Access-Control-Allow-Origin", "*");
    next();
}, express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/', mediaRoutes);

app.listen(PORT, () => {
    console.log(`Media Service running on port ${PORT}`);
});
