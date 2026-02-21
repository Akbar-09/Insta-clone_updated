const sequelize = require('./config/database');
async function test() {
    try {
        await sequelize.authenticate();
        console.log('Database connection OK');
        await sequelize.sync();
        console.log('Sync OK');
        process.exit(0);
    } catch (err) {
        console.error('DB Error:', err);
        process.exit(1);
    }
}
test();
