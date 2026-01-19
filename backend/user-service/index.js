const express = require('express');
const cors = require('cors');
const { connectRabbitMQ } = require('./config/rabbitmq');
const sequelize = require('./config/database');
const UserProfile = require('./models/UserProfile');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

const { publishEvent } = require('./config/rabbitmq');

// Basic Route to get profile
app.get('/:username', async (req, res) => {
    try {
        const user = await UserProfile.findOne({ where: { username: req.params.username } });
        if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });
        res.json({ status: 'success', data: user });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// Get User by ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await UserProfile.findOne({ where: { userId: req.params.id } });
        if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });
        res.json({ status: 'success', data: user });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// Update Profile
app.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        // In a real app, verify req.headers['x-user-id'] === userId or similar

        const { fullName, bio, website, gender, showAccountSuggestions, isPrivate, username } = req.body;

        const user = await UserProfile.findOne({ where: { userId } });
        if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

        // Update fields if provided
        if (fullName !== undefined) user.fullName = fullName;
        if (bio !== undefined) user.bio = bio;
        if (website !== undefined) user.website = website;
        if (gender !== undefined) user.gender = gender;
        if (showAccountSuggestions !== undefined) user.showAccountSuggestions = showAccountSuggestions;
        if (isPrivate !== undefined) user.isPrivate = isPrivate;

        // Handle username update carefully (uniqueness check)
        if (username && username !== user.username) {
            const existing = await UserProfile.findOne({ where: { username } });
            if (existing) return res.status(400).json({ status: 'error', message: 'Username already taken' });
            user.username = username;
        }

        await user.save();
        res.json({ status: 'success', data: user, message: 'Profile updated successfully' });

    } catch (err) {
        console.error('Update Profile Error:', err);
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// Follow User
app.post('/users/:id/follow', async (req, res) => {
    try {
        const targetUserId = req.params.id;
        const { currentUserId } = req.body;

        if (!currentUserId) return res.status(400).json({ status: 'error', message: 'currentUserId body param required' });

        const targetUser = await UserProfile.findOne({ where: { userId: targetUserId } });
        if (!targetUser) return res.status(404).json({ status: 'error', message: 'User not found' });

        await targetUser.increment('followersCount');

        await publishEvent('USER_FOLLOWED', {
            followerId: currentUserId,
            followedId: targetUserId,
            timestamp: new Date()
        });

        res.json({ status: 'success', message: 'User followed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
});

const startServer = async () => {
    try {
        await sequelize.sync({ alter: true });
        await connectRabbitMQ();
        app.listen(PORT, () => {
            console.log(`User Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start User Service:', error);
    }
};

startServer();
