const Ad = require('../models/Ad');
const AdImpression = require('../models/AdImpression');
const AdClick = require('../models/AdClick');
const { Op } = require('sequelize');

exports.createAd = async (req, res) => {
    try {
        const { caption, mediaUrl, mediaType, linkUrl, ctaText, budget, startDate, endDate, userId, username, profileImage } = req.body;

        const ad = await Ad.create({
            userId,
            username,
            profileImage,
            caption,
            mediaUrl,
            mediaType,
            linkUrl,
            ctaText,
            budget,
            startDate: startDate || new Date(),
            endDate,
            status: 'ACTIVE' // Auto-approve for demo purposes
        });

        res.status(201).json({ status: 'success', data: ad });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getAds = async (req, res) => {
    try {
        // Fetch ads that are ACTIVE, STARTED, NOT ENDED, and HAVE BUDGET
        const now = new Date();
        const ads = await Ad.findAll({
            where: {
                status: 'ACTIVE',
                startDate: { [Op.lte]: now },
                // End date is either null (run forever) or in future
                [Op.or]: [
                    { endDate: null },
                    { endDate: { [Op.gte]: now } }
                ]
            },
            limit: 20, // Fetch a batch
            order: [['createdAt', 'DESC']]
        });

        // Filter by budget if needed (simple check)
        const validAds = ads.filter(ad => ad.spent < ad.budget);

        res.status(200).json({ status: 'success', data: validAds });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.approveAd = async (req, res) => {
    try {
        const { id } = req.params;
        const ad = await Ad.findByPk(id);
        if (!ad) return res.status(404).json({ status: 'error', message: 'Ad not found' });

        ad.status = 'ACTIVE'; // Directly to ACTIVE for simplicity, or APPROVED then job makes it ACTIVE
        await ad.save();

        res.status(200).json({ status: 'success', data: ad });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.trackImpression = async (req, res) => {
    try {
        const { adId, viewerId } = req.body;
        await AdImpression.create({ adId, viewerId });

        // Update aggregate
        await Ad.increment('impressionsCount', { where: { id: adId } });

        // Budget logic could go here (e.g. CPM cost)

        res.status(200).json({ status: 'success' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.trackClick = async (req, res) => {
    try {
        const { adId, clickerId } = req.body;
        await AdClick.create({ adId, clickerId });

        // Update aggregate
        await Ad.increment('clicksCount', { where: { id: adId } });

        // Budget logic (CPC)
        // const ad = await Ad.findByPk(adId);
        // ad.spent += 0.50; // Example cost
        // await ad.save();

        res.status(200).json({ status: 'success' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
