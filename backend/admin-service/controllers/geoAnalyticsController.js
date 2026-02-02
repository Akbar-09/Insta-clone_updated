const geoAnalyticsService = require('../services/geoAnalyticsService');

exports.getGeoUserDistribution = async (req, res) => {
    try {
        const { search, limit } = req.query;
        const data = await geoAnalyticsService.getGeoUserDistribution(search, limit);
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
