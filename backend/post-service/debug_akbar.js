const sequelize = require('./config/database');
async function check() {
    try {
        const [results] = await sequelize.query("SELECT id, username, caption, \"mediaUrl\" FROM \"Posts\" WHERE username = 'akbar' ORDER BY \"createdAt\" DESC LIMIT 1");
        console.log(results[0].mediaUrl);
    } catch (err) { console.error(err); } finally { await sequelize.close(); }
}
check();
