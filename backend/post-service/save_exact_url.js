const sequelize = require('./config/database');
const fs = require('fs');
async function check() {
    try {
        const [results] = await sequelize.query("SELECT \"mediaUrl\" FROM \"Posts\" WHERE caption = 'test 2' LIMIT 1");
        fs.writeFileSync('exact_url_value.txt', results[0].mediaUrl);
    } catch (err) { console.error(err); } finally { await sequelize.close(); }
}
check();
