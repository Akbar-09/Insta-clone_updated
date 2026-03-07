const UserProfile = require('../models/UserProfile');
const Interest = require('../models/Interest');
const UserInterest = require('../models/UserInterest');
const UserOnboardingEvent = require('../models/UserOnboardingEvent');
const { Op } = require('sequelize');
const { publishEvent } = require('../config/rabbitmq');

exports.updateOnboardingProfile = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.body.userId;
        const {
            fullName,
            birthDate,
            isBirthdatePublic,
            notificationsEnabled,
            onboardingStep,
            onboardingCompleted,
            username
        } = req.body;

        let user = await UserProfile.findOne({ where: { userId } });
        if (!user) {
            // Create profile dynamically to handle any RabbitMQ API sync delays during initial signup
            const headUsername = req.headers['x-user-username'];
            user = await UserProfile.create({
                userId,
                username: username || headUsername || `user_${userId}`,
                fullName: fullName || headUsername || 'New User',
                onboardingStep: 1,
                onboardingCompleted: false
            });
        }

        if (fullName !== undefined) user.fullName = fullName;
        if (birthDate !== undefined) user.birthDate = birthDate;
        if (isBirthdatePublic !== undefined) user.isBirthdatePublic = isBirthdatePublic;
        if (notificationsEnabled !== undefined) user.notificationsEnabled = notificationsEnabled;
        if (onboardingStep !== undefined) user.onboardingStep = onboardingStep;
        if (onboardingCompleted !== undefined) user.onboardingCompleted = onboardingCompleted;
        if (username !== undefined) {
            const existing = await UserProfile.findOne({ where: { username } });
            if (existing && existing.userId !== user.userId) return res.status(400).json({ status: 'error', message: 'Username already taken' });
            user.username = username;
        }

        await user.save();
        res.json({ status: 'success', data: user });
    } catch (error) {
        console.error('Update Onboarding Profile Error:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getInterests = async (req, res) => {
    try {
        let interests = await Interest.findAll();
        // Seed some if empty
        if (interests.length === 0) {
            const seed = [
                { name: 'Fashion' }, { name: 'Travel' }, { name: 'Fitness' },
                { name: 'Music' }, { name: 'Food' }, { name: 'Art' },
                { name: 'Gaming' }, { name: 'Technology' }, { name: 'Photography' }
            ];
            await Interest.bulkCreate(seed);
            interests = await Interest.findAll();
        }
        res.json({ status: 'success', data: interests });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.saveUserInterests = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.body.userId;
        const { interestIds } = req.body; // array of IDs

        if (!Array.isArray(interestIds) || interestIds.length < 3 || interestIds.length > 10) {
            return res.status(400).json({ status: 'error', message: 'Select between 3 and 10 interests' });
        }

        await UserInterest.destroy({ where: { userId } });

        const inserts = interestIds.map(id => ({ userId, interestId: id }));
        await UserInterest.bulkCreate(inserts);

        res.json({ status: 'success', message: 'Interests saved' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getOnboardingSuggestions = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.query.userId;

        // 1. Get user interests
        const userInterests = await UserInterest.findAll({ where: { userId } });
        const interestIds = userInterests.map(ui => ui.interestId);

        // 2. Fetch users who have same interests
        let matchedUserIds = [];
        if (interestIds.length > 0) {
            const similarInterests = await UserInterest.findAll({
                where: { 
                    interestId: { [Op.in]: interestIds },
                    userId: { [Op.ne]: userId }
                },
                limit: 100
            });
            matchedUserIds = [...new Set(similarInterests.map(si => si.userId))];
        }

        // 3. Fetch followers of people user follows (if any)
        const Follow = require('../models/Follow');
        const following = await Follow.findAll({ where: { followerId: userId }, attributes: ['followingId'] });
        const followingIds = following.map(f => f.followingId);

        let friendOfFriendIds = [];
        if (followingIds.length > 0) {
            const fof = await Follow.findAll({
                where: { 
                    followerId: { [Op.in]: followingIds },
                    followingId: { [Op.notIn]: [...followingIds, userId] }
                },
                limit: 50
            });
            friendOfFriendIds = [...new Set(fof.map(f => f.followingId))];
        }

        // 4. Combine and fetch profiles
        const suggestionPool = [...new Set([...matchedUserIds, ...friendOfFriendIds])];

        let profiles;
        if (suggestionPool.length > 0) {
            profiles = await UserProfile.findAll({
                where: { 
                    userId: { [Op.in]: suggestionPool }
                },
                order: [['followersCount', 'DESC']],
                limit: 20
            });
        }

        // 5. Fill with popular users if not enough suggestions
        if (!profiles || profiles.length < 10) {
            const existingIds = profiles ? profiles.map(p => p.userId) : [];
            const popular = await UserProfile.findAll({
                where: {
                    userId: { [Op.notIn]: [...existingIds, userId] },
                    accountStatus: 'active'
                },
                order: [['followersCount', 'DESC']],
                limit: 20 - existingIds.length
            });
            profiles = [...(profiles || []), ...popular];
        }

        res.json({ status: 'success', data: profiles });
    } catch (error) {
        console.error('getOnboardingSuggestions error:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.saveOnboardingEvent = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.body.userId;
        const { eventType } = req.body;

        await UserOnboardingEvent.create({ userId, eventType });

        // Trigger RabbitMQ to schedule progressive profiling nudges
        if (eventType === 'completed_onboarding') {
            await publishEvent('ONBOARDING_COMPLETED', { userId });
            await publishEvent('SCHEDULE_PROGRESSIVE_PROFILING', { userId });
        }

        res.json({ status: 'success', message: 'Event saved' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
