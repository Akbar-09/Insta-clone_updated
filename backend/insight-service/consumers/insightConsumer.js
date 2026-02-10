const { getChannel } = require('../config/rabbitmq');
const ContentMetric = require('../models/ContentMetric');
const AccountMetric = require('../models/AccountMetric');
const Impression = require('../models/Impression');
const Interaction = require('../models/Interaction');
const sequelize = require('../config/database');
const { Op } = require('sequelize');

const startConsumers = async () => {
    const channel = getChannel();
    const queue = 'insight-service-queue';

    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, 'instagram-events', '#'); // Listen to all events

    channel.consume(queue, async (msg) => {
        if (!msg) return;

        const routingKey = msg.fields.routingKey;
        const data = JSON.parse(msg.content.toString());
        const today = new Date().toISOString().split('T')[0];

        try {
            switch (routingKey) {
                case 'POST_LIKED':
                    await handleInteraction(data.postOwnerId, data.postId, 'POST', data.userId, 'LIKE');
                    break;
                case 'POST_UNLIKED':
                    // Optional: decrement if needed, but analytics usually track unique engagers
                    break;
                case 'COMMENT_ADDED':
                    // We need postOwnerId here. If not in data, we might need to fetch it or ensure it's emitted.
                    // For now, assume it's there or we'll have to add it to the event.
                    if (data.postOwnerId || data.userId) {
                        await handleInteraction(data.postOwnerId || data.userId, data.postId || data.contentId, 'POST', data.userId, 'COMMENT');
                    }
                    break;
                case 'POST_VIEWED':
                case 'REEL_VIEWED':
                case 'STORY_VIEWED':
                case 'AD_VIEWED':
                    const type = routingKey.split('_')[0];
                    await handleImpression(data.ownerId, data.contentId, type, data.viewerId);
                    break;
                case 'PROFILE_VIEWED':
                    await handleProfileVisit(data.profileId, data.visitorId);
                    break;
                case 'USER_FOLLOWED':
                    await handleFollow(data.followedId, true);
                    break;
                case 'USER_UNFOLLOWED':
                    await handleFollow(data.followingId, false);
                    break;
            }
            channel.ack(msg);
        } catch (error) {
            console.error(`Error processing event ${routingKey}:`, error);
            // channel.nack(msg, false, false); // Don't requue on logic error
            channel.ack(msg);
        }
    });

    console.log('Insight Consumer started listening...');
};

async function handleImpression(ownerId, contentId, type, viewerId) {
    const today = new Date().toISOString().split('T')[0];

    // 1. Log Raw Impression for Reach calculation
    await Impression.create({
        userId: ownerId,
        contentId,
        contentType: type,
        viewerId,
        timestamp: new Date()
    });

    // 2. Update Daily Content Aggregates
    const [metric] = await ContentMetric.findOrCreate({
        where: { contentId, date: today },
        defaults: { userId: ownerId, contentType: type }
    });
    await metric.increment('views');

    // 3. Update Account Metrics
    const [account] = await AccountMetric.findOrCreate({
        where: { userId: ownerId, date: today }
    });
    // Total reach and other stats will be recalculated or incremented
    // For simplicity, we increment a raw views in account too if we want, 
    // but Instagram focused on Reach (Unique). 
    // We'll recalculate reach periodically or on-demand for accurate daily unique.
}

async function handleInteraction(ownerId, contentId, type, actorId, interactionType) {
    const today = new Date().toISOString().split('T')[0];

    // 1. Log Interaction
    await Interaction.create({
        userId: ownerId,
        contentId,
        contentType: type,
        actorId,
        type: interactionType,
        timestamp: new Date()
    });

    // 2. Update Content Metric
    const [metric] = await ContentMetric.findOrCreate({
        where: { contentId, date: today },
        defaults: { userId: ownerId, contentType: type }
    });

    const field = interactionType.toLowerCase() + 's'; // likes, comments, etc.
    if (metric[field] !== undefined) {
        await metric.increment(field);
    }

    // 3. Update Account Metric
    const [account] = await AccountMetric.findOrCreate({
        where: { userId: ownerId, date: today }
    });
    await account.increment('totalEngaged');
}

async function handleProfileVisit(profileId, visitorId) {
    const today = new Date().toISOString().split('T')[0];
    const [account] = await AccountMetric.findOrCreate({
        where: { userId: profileId, date: today }
    });
    await account.increment('profileVisits');
}

async function handleFollow(userId, isGaining) {
    const today = new Date().toISOString().split('T')[0];
    const [account] = await AccountMetric.findOrCreate({
        where: { userId, date: today }
    });

    if (isGaining) {
        await account.increment('newFollowers');
    } else {
        await account.increment('lostFollowers');
    }
}

module.exports = { startConsumers };
