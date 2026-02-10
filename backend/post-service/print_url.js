const sequelize = require('./config/database');
async function check() {
    try {
        const [results] = await sequelize.query("SELECT \"mediaUrl\" FROM \"Posts\" ORDER BY \"createdAt\" DESC LIMIT 1");
        process.stdout.write(results[0].mediaUrl + '\n');
    } catch (err) { console.error(err); } finally { await sequelize.close(); }
}
check();
