const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const adRoutes = require('./routes/adRoutes');

const app = express();
const PORT = process.env.PORT || 5014;

app.use(cors());
app.use(express.json());

// Routes
app.use('/', adRoutes);

// Sync DB
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Ad Database synced');
        app.listen(PORT, () => {
            console.log(`Ad Service running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to sync Ad Database:', err);
    });
