const express = require('express');
const cors = require('cors');
const { connectRabbitMQ } = require('./config/rabbitmq');
const sequelize = require('./config/database');
const storyRoutes = require('./routes/storyRoutes');
const highlightRoutes = require('./routes/highlightRoutes');

// Import models to ensure they're registered
const Story = require('./models/Story');
const StoryView = require('./models/StoryView');
const StoryReport = require('./models/StoryReport');
const Highlight = require('./models/Highlight');
const HighlightStory = require('./models/HighlightStory');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors());
app.use(express.json());

// Routes
app.use('/', storyRoutes);
app.use('/', highlightRoutes);

const internalRoutes = require('./routes/internalRoutes');
app.use('/internal', internalRoutes);

const startServer = async () => {
    try {
        await sequelize.sync({ alter: true });
        await connectRabbitMQ();
        app.listen(PORT, () => {
            console.log(`Story Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start Story Service:', error);
    }
};

startServer();
