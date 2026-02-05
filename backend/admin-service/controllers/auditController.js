const { AuditLog, Admin } = require('../models');
const { Op } = require('sequelize');

exports.getLogs = async (req, res) => {
    try {
        const { adminId, targetType, query, page = 1, limit = 50 } = req.query;
        const offset = (page - 1) * limit;

        const where = {};
        if (adminId) where.adminId = adminId;
        if (targetType) where.targetType = targetType;

        if (query) {
            where[Op.or] = [
                { actionType: { [Op.iLike]: `%${query}%` } },
                { targetId: { [Op.iLike]: `%${query}%` } }
            ];
        }

        const { count, rows: logs } = await AuditLog.findAndCountAll({
            where,
            include: [{
                model: Admin,
                as: 'admin',
                attributes: ['id', 'username', 'name', 'email']
            }],
            order: [['created_at', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        res.json({
            success: true,
            data: logs,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(count / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
