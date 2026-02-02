const languageService = require('../services/languageService');

exports.getLanguages = async (req, res) => {
    try {
        const data = await languageService.getAllLanguages();
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.enableLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const language = await languageService.enableLanguage(id, req.admin.id);
        res.json({ success: true, message: 'Language enabled', data: language });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.disableLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const language = await languageService.disableLanguage(id, req.admin.id);
        res.json({ success: true, message: 'Language disabled', data: language });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.setDefaultLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const language = await languageService.setDefaultLanguage(id, req.admin.id);
        res.json({ success: true, message: 'Default language updated', data: language });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
