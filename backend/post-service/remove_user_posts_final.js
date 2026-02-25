const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

async function removePostsAndRelatedData() {
    try {
        const usernames = ['akbar', 'farhan', 'ashish', 'sarfaraz'];

        // Find user IDs
        const [users] = await sequelize.query(`SELECT id, username FROM "Users" WHERE username IN (${usernames.map(u => `'${u}'`).join(',')})`);

        if (users.length === 0) {
            console.log('No users found.');
            return;
        }

        const userIds = users.map(u => u.id);
        console.log(`Found users with IDs: ${userIds.join(', ')}`);

        // Find all post IDs for these users
        const [posts] = await sequelize.query(`SELECT id FROM "Posts" WHERE "userId" IN (${userIds.join(',')})`);

        if (posts.length === 0) {
            console.log('No posts found for these users.');
            return;
        }

        const postIds = posts.map(p => p.id);
        console.log(`Found ${postIds.length} posts to remove.`);

        // Delete related data first (to avoid foreign key constraints)
        console.log('Deleting likes...');
        await sequelize.query(`DELETE FROM "Likes" WHERE "postId" IN (${postIds.join(',')})`);

        console.log('Deleting saved posts...');
        await sequelize.query(`DELETE FROM "SavedPosts" WHERE "postId" IN (${postIds.join(',')})`);

        console.log('Deleting reports...');
        await sequelize.query(`DELETE FROM "Reports" WHERE "postId" IN (${postIds.join(',')})`);

        // Finally, delete the posts
        console.log('Deleting posts...');
        const [result] = await sequelize.query(`DELETE FROM "Posts" WHERE "id" IN (${postIds.join(',')})`);

        console.log('Success! All posts and related data removed.');

    } catch (error) {
        console.error('Error during removal:', error);
    } finally {
        await sequelize.close();
    }
}

removePostsAndRelatedData();
