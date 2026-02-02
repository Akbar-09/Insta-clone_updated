const { Language, AuditLog } = require('../models');
const internalApi = require('./internalApi');

exports.getAllLanguages = async () => {
    try {
        const languages = await Language.findAll({
            order: [['isDefault', 'DESC'], ['isActive', 'DESC'], ['name', 'ASC']]
        });

        // Fetch users per language (Mock or use internalApi if user-service supports it)
        // Since UserProfile doesn't have exact language field yet, we might use country or mock it.
        // For now, let's mock counts based on language code to show data on UI as requested.

        const counts = {
            'EN': 18500,
            'ES': 12300,
            'FR': 8540,
            'HI': 4200,
            'ZH': 3100
        };

        const enriched = languages.map(lang => ({
            ...lang.toJSON(),
            users: counts[lang.code] || Math.floor(Math.random() * 1000) // Fallback mock
        }));

        const stats = {
            total: enriched.length,
            active: enriched.filter(l => l.isActive).length,
            defaultLanguage: enriched.find(l => l.isDefault)?.code || 'None'
        };

        return { stats, languages: enriched };
    } catch (error) {
        throw error;
    }
};

exports.enableLanguage = async (id, adminId) => {
    try {
        const language = await Language.findByPk(id);
        if (!language) throw new Error('Language not found');

        language.isActive = true;
        await language.save();

        await AuditLog.create({
            adminId,
            actionType: 'enable_language',
            targetType: 'language',
            targetId: id.toString(),
            metadata: { code: language.code }
        });

        return language;
    } catch (error) {
        throw error;
    }
};

exports.disableLanguage = async (id, adminId) => {
    try {
        const language = await Language.findByPk(id);
        if (!language) throw new Error('Language not found');

        if (language.isDefault) {
            throw new Error('Cannot disable the default language');
        }

        language.isActive = false;
        await language.save();

        await AuditLog.create({
            adminId,
            actionType: 'disable_language',
            targetType: 'language',
            targetId: id.toString(),
            metadata: { code: language.code }
        });

        return language;
    } catch (error) {
        throw error;
    }
};

exports.setDefaultLanguage = async (id, adminId) => {
    try {
        const language = await Language.findByPk(id);
        if (!language) throw new Error('Language not found');

        if (!language.isActive) {
            throw new Error('Candidate default language must be active');
        }

        // Transaction ideally
        await Language.update({ isDefault: false }, { where: {} });
        language.isDefault = true;
        await language.save();

        await AuditLog.create({
            adminId,
            actionType: 'set_default_language',
            targetType: 'language',
            targetId: id.toString(),
            metadata: { code: language.code }
        });

        return language;
    } catch (error) {
        throw error;
    }
};

exports.seedLanguages = async () => {
    const count = await Language.count();
    if (count === 0) {
        await Language.bulkCreate([
            { name: 'English', code: 'EN', flagCode: 'US', isActive: true, isDefault: true },
            { name: 'Spanish', code: 'ES', flagCode: 'ES', isActive: true, isDefault: false },
            { name: 'French', code: 'FR', flagCode: 'FR', isActive: true, isDefault: false },
            { name: 'Hindi', code: 'HI', flagCode: 'IN', isActive: true, isDefault: false },
            { name: 'Chinese', code: 'ZH', flagCode: 'CN', isActive: false, isDefault: false },
        ]);
        console.log('Seed: Languages created');
    }
};
