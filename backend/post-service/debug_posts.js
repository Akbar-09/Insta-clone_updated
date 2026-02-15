const sequelize = require('./config/database');
async function check() {
    try {
        const [results] = await sequelize.query("SELECT id, username, caption, \"mediaUrl\", \"mediaType\", \"createdAt\" FROM \"Posts\" ORDER BY \"createdAt\" DESC LIMIT 5");
        console.log(JSON.stringify(results, null, 2));
    } catch (err) { console.error(err); } finally { await sequelize.close(); }
}
check();
