const { ExploreAlgorithmConfig, ExploreTrendingTopic, AuditLog, Hashtag, sequelize } = require('../models');

// --- Algorithm Configuration ---

exports.getAlgorithmConfig = async (req, res) => {
    try {
        let config = await ExploreAlgorithmConfig.findOne();
        if (!config) {
            config = await ExploreAlgorithmConfig.create({
                freshnessWeight: 70,
                engagementWeight: 60,
                relevanceWeight: 85,
                locationWeight: 40
            });
        }
        res.json({ success: true, data: config });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateAlgorithmConfig = async (req, res) => {
    try {
        const { freshnessWeight, engagementWeight, relevanceWeight, locationWeight } = req.body;

        let config = await ExploreAlgorithmConfig.findOne();
        if (!config) {
            config = await ExploreAlgorithmConfig.create(req.body);
        } else {
            // Validate simplified locally
            config.freshnessWeight = freshnessWeight;
            config.engagementWeight = engagementWeight;
            config.relevanceWeight = relevanceWeight;
            config.locationWeight = locationWeight;
            await config.save();
        }

        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'UPDATE_ALGORITHM',
            targetType: 'system',
            targetId: config.id.toString(),
            metadata: { ...req.body, subType: 'explore_config' }
        });

        // In a real microservices architecture, we would emit an event here (e.g., RabbitMQ)
        // or call an internal webhook to notify the Feed/Explore service to reload weights.

        res.json({ success: true, message: 'Algorithm updated successfully', data: config });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// --- Trending Topics ---

exports.listTrendingTopics = async (req, res) => {
    try {
        const topics = await ExploreTrendingTopic.findAll({ order: [['created_at', 'DESC']] });
        res.json({ success: true, data: topics });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.addTrendingTopic = async (req, res) => {
    try {
        const { topic } = req.body;
        if (!topic) return res.status(400).json({ success: false, message: 'Topic is required' });

        const formattedTopic = topic.startsWith('#') || topic.includes(' ') ? topic : `#${topic}`;

        const newTopic = await ExploreTrendingTopic.create({ topic: formattedTopic });

        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'ADD_TRENDING_TOPIC',
            targetType: 'system',
            targetId: newTopic.id.toString(),
            metadata: { topic: formattedTopic, subType: 'trending_topic' }
        });

        res.json({ success: true, data: newTopic });
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ success: false, message: 'Topic already exists' });
        }
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.removeTrendingTopic = async (req, res) => {
    try {
        const { topicId } = req.params;
        const topic = await ExploreTrendingTopic.findByPk(topicId);

        if (!topic) return res.status(404).json({ success: false, message: 'Topic not found' });

        const topicName = topic.topic;
        await topic.destroy();

        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'REMOVE_TRENDING_TOPIC',
            targetType: 'system',
            targetId: topicId,
            metadata: { topic: topicName, subType: 'trending_topic' }
        });

        res.json({ success: true, message: 'Topic removed' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// --- Analytics (Mock Implementation for UI) ---

exports.getCategoryDistribution = async (req, res) => {
    try {
        // Use top hashtags as proxy for categories
        const hashtags = await Hashtag.findAll({
            order: [
                [sequelize.literal('"postsCount" + "reelsCount"'), 'DESC']
            ],
            limit: 5,
            attributes: ['name', 'postsCount', 'reelsCount']
        });

        const totalInteraction = hashtags.reduce((sum, tag) => sum + tag.postsCount + tag.reelsCount, 0);

        const data = hashtags.map(tag => ({
            category: tag.name.replace('#', ''), // Clean up hash
            percentage: totalInteraction > 0
                ? Math.round(((tag.postsCount + tag.reelsCount) / totalInteraction) * 100)
                : 0
        }));

        // Fill remaining if less than 5 or add "Other" if needed
        if (data.length === 0) {
            // Fallback if no hashtags yet
            res.json({
                success: true, data: [
                    { category: "General", percentage: 100 }
                ]
            });
            return;
        }

        res.json({ success: true, data });
    } catch (err) {
        console.error('Category Dist Error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getPerformanceMetrics = async (req, res) => {
    try {
        const internalApi = require('../services/internalApi');

        const [postStats, reelStats] = await Promise.all([
            internalApi.getPostOverallStats(),
            internalApi.getReelOverallStats()
        ]);

        const pData = postStats.data.success ? postStats.data.data : { likes: 0, comments: 0, views: 0 };
        const rData = reelStats.data.success ? reelStats.data.data : { likes: 0, comments: 0, views: 0 };

        const totalViews = pData.views + rData.views;
        const totalLikes = pData.likes + rData.likes;
        const totalComments = pData.comments + rData.comments;
        const totalEngagement = totalLikes + totalComments;

        // Calculate simplified metrics (mocking "Change" for now as we don't have historical snapshots)
        const ctr = totalViews > 0 ? ((totalEngagement / totalViews) * 100).toFixed(1) : 0;
        const engagementRate = totalViews > 0 ? ((totalEngagement / totalViews) * 100).toFixed(1) : 0; // Simplified

        // Mocking average watch time as we don't store it
        const avgWatchTime = rData.views > 0 ? 15 : 0;

        const data = {
            impressions: totalViews,
            impressionsChange: 5.0, // Hardcoded growth for demo
            ctr: parseFloat(ctr),
            ctrChange: 0.5,
            avgWatchTime: avgWatchTime, // Seconds
            watchTimeChange: 0,
            engagementRate: parseFloat(engagementRate),
            engagementChange: 1.2
        };

        res.json({ success: true, data });
    } catch (err) {
        console.error('Perf Metrics Error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};
