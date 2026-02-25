const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

async function findUsers() {
    try {
        const usernames = ['must0', 'akshaykummar', 'tanmay'];
        const [users] = await sequelize.query(
            `SELECT id, username FROM "Users" WHERE username IN (:usernames)`,
            { replacements: { usernames } }
        );

        console.log('Found Users:', users);

        if (users.length === 0) {
            console.log('No users found.');
            return;
        }

        const userIds = users.map(u => u.id);
        console.log('User IDs to delete:', userIds);

        // Count posts
        const [postCount] = await sequelize.query(
            `SELECT COUNT(*) FROM "Posts" WHERE "userId" IN (:userIds)`,
            { replacements: { userIds } }
        );
        console.log('Post count for these users:', postCount[0].count);

    } catch (err) {
        console.error('Error finding users:', err.message);
    } finally {
        await sequelize.close();
    }
}

findUsers();
