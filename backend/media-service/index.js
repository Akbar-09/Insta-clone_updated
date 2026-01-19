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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/', mediaRoutes);

app.listen(PORT, () => {
    console.log(`Media Service running on port ${PORT}`);
});
