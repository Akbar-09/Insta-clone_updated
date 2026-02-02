const analyticsService = require('../services/analyticsService');

exports.getAnalyticsSummary = async (req, res) => {
    try {
        const data = await analyticsService.getAnalyticsSummary();
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getUserAcquisition = async (req, res) => {
    try {
        const { range } = req.query;
        const data = await analyticsService.getUserAcquisition(range);
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getEngagementTrends = async (req, res) => {
    try {
        const { range } = req.query;
        const data = await analyticsService.getEngagementTrends(range);
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getTopContent = async (req, res) => {
    try {
        const { limit } = req.query;
        const data = await analyticsService.getTopContent(limit);
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
