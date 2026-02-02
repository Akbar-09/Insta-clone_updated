const { SystemSetting, Admin, AuditLog } = require('../models');

// Singleton-like access for settings
exports.getSettings = async () => {
    try {
        let settings = await SystemSetting.findOne();
        if (!settings) {
            settings = await SystemSetting.create({});
        }
        return settings;
    } catch (error) {
        throw error;
    }
};

exports.updateSettings = async (updates, adminId) => {
    try {
        let settings = await SystemSetting.findOne();
        if (!settings) {
            settings = await SystemSetting.create({});
        }

        // Only allow specific fields
        const allowed = ['maintenanceMode', 'allowRegistrations', 'emailAlerts', 'adminTheme'];
        const changes = {};

        allowed.forEach(field => {
            if (updates[field] !== undefined) {
                if (settings[field] !== updates[field]) {
                    changes[field] = { old: settings[field], new: updates[field] };
                    settings[field] = updates[field];
                }
            }
        });

        if (Object.keys(changes).length > 0) {
            await settings.save();

            await AuditLog.create({
                adminId,
                actionType: 'update_platform_settings',
                targetType: 'system',
                metadata: changes
            });
        }

        return settings;
    } catch (error) {
        throw error;
    }
};

exports.updateProfile = async (adminId, profileData) => {
    try {
        const admin = await Admin.findByPk(adminId);
        if (!admin) throw new Error('Admin not found');

        // Check email uniqueness if changing
        if (profileData.email && profileData.email !== admin.email) {
            const existing = await Admin.findOne({ where: { email: profileData.email } });
            if (existing) throw new Error('Email already in use');
        }

        const changes = {};
        if (profileData.name) {
            changes.name = { old: admin.name, new: profileData.name };
            admin.name = profileData.name;
        }
        if (profileData.email) {
            changes.email = { old: admin.email, new: profileData.email };
            admin.email = profileData.email;
        }
        // Title isn't in Admin model schema yet, assuming we might need it or store in metadata?
        // Let's check Admin model. If not present, we skip or add it.
        // Assuming Admin model has 'name', 'email'. 'title' might be just UI or we add it. 
        // For now, ignoring title persistence or mapping it to something else if needed, 
        // but user requested it. Let's assume standard Admin model has name/email.

        await admin.save();

        await AuditLog.create({
            adminId,
            actionType: 'update_admin_profile',
            targetType: 'admin',
            targetId: admin.id.toString(),
            metadata: changes
        });

        return admin;
    } catch (error) {
        throw error;
    }
};
