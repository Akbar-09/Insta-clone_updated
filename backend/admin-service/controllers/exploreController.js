const { ExploreAlgorithmConfig, ExploreTrendingTopic, AuditLog } = require('../models');

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
            targetType: 'explore_config',
            targetId: config.id.toString(),
            metadata: req.body
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
            targetType: 'trending_topic',
            targetId: newTopic.id.toString(),
            metadata: { topic: formattedTopic }
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

        await topic.destroy();

        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'REMOVE_TRENDING_TOPIC',
            targetType: 'trending_topic',
            targetId: topicId
        });

        res.json({ success: true, message: 'Topic removed' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// --- Analytics (Mock Implementation for UI) ---

exports.getCategoryDistribution = async (req, res) => {
    try {
        // In reality, this would query an analytics service or aggregate Post metadata
        const data = [
            { category: "Travel & Adventure", percentage: 35 },
            { category: "Technology", percentage: 25 },
            { category: "Fashion & Style", percentage: 20 },
            { category: "Food & Dining", percentage: 15 },
            { category: "Other", percentage: 5 }
        ];
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getPerformanceMetrics = async (req, res) => {
    try {
        // Mock metrics
        const data = {
            impressions: 2400000,
            impressionsChange: 12.5,
            ctr: 4.8,
            ctrChange: 0.8,
            avgWatchTime: 45,
            watchTimeChange: -2,
            engagementRate: 18,
            engagementChange: 3.2
        };
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
