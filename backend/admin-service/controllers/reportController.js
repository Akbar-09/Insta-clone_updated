const { Report, AuditLog } = require('../models');
const internalApi = require('../services/internalApi');
const { Op } = require('sequelize');

exports.getReports = async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        const offset = (parseInt(page) - 1) * parseInt(limit);
        const whereClause = {};
        if (status && status !== 'all') whereClause.status = status;

        const { count, rows } = await Report.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset,
            order: [['created_at', 'DESC']]
        });

        // Enrich reports with user data
        const enrichedReports = await Promise.all(rows.map(async (report) => {
            const enriched = report.toJSON();
            try {
                const userRes = await internalApi.getUser(report.reported_user_id);
                if (userRes.data.success) {
                    enriched.reportedUsername = userRes.data.data.username;
                    enriched.reportedUser = userRes.data.data;
                }
            } catch (err) {
                enriched.reportedUsername = 'Unknown';
            }
            return enriched;
        }));

        res.json({
            success: true,
            data: enrichedReports,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(count / parseInt(limit))
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getReportStats = async (req, res) => {
    try {
        const pending = await Report.count({ where: { status: 'pending' } });
        const underReview = await Report.count({ where: { status: 'review' } });

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const resolvedToday = await Report.count({
            where: {
                status: 'resolved',
                updated_at: { [Op.gte]: todayStart }
            }
        });

        res.json({
            success: true,
            data: { pending, underReview, resolvedToday }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getReportById = async (req, res) => {
    try {
        const report = await Report.findByPk(req.params.reportId);
        if (!report) return res.status(404).json({ success: false, message: 'Report not found' });

        const enriched = report.toJSON();

        // Fetch Reported User
        try {
            const userRes = await internalApi.getUser(report.reported_user_id);
            if (userRes.data.success) enriched.reportedUser = userRes.data.data;
        } catch (err) { }

        // Fetch Content
        try {
            let contentRes;
            if (report.content_type === 'post') contentRes = await internalApi.getPost(report.content_id);
            if (report.content_type === 'reel') contentRes = await internalApi.getReel(report.content_id);
            if (report.content_type === 'comment') contentRes = await internalApi.getComment(report.content_id);

            if (contentRes && contentRes.data.success) {
                const rawContent = contentRes.data.data;
                enriched.content = {
                    type: report.content_type,
                    text: rawContent.caption || rawContent.text || rawContent.content || '',
                    mediaUrl: rawContent.mediaUrl || rawContent.videoUrl || '',
                    createdAt: rawContent.createdAt
                };
            }
        } catch (err) { }

        res.json({ success: true, data: enriched });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.ignoreReport = async (req, res) => {
    try {
        const report = await Report.findByPk(req.params.reportId);
        if (!report) return res.status(404).json({ success: false, message: 'Report not found' });

        report.status = 'resolved';
        report.resolution_type = 'ignored';
        await report.save();

        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'ignore_report',
            targetType: 'report',
            targetId: report.id,
            metadata: { reportedUserId: report.reported_user_id }
        });

        res.json({ success: true, message: 'Report ignored successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.banUserFromReport = async (req, res) => {
    try {
        const report = await Report.findByPk(req.params.reportId);
        if (!report) return res.status(404).json({ success: false, message: 'Report not found' });

        // Call User Service to ban user
        const banRes = await internalApi.banUser(report.reported_user_id);
        if (!banRes.data.success) {
            return res.status(500).json({ success: false, message: 'Failed to ban user via User Service' });
        }

        report.status = 'resolved';
        report.resolution_type = 'user_banned';
        await report.save();

        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'ban_user_from_report',
            targetType: 'report',
            targetId: report.id,
            metadata: { reportedUserId: report.reported_user_id }
        });

        res.json({ success: true, message: 'User banned and report resolved' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getUserReportCount = async (reportedUserId) => {
    try {
        return await Report.count({ where: { reported_user_id: reportedUserId } });
    } catch (err) {
        console.error('Error fetching report count:', err);
        return 0;
    }
};
