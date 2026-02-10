const { AuditLog } = require('../models');
const internalApi = require('../services/internalApi');

exports.getKPIs = async (req, res) => {
    try {
        const [userStats, postStats, reelStats, pReportStats, uReportStats] = await Promise.all([
            internalApi.getServiceStats('users'),
            internalApi.getServiceStats('posts'),
            internalApi.getServiceStats('reels'),
            internalApi.getReportStats('pending').catch(() => ({ data: { data: { count: 0 } } })),
            internalApi.getUserReportStats('pending').catch(() => ({ data: { data: { count: 0 } } }))
        ]);

        const pendingReports = (pReportStats.data?.data?.count || 0) + (uReportStats.data?.data?.count || 0);

        res.json({
            success: true,
            data: {
                totalUsers: userStats.data.data.total,
                totalPosts: postStats.data.data.total,
                activeReels: reelStats.data.data.total,
                pendingReports: pendingReports,
                growthRates: {
                    users: userStats.data.data.growth || 0,
                    posts: postStats.data.data.growth || 0,
                    reels: reelStats.data.data.growth || 0
                }
            },
            message: "Dashboard data fetched successfully"
        });
    } catch (error) {
        console.error('KPI Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getActivityFeed = async (req, res) => {
    try {
        const logs = await AuditLog.findAll({
            limit: 20,
            order: [['created_at', 'DESC']]
        });
        res.json({ success: true, data: logs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getUserGrowth = async (req, res) => {
    try {
        const year = req.query.year || new Date().getFullYear();
        const response = await internalApi.getUserGrowth(year);
        res.json({ success: true, data: response.data.data, message: "User growth data fetched successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getMediaDistribution = async (req, res) => {
    try {
        const posts = await internalApi.getServiceStats('posts');
        const reels = await internalApi.getServiceStats('reels');
        const stories = await internalApi.getServiceStats('stories');

        const pCount = posts.data.data.total || 0;
        const rCount = reels.data.data.total || 0;
        const sCount = stories.data.data.total || 0;
        const total = pCount + rCount + sCount;

        res.json({
            success: true,
            data: {
                posts: total > 0 ? Math.round((pCount / total) * 100) : 0,
                reels: total > 0 ? Math.round((rCount / total) * 100) : 0,
                stories: total > 0 ? Math.round((sCount / total) * 100) : 0
            },
            message: "Media distribution data fetched successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getLoginMethods = async (req, res) => {
    try {
        const response = await internalApi.getLoginMethods();
        res.json({ success: true, data: response.data.data, message: "Login methods fetched successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getRecentUsers = async (req, res) => {
    try {
        const response = await internalApi.getRecentUsers();
        res.json({ success: true, data: response.data.data, message: "Recent users fetched successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getRecentPosts = async (req, res) => {
    try {
        const response = await internalApi.getRecentPosts();
        res.json({ success: true, data: response.data.data, message: "Recent posts fetched successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
