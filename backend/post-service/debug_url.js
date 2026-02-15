const sequelize = require('./config/database');
async function check() {
    try {
        const [results] = await sequelize.query("SELECT id, \"mediaUrl\" FROM \"Posts\" ORDER BY \"createdAt\" DESC LIMIT 1");
        console.log(results[0].mediaUrl);
    } catch (err) { console.error(err); } finally { await sequelize.close(); }
}
check();
