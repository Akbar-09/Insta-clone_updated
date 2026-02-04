const sequelize = require('./config/database');
async function check() {
    try {
        const [results] = await sequelize.query("SELECT * FROM \"PostReports\"");
        console.log('PostReports:', results.length);
        const [results2] = await sequelize.query("SELECT * FROM \"AppFeedback\"");
        console.log('AppFeedback:', results2.length);
    } catch (err) { console.error(err); } finally { await sequelize.close(); }
}
check();
