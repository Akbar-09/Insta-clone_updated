const UserProfile = require('../models/UserProfile');
const AccountProfile = require('../models/AccountProfile');
const AccountCategory = require('../models/AccountCategory');
const { publishEvent } = require('../config/rabbitmq');

exports.getAccountType = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const user = await UserProfile.findOne({ where: { userId } });
        if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

        res.json({ status: 'success', accountType: user.accountType || 'personal' });
    } catch (err) {
        console.error('getAccountType Error:', err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.switchAccountType = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const { accountType } = req.body;
        if (!['personal', 'creator', 'business'].includes(accountType)) {
            return res.status(400).json({ status: 'error', message: 'Invalid account type' });
        }

        const user = await UserProfile.findOne({ where: { userId } });
        if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

        user.accountType = accountType;
        await user.save();

        // Ensure AccountProfile exists for creator/business
        if (['creator', 'business'].includes(accountType)) {
            const [profile] = await AccountProfile.findOrCreate({
                where: { userId },
                defaults: { userId }
            });
        }

        // Publish event to other services
        await publishEvent('ACCOUNT_TYPE_CHANGED', {
            userId,
            accountType
        });

        res.json({ status: 'success', accountType: user.accountType });
    } catch (err) {
        console.error('switchAccountType Error:', err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.updateAccountProfile = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const { category, business_email, business_phone, business_address, website, whatsapp_number, reach_preference, display_category, display_contact } = req.body;

        const profile = await AccountProfile.findOne({ where: { userId } });
        if (!profile) {
            return res.status(404).json({ status: 'error', message: 'Account profile not found' });
        }

        if (category !== undefined) profile.category = category;
        if (business_email !== undefined) profile.business_email = business_email;
        if (business_phone !== undefined) profile.business_phone = business_phone;
        if (business_address !== undefined) profile.business_address = business_address;
        if (website !== undefined) profile.website = website;
        if (whatsapp_number !== undefined) profile.whatsapp_number = whatsapp_number;
        if (reach_preference !== undefined) profile.reach_preference = reach_preference;
        if (display_category !== undefined) profile.display_category = display_category;
        if (display_contact !== undefined) profile.display_contact = display_contact;

        await profile.save();

        res.json({ status: 'success', data: profile });
    } catch (err) {
        console.error('updateAccountProfile Error:', err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.getAccountProfile = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const profile = await AccountProfile.findOne({ where: { userId } });
        if (!profile) return res.status(404).json({ status: 'error', message: 'Account profile not found' });

        res.json({ status: 'success', data: profile });
    } catch (err) {
        console.error('getAccountProfile Error:', err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const { type } = req.query; // 'creator' or 'business'
        const filter = type ? { where: { type } } : {};
        const categories = await AccountCategory.findAll(filter);
        res.json({ status: 'success', data: categories });
    } catch (err) {
        console.error('getCategories Error:', err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.saveCategory = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { categoryId, displayCategory } = req.body;

        const category = await AccountCategory.findByPk(categoryId);
        if (!category) return res.status(404).json({ status: 'error', message: 'Category not found' });

        const [profile] = await AccountProfile.findOrCreate({
            where: { userId },
            defaults: { userId }
        });

        profile.category = category.name;
        // Optionally store categoryId if needed, but the project seems to use string labels in some places
        await profile.save();

        res.json({ status: 'success', message: 'Category saved' });
    } catch (err) {
        console.error('saveCategory Error:', err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};
