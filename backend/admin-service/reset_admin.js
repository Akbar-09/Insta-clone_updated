const { sequelize, Admin } = require('./models');
const bcrypt = require('bcrypt');

const resetAdmin = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const admin = await Admin.findOne({ where: { username: 'admin' } });
        if (admin) {
            admin.email = 'admin@jaadoe.com';
            admin.password = 'adminpassword123'; // Logic in hook will hash this?
            // Wait, hooks run on update if changed.
            // Let's explicitly check model definition.

            // Admin.js has beforeUpdate hook checking if password changed.
            // But to be safe and simple, I'll rely on the model hook.

            await admin.save();
            console.log('Admin updated: admin@jaadoe.com / adminpassword123');
        } else {
            console.log('Admin user not found to update.');
        }

    } catch (error) {
        console.error('Error resetting admin:', error);
    } finally {
        await sequelize.close();
    }
};

resetAdmin();
