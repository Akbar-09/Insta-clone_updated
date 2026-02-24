const { Sequelize } = require('sequelize');
const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});
async function check() {
    try {
        const [vPosts] = await seq.query('SELECT count(*) FROM "Posts" WHERE "mediaType" = \'VIDEO\'');
        const [reels] = await seq.query('SELECT count(*) FROM "Reels"');
        console.log(`Video Posts: ${vPosts[0].count}`);
        console.log(`Reels Table: ${reels[0].count}`);

        if (vPosts[0].count > 0) {
            const [samples] = await seq.query('SELECT * FROM "Posts" WHERE "mediaType" = \'VIDEO\' LIMIT 1');
            console.log('\nSample Video Post:');
            console.log(JSON.stringify(samples, null, 2));
        }
    } catch (e) {
        console.error(e);
    } finally {
        await seq.close();
    }
}
check();
