const sequelize = require('./config/database');
const CallLog = require('./models/CallLog');

async function run() {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB');
        await sequelize.query('DROP TABLE IF EXISTS "call_logs";');
        console.log('Dropped table call_logs');
        await CallLog.sync();
        console.log('Recreated table call_logs');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
run();
