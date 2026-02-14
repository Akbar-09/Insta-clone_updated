const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');

async function findSource() {
    try {
        await sequelize.authenticate();
        const username = 'creator_118';

        const [reels] = await sequelize.query(`SELECT id FROM "Reels" WHERE username = '${username}'`);
        console.log(`Found in Reels: ${reels.length}`);

        const [posts] = await sequelize.query(`SELECT id FROM "Posts" WHERE username = '${username}'`);
        console.log(`Found in Posts: ${posts.length}`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

findSource();
