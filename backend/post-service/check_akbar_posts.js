const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

async function checkPosts() {
    try {
        const userId = 51; // akbar
        const [posts] = await sequelize.query(`SELECT id, "userId", "mediaUrl", "mediaType", "caption" FROM "Posts" WHERE "userId" = ${userId}`);
        console.log(`Found ${posts.length} posts for user 51:`);
        posts.forEach(p => {
            console.log(`- Post ${p.id}: ${p.mediaUrl}`);
        });
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

checkPosts();
