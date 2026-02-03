const { AuditLog } = require('../models');
const internalApi = require('../services/internalApi');


// Get report statistics
exports.getReportStats = async (req, res) => {
    try {
        const [pending, underReview, resolvedToday] = await Promise.all([
            // Count pending reports from post-service
            internalApi.getReportStats('pending'),
            // Count under review reports
            internalApi.getReportStats('review'),
            // Count resolved today
            internalApi.getReportStats('resolved_today')
        ]);

        res.json({
            success: true,
            data: {
                pending: pending.data?.data?.count || 0,
                underReview: underReview.data?.data?.count || 0,
                resolvedToday: resolvedToday.data?.data?.count || 0
            }
        });
    } catch (error) {
        console.error('Get Report Stats Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// List reports with filtering and pagination
exports.listReports = async (req, res) => {
    try {
        const { status = 'pending', page = 1, limit = 10 } = req.query;

        const response = await internalApi.listReports({
            status,
            page: parseInt(page),
            limit: parseInt(limit)
        });

        if (response.data.success) {
            res.json(response.data);
        } else {
            res.status(500).json({ success: false, message: 'Failed to fetch reports' });
        }
    } catch (error) {
        console.error('List Reports Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get report by ID with full details
exports.getReportById = async (req, res) => {
    try {
        const { id } = req.params;

        const response = await internalApi.getReportById(id);

        if (response.data.success) {
            res.json(response.data);
        } else {
            res.status(404).json({ success: false, message: 'Report not found' });
        }
    } catch (error) {
        console.error('Get Report By ID Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Ignore/Resolve a report
exports.ignoreReport = async (req, res) => {
    try {
        const { id } = req.params;
        const adminId = req.headers['x-user-id'];

        const response = await internalApi.updateReportStatus(id, 'resolved', adminId);

        if (response.data.success) {
            // Log the action using Sequelize
            await AuditLog.create({
                adminId: parseInt(adminId),
                action: 'IGNORE_REPORT',
                targetType: 'report',
                targetId: id,
                details: JSON.stringify({ reportId: id })
            });

            res.json({ success: true, message: 'Report ignored successfully' });
        } else {
            res.status(500).json({ success: false, message: 'Failed to ignore report' });
        }
    } catch (error) {
        console.error('Ignore Report Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Ban user from report
exports.banUserFromReport = async (req, res) => {
    try {
        const { id } = req.params;
        const adminId = req.headers['x-user-id'];

        // Get report details first
        const reportResponse = await internalApi.getReportById(id);

        if (!reportResponse.data.success) {
            return res.status(404).json({ success: false, message: 'Report not found' });
        }

        const report = reportResponse.data.data;
        const userId = report.reportedUserId || report.content?.userId;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'Cannot identify user to ban' });
        }

        // Ban the user
        const banResponse = await internalApi.banUser(userId);

        if (banResponse.data.success) {
            // Update report status
            await internalApi.updateReportStatus(id, 'resolved', adminId);

            // Log the action using Sequelize
            await AuditLog.create({
                adminId: parseInt(adminId),
                action: 'BAN_USER_FROM_REPORT',
                targetType: 'user',
                targetId: String(userId),
                details: JSON.stringify({ reportId: id, userId })
            });

            res.json({ success: true, message: 'User banned successfully' });
        } else {
            res.status(500).json({ success: false, message: 'Failed to ban user' });
        }
    } catch (error) {
        console.error('Ban User From Report Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
