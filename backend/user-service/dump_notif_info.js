const { Sequelize } = require('sequelize');
const fs = require('fs');
const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});
async function check() {
    try {
        const [r] = await seq.query('SELECT * FROM notifications LIMIT 1');
        fs.writeFileSync('notif_info.txt', JSON.stringify(r, null, 2));
        console.log('Saved to notif_info.txt');
    } catch (e) {
        console.error(e);
    } finally {
        await seq.close();
    }
}
check();
