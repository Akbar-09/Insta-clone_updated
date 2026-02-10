const sequelize = require('./config/database');
async function check() {
    try {
        const [results] = await sequelize.query("SELECT \"mediaUrl\" FROM \"Posts\" WHERE caption = 'test 2' LIMIT 1");
        if (results.length > 0) {
            console.log('URL_START');
            console.log(results[0].mediaUrl);
            console.log('URL_END');
        } else {
            console.log('Post not found');
        }
    } catch (err) { console.error(err); } finally { await sequelize.close(); }
}
check();
