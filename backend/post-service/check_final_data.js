const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

async function checkAkbarPosts() {
    try {
        const [posts] = await sequelize.query(`SELECT id, "userId", username, caption, "mediaUrl" FROM "Posts" WHERE username = 'akbar' ORDER BY "createdAt" DESC LIMIT 10`);
        console.log(`Found ${posts.length} recent posts for akbar:`);
        posts.forEach(p => {
            console.log(`- ID: ${p.id}, Caption: ${p.caption}, Media: ${p.mediaUrl}`);
        });

        const [media] = await sequelize.query(`SELECT * FROM "Media" LIMIT 10`);
        console.log('\nSample Media table entries:');
        console.log(media);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

checkAkbarPosts();
