const sequelize = require('./config/database');
async function check() {
    try {
        const [results] = await sequelize.query("SELECT id, \"r2Key\", url, \"uploadStatus\", \"processingError\" FROM \"Media\" ORDER BY \"createdAt\" DESC LIMIT 1");
        console.log(results[0]);
    } catch (err) { console.error(err); } finally { await sequelize.close(); }
}
check();
