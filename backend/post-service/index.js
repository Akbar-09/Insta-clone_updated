// Post Service Entry Point
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectRabbitMQ: connectRabbitPublisher } = require('./config/rabbitmq');
const { connectRabbitMQ: connectRabbitConsumer } = require('./services/postConsumer');
const sequelize = require('./config/database');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());

// Routes
const internalRoutes = require('./routes/internalRoutes');
const reportInternalRoutes = require('./routes/reportInternalRoutes');

// Use internal routes
app.use('/internal', reportInternalRoutes); // Reports first to avoid collision with /:postId
app.use('/internal', internalRoutes);

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

        await sequelize.sync();
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