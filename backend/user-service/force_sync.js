const UserProfile = require('./models/UserProfile');
const Avatar = require('./models/Avatar');
const Report = require('./models/Report');
const sequelize = require('./config/database');

async function sync() {
    try {
        await sequelize.authenticate();
        console.log('User Service: DB Connected');
        await sequelize.sync({ alter: true });
        console.log('User Service: Database Sync Success');
    } catch (err) {
        console.error('User Service Sync Error:', err);
    } finally {
        await sequelize.close();
    }
}

sync();
