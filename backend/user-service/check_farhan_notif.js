const { Sequelize } = require('sequelize');
const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});
async function check() {
    try {
        const [r] = await seq.query("SELECT * FROM notifications WHERE from_user_id = 55 LIMIT 1");
        console.log("Notification from Farhan:");
        console.log(JSON.stringify(r, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await seq.close();
    }
}
check();
