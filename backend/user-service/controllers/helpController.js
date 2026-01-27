const AccountStatus = require('../models/AccountStatus');
const Violation = require('../models/Violation');
const FeatureLimit = require('../models/FeatureLimit');
const SupportRequest = require('../models/SupportRequest');
const Feedback = require('../models/Feedback');
const UserProfile = require('../models/UserProfile'); // To ensure user exists if needed

exports.getAccountStatus = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        // Ensure default creation
        const [status] = await AccountStatus.findOrCreate({
            where: { userId },
            defaults: { userId, status: 'OK' }
        });

        // Also could fetch profile data to return username/avatar if needed inline, 
        // but typically frontend has user context. We'll return basic status structure.
        res.json({ status: 'success', data: status });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.getViolations = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const violations = await Violation.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
        res.json({ status: 'success', data: violations });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.getFeatureLimits = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const limits = await FeatureLimit.findAll({ where: { userId, isBlocked: true } });
        res.json({ status: 'success', data: limits });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.getSupportRequests = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const requests = await SupportRequest.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });

        // Group by category if needed, or return flat list for frontend to group
        // For simplicity, returning flat list.
        res.json({ status: 'success', data: requests });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.submitFeedback = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { rating } = req.body;

        if (!rating) return res.status(400).json({ status: 'error', message: 'Rating is required' });

        await Feedback.create({ userId, rating });
        res.json({ status: 'success', message: 'Feedback submitted' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
