const internalApi = require('../services/internalApi');

exports.getRegionalStats = async (req, res) => {
    try {
        const response = await internalApi.getCountries();
        res.json({ success: true, data: response.data.data, message: "Country analytics fetched successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getActiveHours = async (req, res) => {
    try {
        const data = {
            peakHour: '20:00',
            dailyAverageActiveUsers: 1500
        };
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
