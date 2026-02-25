const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

async function checkCounts() {
    try {
        const usernames = ['akbar', 'farhan', 'ashish', 'sarfaraz'];
        const [users] = await sequelize.query(`SELECT id, username FROM "Users" WHERE username IN (${usernames.map(u => `'${u}'`).join(',')})`);

        if (users.length === 0) {
            console.log('No users found.');
            return;
        }

        const userIds = users.map(u => u.id);
        const [counts] = await sequelize.query(`
            SELECT u.username, COUNT(p.id) as post_count
            FROM "Users" u
            LEFT JOIN "Posts" p ON u.id = p."userId"
            WHERE u.id IN (${userIds.join(',')})
            GROUP BY u.username
        `);

        console.log('Post counts per user:');
        counts.forEach(row => {
            console.log(`- ${row.username}: ${row.post_count} posts`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

checkCounts();
