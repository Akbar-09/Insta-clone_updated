// Post Service Entry Point
const express = require('express');
const cors = require('cors');
const { connectRabbitMQ: connectRabbitPublisher } = require('./config/rabbitmq');
const { connectRabbitMQ: connectRabbitConsumer } = require('./services/postConsumer');
const sequelize = require('./config/database');
const postRoutes = require('./routes/postRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());

// Routes
const internalRoutes = require('./routes/internalRoutes');
const reportInternalRoutes = require('./routes/reportInternalRoutes');

// Use internal routes first
app.use('/internal', internalRoutes);
app.use('/internal', reportInternalRoutes);

// Main post routes
app.use('/', postRoutes);

const startServer = async () => {
    try {
        // Initialize models
        const Post = require('./models/Post');
        const Report = require('./models/Report');
        require('./models/SavedPost');

        // Set up associations
        Report.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
        Post.hasMany(Report, { foreignKey: 'postId', as: 'reports' });

        await sequelize.sync({ alter: true });
        await connectRabbitPublisher();
        await connectRabbitConsumer();
        app.listen(PORT, () => {
            console.log(`Post Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start Post Service:', error);
    }
};

startServer();