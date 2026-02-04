const { AuditLog } = require('../models');

exports.getLogs = async (req, res) => {
    try {
        const { adminId, resourceType } = req.query;
        const where = {};
        if (adminId) where.adminId = adminId;
        if (resourceType) where.resourceType = resourceType;

        const logs = await AuditLog.findAll({
            where,
            order: [['createdAt', 'DESC']],
            limit: 100
        });
        res.json({ success: true, data: logs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
