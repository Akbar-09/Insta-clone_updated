require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectRabbitMQ: connectRabbitManager } = require('./config/rabbitmq');
const { connectRabbitMQ: startStoryConsumer } = require('./services/storyConsumer');
const sequelize = require('./config/database');
const storyRoutes = require('./routes/storyRoutes');
const highlightRoutes = require('./routes/highlightRoutes');

// Import models to ensure they're registered
const Story = require('./models/Story');
const StoryView = require('./models/StoryView');
const StoryReport = require('./models/StoryReport');
const Highlight = require('./models/Highlight');
const HighlightStory = require('./models/HighlightStory');



// Global error handlers to prevent crashes from unhandled library errors
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception thrown:', err);
});


const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors());
app.use(express.json());

// Routes
app.use('/', storyRoutes);
app.use('/', highlightRoutes);

const internalRoutes = require('./routes/internalRoutes');
app.use('/internal', internalRoutes);

// Background task to clean up expired stories (runs every hour)
const { Op } = require('sequelize');
const { publishEvent } = require('./config/rabbitmq');

const cleanupExpiredStories = async () => {
    try {
        console.log('[StoryService] Running expiration cleanup...');
        const expiredStories = await Story.findAll({
            where: {
                expiresAt: { [Op.lt]: new Date() },
                // Optional: only if not in highlights? 
                // For now, let's assume if it expires and it's not archived, we can clean up media
            }
        });

        for (const story of expiredStories) {
            // Check if it's in a highlight
            const inHighlight = await HighlightStory.findOne({ where: { storyId: story.id } });
            if (!inHighlight) {
                console.log(`[StoryService] Story ${story.id} expired and not in highlight. Cleaning up media...`);
                await publishEvent('STORY_DELETED', {
                    storyId: story.id,
                    userId: story.userId,
                    mediaUrl: story.mediaUrl
                });
                // We keep the DB record but media will be gone, or we delete DB record too?
                // User said "A story expires" -> delete media.
                // await story.destroy(); 
            }
        }
    } catch (err) {
        console.error('Cleanup Expired Stories Error:', err);
    }
};

// Run every hour
setInterval(cleanupExpiredStories, 1000 * 60 * 60);
// Also run on start after a delay
setTimeout(cleanupExpiredStories, 10000);

const startServer = async () => {
    try {
        await sequelize.sync({ alter: true });
        await connectRabbitManager();
        await startStoryConsumer();
        app.listen(PORT, () => {
            console.log(`Story Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start Story Service:', error);
    }
};

startServer();
