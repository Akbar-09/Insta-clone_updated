const { Sequelize } = require('sequelize');
const fs = require('fs');
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
        const result = {
            count: posts.length,
            posts: posts
        };
        fs.writeFileSync('akbar_posts_full.json', JSON.stringify(result, null, 2));
        console.log(`Saved ${posts.length} posts to akbar_posts_full.json`);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

checkPosts();
