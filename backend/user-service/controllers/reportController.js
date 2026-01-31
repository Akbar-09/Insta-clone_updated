const Report = require('../models/Report');
const UserProfile = require('../models/UserProfile');

exports.submitReport = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { text, files, browserInfo } = req.body;

        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        const profile = await UserProfile.findOne({ where: { userId } });
        const username = profile ? profile.username : 'Unknown';

        const report = await Report.create({
            userId,
            username,
            text,
            files: files || [],
            browserInfo
        });

        res.status(201).json({
            status: 'success',
            data: report,
            message: 'Report submitted successfully. Thank you for your feedback!'
        });
    } catch (error) {
        console.error('Submit Report Error:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getMyReports = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        const reports = await Report.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']]
        });

        res.json({ status: 'success', data: reports });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};
