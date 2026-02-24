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
        const [cols] = await seq.query("SELECT column_name, is_nullable FROM information_schema.columns WHERE table_name = 'Media'");
        fs.writeFileSync('media_cols.txt', JSON.stringify(cols, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await seq.close();
    }
}
check();
