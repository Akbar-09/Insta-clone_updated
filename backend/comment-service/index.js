const express = require('express');
const cors = require('cors');
const { connectRabbitMQ } = require('./config/rabbitmq');
const sequelize = require('./config/database');
const commentRoutes = require('./routes/commentRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5006;

app.use(cors());
app.use(express.json());

// Routes
app.use('/', commentRoutes);

const internalRoutes = require('./routes/internalRoutes');
app.use('/internal', internalRoutes);


const startServer = async () => {
    try {
        // Explicitly load models to ensure sync works
        const Comment = require('./models/Comment');
        const CommentLike = require('./models/CommentLikes');

        await sequelize.sync({ alter: true });

        // Fix potential NULL likesCount for existing comments
        await Comment.update({ likesCount: 0 }, { where: { likesCount: null } });

        await connectRabbitMQ();
        app.listen(PORT, () => {
            console.log(`Comment Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start Comment Service:', error);
    }
};

startServer();
