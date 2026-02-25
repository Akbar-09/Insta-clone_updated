const { Sequelize } = require('sequelize');
const fs = require('fs');
const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

async function cleanup() {
    let log = '';
    try {
        const usernames = ['akbar', 'farhan', 'ashish', 'sarfaraz'];

        const [users] = await sequelize.query(`SELECT id, username FROM "Users" WHERE username IN (${usernames.map(u => `'${u}'`).join(',')})`);
        const userIds = users.map(u => u.id);
        log += `User IDs: ${JSON.stringify(userIds)}\n`;

        // Find all post IDs
        const [posts] = await sequelize.query(`SELECT id FROM "Posts" WHERE "userId" IN (${userIds.join(',')})`);
        if (posts.length === 0) {
            log += 'No posts found to delete.\n';
            fs.writeFileSync('final_cleanup_log.txt', log);
            console.log('No posts found.');
            return;
        }

        const postIds = posts.map(p => p.id);
        log += `Post IDs to delete: ${JSON.stringify(postIds)}\n`;

        // Delete from related tables with correct names
        // We'll try-catch each to see which ones exist/fail
        const tables = [
            { name: 'Likes', column: 'postId' },
            { name: 'SavedPosts', column: 'postId' },
            { name: 'PostReports', column: 'postId' }
        ];

        for (const table of tables) {
            try {
                const [result, metadata] = await sequelize.query(`DELETE FROM "${table.name}" WHERE "${table.column}" IN (${postIds.join(',')})`);
                log += `Deleted from ${table.name}\n`;
            } catch (e) {
                log += `Failed to delete from ${table.name}: ${e.message}\n`;
            }
        }

        // Finally delete posts
        const [result, metadata] = await sequelize.query(`DELETE FROM "Posts" WHERE "id" IN (${postIds.join(',')})`);
        log += `Deleted posts: ${metadata.rowCount || 'unknown'} rows\n`;

        // Verify counts after
        const [after] = await sequelize.query(`SELECT COUNT(*) FROM "Posts" WHERE "userId" IN (${userIds.join(',')})`);
        log += `Posts remaining: ${JSON.stringify(after[0])}\n`;

        fs.writeFileSync('final_cleanup_log.txt', log);
        console.log('Cleanup completed. Results in final_cleanup_log.txt');

    } catch (error) {
        log += `Fatal Error: ${error.message}\n`;
        fs.writeFileSync('final_cleanup_log.txt', log);
        console.error('Fatal Error:', error);
    } finally {
        await sequelize.close();
    }
}

cleanup();
