const { Sequelize } = require('sequelize');

const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

async function check() {
    try {
        const [reels] = await seq.query('SELECT id, username, caption, "videoUrl" FROM "Reels"');
        console.log('--- REELS IN DB ---');
        console.log(JSON.stringify(reels, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        await seq.close();
    }
}
check();
