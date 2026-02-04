const sequelize = require('./config/database');
async function check() {
    try {
        const [results] = await sequelize.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'AppFeedback'");
        console.log('AppFeedback columns:', results.map(r => r.column_name));
    } catch (err) { console.error(err); } finally { await sequelize.close(); }
}
check();
