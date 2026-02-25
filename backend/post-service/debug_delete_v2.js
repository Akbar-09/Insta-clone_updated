const { Sequelize } = require('sequelize');
const fs = require('fs');
const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

async function testDelete() {
    let log = '';
    try {
        const usernames = ['akbar', 'farhan', 'ashish', 'sarfaraz'];

        const [users] = await sequelize.query(`SELECT id, username FROM "Users" WHERE username IN (${usernames.map(u => `'${u}'`).join(',')})`);
        const userIds = users.map(u => u.id);
        log += `User IDs: ${JSON.stringify(userIds)}\n`;

        const [before] = await sequelize.query(`SELECT COUNT(*) FROM "Posts" WHERE "userId" IN (${userIds.join(',')})`);
        log += `Before delete: ${JSON.stringify(before[0])}\n`;

        // Try deleting from Likes first as we know it's a blocker
        const [posts] = await sequelize.query(`SELECT id FROM "Posts" WHERE "userId" IN (${userIds.join(',')})`);
        if (posts.length > 0) {
            const postIds = posts.map(p => p.id);
            await sequelize.query(`DELETE FROM "Likes" WHERE "postId" IN (${postIds.join(',')})`);
            await sequelize.query(`DELETE FROM "SavedPosts" WHERE "postId" IN (${postIds.join(',')})`);
            await sequelize.query(`DELETE FROM "Reports" WHERE "postId" IN (${postIds.join(',')})`);
        }

        const [result, metadata] = await sequelize.query(`DELETE FROM "Posts" WHERE "userId" IN (${userIds.join(',')})`);
        log += `Delete metadata: ${JSON.stringify(metadata)}\n`;

        const [after] = await sequelize.query(`SELECT COUNT(*) FROM "Posts" WHERE "userId" IN (${userIds.join(',')})`);
        log += `After delete: ${JSON.stringify(after[0])}\n`;

        fs.writeFileSync('delete_log.txt', log);
        console.log('Results written to delete_log.txt');

    } catch (error) {
        fs.writeFileSync('delete_log.txt', log + '\nError: ' + error.message);
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

testDelete();
