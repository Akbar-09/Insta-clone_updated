const { getChannel } = require('../config/rabbitmq');
const AccountMetric = require('../models/AccountMetric');
const ContentMetric = require('../models/ContentMetric');
const Impression = require('../models/Impression');
const Interaction = require('../models/Interaction');
const FollowerActivity = require('../models/FollowerActivity');
const { Op } = require('sequelize');

const startConsumer = async () => {
    try {
        const channel = getChannel();
        if (!channel) {
            console.log('Insight Service: Waiting for RabbitMQ channel...');
            setTimeout(startConsumer, 5000);
            return;
        }

        const q = await channel.assertQueue('insight_service_queue', { durable: true });

        // Bind to patterns
        const patterns = [
            'POST_LIKED',
            'POST_CREATED',
            'POST_DELETED',
            'USER_FOLLOWED',
            'USER_UNFOLLOWED',
            'POST_VIEWED'
        ];

        for (const pattern of patterns) {
            await channel.bindQueue(q.queue, 'instagram-events', pattern);
        }

        console.log('Insight Service: Consumer started, listening for events');

        channel.consume(q.queue, async (msg) => {
            if (msg.content) {
                const routingKey = msg.fields.routingKey;
                const content = JSON.parse(msg.content.toString());

                try {
                    await processEvent(routingKey, content);
                    channel.ack(msg);
                } catch (err) {
                    console.error('Error processing insight event:', err);
                    channel.ack(msg); // Ack to avoid blocking
                }
            }
        });
    } catch (error) {
        console.error('Insight Consumer Error:', error);
        setTimeout(startConsumer, 5000);
    }
};

const processEvent = async (key, data) => {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];

    // Helper: Update AccountMetric for a user
    const incrementAccount = async (userId, field, value = 1) => {
        if (!userId) return;
        const [metric] = await AccountMetric.findOrCreate({
            where: { userId, date: dateStr },
            defaults: {
                userId,
                date: dateStr,
                totalReach: 0,
                totalEngaged: 0,
                profileVisits: 0,
                newFollowers: 0,
                lostFollowers: 0
            }
        });
        await metric.increment(field, { by: value });
    };

    try {
        switch (key) {
            case 'POST_LIKED':
                // data: { postId, userId (actor), postOwnerId, timestamp }
                if (data.postOwnerId) {
                    await incrementAccount(data.postOwnerId, 'totalEngaged', 1);

                    // Track Interaction (Unique per day?)
                    // Simplified: Just log interaction
                    // (Real logic would check if this user already engaged today to be unique)
                    await Interaction.create({
                        userId: data.postOwnerId,
                        actorId: data.userId,
                        contentId: data.postId,
                        contentType: 'POST',
                        type: 'LIKE',
                        timestamp: data.timestamp || new Date()
                    });

                    // Update Content Metric
                    let [cMetric] = await ContentMetric.findOrCreate({
                        where: { contentId: data.postId, date: dateStr },
                        defaults: { userId: data.postOwnerId, contentType: 'POST', date: dateStr }
                    });
                    await cMetric.increment('likes', { by: 1 });
                }
                break;

            case 'POST_CREATED':
                // Post created: Initialize ContentMetric
                await ContentMetric.create({
                    contentId: data.id,
                    contentType: 'POST',
                    userId: data.userId,
                    date: dateStr,
                    views: 0, likes: 0, comments: 0, shares: 0, saves: 0
                });
                break;

            case 'USER_FOLLOWED':
                // data: { followerId, followedId }
                await incrementAccount(data.followedId, 'newFollowers', 1);
                await FollowerActivity.create({
                    userId: data.followedId,
                    followerId: data.followerId,
                    type: 'FOLLOW',
                    timestamp: new Date()
                });
                break;

            case 'USER_UNFOLLOWED':
                await incrementAccount(data.followedId, 'lostFollowers', 1);
                break;

            case 'POST_VIEWED':
                // Assuming this event exists or will exist
                if (data.postOwnerId) {
                    await incrementAccount(data.postOwnerId, 'totalReach', 1);
                    await Impression.create({
                        userId: data.postOwnerId,
                        viewerId: data.viewerId,
                        contentId: data.postId,
                        contentType: 'POST',
                        timestamp: new Date()
                    });

                    let [vMetric] = await ContentMetric.findOrCreate({
                        where: { contentId: data.postId, date: dateStr },
                        defaults: { userId: data.postOwnerId, contentType: 'POST', date: dateStr }
                    });
                    await vMetric.increment('views', { by: 1 });
                }
                break;

            default:
                // console.log('Unhandled event:', key);
                break;
        }
    } catch (e) {
        console.error(`Failed to process event ${key}:`, e.message);
    }
};

module.exports = { startConsumer };
