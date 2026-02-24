const { Sequelize } = require('sequelize');
const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});
async function check() {
    try {
        const [r] = await seq.query("SELECT from_user_id, from_username, from_user_avatar FROM notifications WHERE from_username = 'farhan'");
        console.log(`Found ${r.length} notifications from farhan:`);
        r.forEach(n => console.log(`- Avatar: ${n.from_user_avatar || 'EMPTY'}`));
    } catch (e) {
        console.error(e);
    } finally {
        await seq.close();
    }
}
check();
