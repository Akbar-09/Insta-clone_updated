const { Hashtag, AuditLog } = require('../models');
const { Op } = require('sequelize');

exports.listHashtags = async (req, res) => {
    try {
        const { search, page = 1, limit = 20 } = req.query;
        const offset = (parseInt(page) - 1) * parseInt(limit);
        const whereClause = { deleted: false };

        if (search) {
            whereClause.name = { [Op.iLike]: `%${search}%` };
        }

        const { count, rows } = await Hashtag.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset,
            order: [['isTrending', 'DESC'], ['postsCount', 'DESC']]
        });

        res.json({
            success: true,
            data: {
                hashtags: rows,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / parseInt(limit))
                }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getTrendingHashtags = async (req, res) => {
    try {
        const trending = await Hashtag.findAll({
            where: { isTrending: true, deleted: false },
            limit: 10,
            order: [['postsCount', 'DESC']]
        });
        res.json({ success: true, data: trending });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.toggleHashtagVisibility = async (req, res) => {
    try {
        const { id } = req.params;
        const hashtag = await Hashtag.findByPk(id);
        if (!hashtag) return res.status(404).json({ success: false, message: 'Hashtag not found' });

        hashtag.status = hashtag.status === 'active' ? 'inactive' : 'active';
        await hashtag.save();

        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'TOGGLE_HASHTAG_VISIBILITY',
            targetType: 'hashtag',
            targetId: id.toString(),
            metadata: { newStatus: hashtag.status }
        });

        res.json({ success: true, message: 'Hashtag visibility updated', data: hashtag });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteHashtag = async (req, res) => {
    try {
        const { id } = req.params;
        const hashtag = await Hashtag.findByPk(id);
        if (!hashtag) return res.status(404).json({ success: false, message: 'Hashtag not found' });

        hashtag.deleted = true;
        await hashtag.save();

        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'DELETE_HASHTAG',
            targetType: 'hashtag',
            targetId: id.toString()
        });

        res.json({ success: true, message: 'Hashtag deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
