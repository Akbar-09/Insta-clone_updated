const { Sequelize } = require('sequelize');

const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

async function check() {
    try {
        const key = '1771568209132-773255378_opt.mp4';
        const [r] = await seq.query(
            "SELECT id, url, \"r2Key\", \"tempKey\" FROM \"Media\" WHERE \"r2Key\" LIKE :key OR \"tempKey\" LIKE :key OR url LIKE :key",
            { replacements: { key: `%${key}%` } }
        );
        console.log("Media table results for sarfaraz video:");
        console.log(JSON.stringify(r, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await seq.close();
    }
}
check();
