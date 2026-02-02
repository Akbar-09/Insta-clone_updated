const { sequelize, Admin } = require('./models');

const checkAdmin = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const admins = await Admin.findAll();
        console.log('Admins found:', admins.map(a => ({ id: a.id, username: a.username, email: a.email, passwordHash: a.password })));

    } catch (error) {
        console.error('Error checking admin:', error);
    } finally {
        await sequelize.close();
    }
};

checkAdmin();
