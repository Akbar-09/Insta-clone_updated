const sequelize = require('./config/database');
const User = require('./models/UserModel');

const verify = async () => {
    try {
        await sequelize.authenticate();
        const columns = await sequelize.getQueryInterface().describeTable('Users');
        console.log('Columns in Users table:', Object.keys(columns));
        process.exit(0);
    } catch (err) {
        console.error('Check failed:', err);
        process.exit(1);
    }
};

verify();
