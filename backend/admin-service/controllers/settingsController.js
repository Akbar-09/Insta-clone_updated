const settingsService = require('../services/settingsService');
const { Admin } = require('../models');

exports.getSettings = async (req, res) => {
    try {
        const data = await settingsService.getSettings();
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        const data = await settingsService.updateSettings(req.body, req.admin.id);
        res.json({ success: true, message: 'Settings updated', data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.admin.id, {
            attributes: ['id', 'username', 'name', 'email', 'roleId']
        });
        res.json({ success: true, data: admin });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const data = await settingsService.updateProfile(req.admin.id, req.body);
        res.json({ success: true, message: 'Profile updated', data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
