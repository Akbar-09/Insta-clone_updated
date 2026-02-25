const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

async function removeByUsername() {
    try {
        const usernames = ['akbar', 'farhan', 'ashish', 'sarfaraz'];

        console.log('Counting posts by username...');
        const [counts] = await sequelize.query(`SELECT username, COUNT(*) as count FROM "Posts" WHERE username IN (${usernames.map(u => `'${u}'`).join(',')}) GROUP BY username`);
        console.log('Current counts:', counts);

        if (counts.length === 0) {
            console.log('No posts found for these usernames.');
            return;
        }

        // Get all post IDs first for related cleanup
        const [posts] = await sequelize.query(`SELECT id FROM "Posts" WHERE username IN (${usernames.map(u => `'${u}'`).join(',')})`);
        const postIds = posts.map(p => p.id);

        console.log(`Deleting related data for ${postIds.length} posts...`);
        await sequelize.query(`DELETE FROM "Likes" WHERE "postId" IN (${postIds.join(',')})`);
        await sequelize.query(`DELETE FROM "SavedPosts" WHERE "postId" IN (${postIds.join(',')})`);
        await sequelize.query(`DELETE FROM "Reports" WHERE "postId" IN (${postIds.join(',')})`);

        console.log('Deleting posts by username...');
        await sequelize.query(`DELETE FROM "Posts" WHERE username IN (${usernames.map(u => `'${u}'`).join(',')})`);

        console.log('Success!');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

removeByUsername();
