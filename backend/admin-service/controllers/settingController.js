const { SystemSetting, AuditLog } = require('../models');

exports.getSettings = async (req, res) => {
    try {
        const settings = await SystemSetting.findAll();
        res.json({ success: true, data: settings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateSetting = async (req, res) => {
    try {
        const { key, value } = req.body;
        const [setting] = await SystemSetting.upsert({ key, value });

        await AuditLog.create({
            adminId: req.admin.id,
            adminUsername: req.admin.username,
            action: 'UPDATE_SETTING',
            resourceType: 'SYSTEM',
            resourceId: key,
            details: { value }
        });

        res.json({ success: true, data: setting });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
