const { AuditLog } = require('../models');
const internalApi = require('../services/internalApi');

// Get report statistics
exports.getReportStats = async (req, res) => {
    try {
        const [pStats, uStats] = await Promise.all([
            Promise.all([
                internalApi.getReportStats('pending'),
                internalApi.getReportStats('review'),
                internalApi.getReportStats('resolved_today')
            ]),
            Promise.all([
                internalApi.getUserReportStats('pending'),
                internalApi.getUserReportStats('review'),
                internalApi.getUserReportStats('resolved_today')
            ])
        ]);

        const stats = {
            pending: (pStats[0].data?.data?.count || 0) + (uStats[0].data?.data?.count || 0),
            underReview: (pStats[1].data?.data?.count || 0) + (uStats[1].data?.data?.count || 0),
            resolvedToday: (pStats[2].data?.data?.count || 0) + (uStats[2].data?.data?.count || 0)
        };

        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Get Report Stats Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// List reports with filtering and pagination
exports.listReports = async (req, res) => {
    try {
        const { status = 'pending', page = 1, limit = 10, type = 'all' } = req.query;

        let allReports = [];
        let totalCount = 0;

        if (type === 'all' || type === 'post') {
            const pRes = await internalApi.listReports({ status, page, limit }).catch(() => ({ data: { success: false } }));
            if (pRes.data.success) {
                const reportsWithMeta = pRes.data.data.map(r => ({ ...r, content_type: 'post' }));
                allReports = [...allReports, ...reportsWithMeta];
                totalCount += pRes.data.pagination?.total || 0;
            }
        }

        if (type === 'all' || type === 'user') {
            const uRes = await internalApi.listUserReports({ status, page, limit }).catch(() => ({ data: { success: false } }));
            if (uRes.data.success) {
                const reportsWithMeta = uRes.data.data.map(r => ({ ...r, content_type: 'app_feedback' }));
                allReports = [...allReports, ...reportsWithMeta];
                totalCount += uRes.data.pagination?.total || 0;
            }
        }

        // Re-sort by date if merged
        if (type === 'all') {
            allReports.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }

        res.json({
            success: true,
            data: allReports,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: totalCount,
                totalPages: Math.ceil(totalCount / parseInt(limit))
            }
        });
    } catch (error) {
        console.error('List Reports Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get report by ID with full details
exports.getReportById = async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.query; // Optional hint

        let response;
        if (type === 'app_feedback' || id.length > 20) { // UUID is likely app_feedback
            response = await internalApi.getUserReportById(id);
        } else {
            response = await internalApi.getReportById(id).catch(() => null);
            if (!response || !response.data.success) {
                response = await internalApi.getUserReportById(id);
            }
        }

        if (response && response.data.success) {
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
        const { type } = req.body;
        const adminId = req.admin ? req.admin.id : (req.headers['x-admin-id'] || req.headers['x-user-id'] || 1);

        let response;
        if (type === 'app_feedback' || (typeof id === 'string' && id.length > 20)) {
            response = await internalApi.updateUserReportStatus(id, 'resolved');
        } else {
            response = await internalApi.updateReportStatus(id, 'ignored', adminId).catch(() => null);
            if (!response || !response.data.success) {
                response = await internalApi.updateUserReportStatus(id, 'resolved');
            }
        }

        if (response && response.data.success) {
            // Log action
            if (AuditLog) {
                await AuditLog.create({
                    adminId: parseInt(adminId),
                    actionType: 'IGNORE_REPORT',
                    targetType: 'report',
                    targetId: String(id),
                    metadata: { type }
                }).catch(console.error);
            }
            res.json({ success: true, message: 'Report ignored/resolved' });
        } else {
            res.status(500).json({ success: false, message: 'Action failed' });
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
        const { type } = req.body;
        const adminId = req.admin ? req.admin.id : (req.headers['x-admin-id'] || req.headers['x-user-id'] || 1);

        // 1. Get report details to find the user ID
        let report;
        let detailRes;

        if (type === 'app_feedback' || (typeof id === 'string' && id.length > 20)) {
            detailRes = await internalApi.getUserReportById(id);
        } else {
            detailRes = await internalApi.getReportById(id).catch(() => null);
            if (!detailRes || !detailRes.data.success) {
                detailRes = await internalApi.getUserReportById(id);
            }
        }

        if (detailRes && detailRes.data.success) {
            report = detailRes.data.data;
        }

        if (!report) return res.status(404).json({ success: false, message: 'Report not found' });

        const userIdToBan = report.reportedUserId || report.userId || (report.content && report.content.userId);
        if (!userIdToBan) return res.status(400).json({ success: false, message: 'Could not identify user to ban' });

        // 2. Ban user via user-service
        await internalApi.banUser(userIdToBan);

        // 3. Mark report as resolved/banned
        if (type === 'app_feedback' || (typeof id === 'string' && id.length > 20)) {
            await internalApi.updateUserReportStatus(id, 'resolved');
        } else {
            await internalApi.updateReportStatus(id, 'banned', adminId);
        }

        // 4. Log action
        if (AuditLog) {
            await AuditLog.create({
                adminId: parseInt(adminId),
                actionType: 'BAN_USER',
                targetType: 'user',
                targetId: String(userIdToBan),
                metadata: { reportId: id, type }
            }).catch(console.error);
        }

        res.json({ success: true, message: 'User banned and report resolved' });
    } catch (error) {
        console.error('Ban User From Report Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
