const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: true // TURN ON LOGGING
});

async function testDelete() {
    try {
        const usernames = ['akbar', 'farhan', 'ashish', 'sarfaraz'];

        // Find user IDs
        const [users] = await sequelize.query(`SELECT id, username FROM "Users" WHERE username IN (${usernames.map(u => `'${u}'`).join(',')})`);
        const userIds = users.map(u => u.id);

        console.log('User IDs:', userIds);

        // Count before
        const [before] = await sequelize.query(`SELECT COUNT(*) FROM "Posts" WHERE "userId" IN (${userIds.join(',')})`);
        console.log('Before delete:', before[0]);

        // Delete
        console.log('Executing DELETE...');
        const [result, metadata] = await sequelize.query(`DELETE FROM "Posts" WHERE "userId" IN (${userIds.join(',')})`);
        console.log('Delete result metadata:', metadata);

        // Count after
        const [after] = await sequelize.query(`SELECT COUNT(*) FROM "Posts" WHERE "userId" IN (${userIds.join(',')})`);
        console.log('After delete:', after[0]);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

testDelete();
