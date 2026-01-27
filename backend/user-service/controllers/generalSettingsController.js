const GeneralSettings = require('../models/GeneralSettings');
const ConnectedApp = require('../models/ConnectedApp');
const { Op } = require('sequelize');

// --- General Settings (Archiving, Accessibility, Language) ---
exports.getGeneralSettings = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const [settings] = await GeneralSettings.findOrCreate({ where: { userId }, defaults: { userId } });
        res.json({ status: 'success', data: settings });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.updateGeneralSettings = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const [settings] = await GeneralSettings.findOrCreate({ where: { userId }, defaults: { userId } });

        if (req.body.saveStoryToArchive !== undefined) settings.saveStoryToArchive = req.body.saveStoryToArchive;
        if (req.body.reduceMotion !== undefined) settings.reduceMotion = req.body.reduceMotion;
        if (req.body.languageCode !== undefined) settings.languageCode = req.body.languageCode;

        await settings.save();
        res.json({ status: 'success', data: settings });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// --- Connected Apps ---
exports.getConnectedApps = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { status } = req.query;

        const whereClause = { userId };
        if (status) whereClause.status = status;

        const apps = await ConnectedApp.findAll({ where: whereClause, order: [['connectedAt', 'DESC']] });
        res.json({ status: 'success', data: apps });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.revokeAppAccess = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { id } = req.params;

        const app = await ConnectedApp.findOne({ where: { id, userId } });
        if (!app) return res.status(404).json({ status: 'error', message: 'App not found' });

        app.status = 'removed';
        await app.save();

        res.json({ status: 'success', message: 'Access revoked' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
