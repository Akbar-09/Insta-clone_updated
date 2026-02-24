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
        const [reels] = await seq.query('SELECT id, username, caption, "videoUrl" FROM "Reels"');
        fs.writeFileSync('reels_dump.json', JSON.stringify(reels, null, 2));
        console.log(`Dumped ${reels.length} reels to reels_dump.json`);
    } catch (err) {
        console.error(err);
    } finally {
        await seq.close();
    }
}
check();
