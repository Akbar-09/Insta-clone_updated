const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

async function findUsersAndRemovePosts() {
    try {
        const usernames = ['akbar', 'farhan', 'ashish', 'sarfaraz'];

        // Find user IDs correctly handling quoted table names if necessary
        const [users] = await sequelize.query(`SELECT id, username FROM "Users" WHERE username IN (${usernames.map(u => `'${u}'`).join(',')})`);

        console.log('Found users:', users.map(u => `${u.username} (ID: ${u.id})`).join(', '));

        if (users.length === 0) {
            console.log('No users found with those usernames.');
            return;
        }

        const userIds = users.map(u => u.id);

        // Count posts before deletion
        const [beforeCount] = await sequelize.query(`SELECT COUNT(*) as count FROM "Posts" WHERE "userId" IN (${userIds.join(',')})`);
        console.log(`Posts found before deletion: ${beforeCount[0].count}`);

        // Remove posts
        const [result, metadata] = await sequelize.query(`DELETE FROM "Posts" WHERE "userId" IN (${userIds.join(',')})`);

        // Count posts after deletion
        const [afterCount] = await sequelize.query(`SELECT COUNT(*) as count FROM "Posts" WHERE "userId" IN (${userIds.join(',')})`);
        console.log(`Posts found after deletion: ${afterCount[0].count}`);

        console.log(`Successfully processed users: ${usernames.join(', ')}`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

findUsersAndRemovePosts();
