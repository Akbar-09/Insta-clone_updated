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
        const [r] = await seq.query('SELECT * FROM notifications WHERE from_user_id IS NOT NULL LIMIT 5');
        fs.writeFileSync('notif_info_valid.txt', JSON.stringify(r, null, 2));
        console.log(`Saved ${r.length} valid notifications to notif_info_valid.txt`);
    } catch (e) {
        console.error(e);
    } finally {
        await seq.close();
    }
}
check();
