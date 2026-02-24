const { Sequelize, Op } = require('sequelize');
const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});
async function check() {
    try {
        const key = '1771314095068-107043085_opt.webp';
        const [r] = await seq.query(
            "SELECT id, url, \"r2Key\", \"tempKey\" FROM \"Media\" WHERE \"r2Key\" LIKE :key OR \"tempKey\" LIKE :key OR url LIKE :key",
            { replacements: { key: `%${key}%` } }
        );
        console.log("Media table results:");
        console.log(JSON.stringify(r, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await seq.close();
    }
}
check();
