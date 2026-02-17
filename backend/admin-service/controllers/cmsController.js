const { AuditLog } = require('../models');

exports.getPages = async (req, res) => {
    try {
        res.json({
            success: true, data: [
                { id: 1, title: 'Terms of Service', slug: 'terms', lastUpdated: '2025-01-01' },
                { id: 2, title: 'Privacy Policy', slug: 'privacy', lastUpdated: '2025-01-01' }
            ]
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updatePage = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'UPDATE_CMS_PAGE',
            targetType: 'system',
            targetId: id.toString(),
            metadata: { title, updatedBy: req.admin.username }
        });

        res.json({ success: true, message: 'Page updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
