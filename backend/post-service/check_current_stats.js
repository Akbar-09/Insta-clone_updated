require('dotenv').config();
const sequelize = require('./config/database');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected\n');

        // Check post statistics
        const [stats] = await sequelize.query(`
            SELECT "mediaType", COUNT(*) as count
            FROM "Posts"
            GROUP BY "mediaType"
        `);

        console.log('Post statistics:');
        stats.forEach(s => {
            console.log(`  ${s.mediaType}: ${s.count} posts`);
        });
        console.log('');

        // Check for video posts
        const [videoPosts] = await sequelize.query(`
            SELECT id, username, "mediaType", "mediaUrl"
            FROM "Posts"
            WHERE "mediaType" = 'VIDEO'
            LIMIT 10
        `);

        console.log(`Video posts (${videoPosts.length}):`);
        videoPosts.forEach(p => {
            console.log(`  ID ${p.id}: ${p.mediaUrl}`);
        });
        console.log('');

        // Check total posts
        const [total] = await sequelize.query(`SELECT COUNT(*) as count FROM "Posts"`);
        console.log(`Total posts: ${total[0].count}`);

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await sequelize.close();
    }
})();
