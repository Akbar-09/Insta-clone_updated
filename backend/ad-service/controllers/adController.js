const Ad = require('../models/Ad');
const AdImpression = require('../models/AdImpression');
const AdClick = require('../models/AdClick');

const adController = {
    createAd: async (req, res) => {
        try {
            const ad = await Ad.create(req.body);
            res.status(201).json({ success: true, data: ad });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    getAds: async (req, res) => {
        try {
            const ads = await Ad.findAll({ where: { status: 'active' } });
            res.json({ success: true, data: ads });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    approveAd: async (req, res) => {
        try {
            const { id } = req.params;
            const ad = await Ad.findByPk(id);
            if (!ad) return res.status(404).json({ success: false, message: 'Ad not found' });

            ad.status = 'active';
            await ad.save();
            res.json({ success: true, data: ad });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    trackImpression: async (req, res) => {
        try {
            const { adId, viewerId } = req.body;
            const impression = await AdImpression.create({ adId, viewerId });
            res.status(201).json({ success: true, data: impression });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    trackClick: async (req, res) => {
        try {
            const { adId, viewerId } = req.body;
            const click = await AdClick.create({ adId, viewerId });
            res.status(201).json({ success: true, data: click });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = adController;
