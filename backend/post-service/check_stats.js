require('dotenv').config();
const sequelize = require('./config/database');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected\n');

        // Check current state
        const [stats] = await sequelize.query(`
            SELECT "mediaType", COUNT(*) as count
            FROM "Posts"
            GROUP BY "mediaType"
        `);

        console.log('Current post statistics:');
        stats.forEach(s => {
            console.log(`  ${s.mediaType}: ${s.count} posts`);
        });
        console.log('');

        // Show some VIDEO posts
        const [videoPosts] = await sequelize.query(`
            SELECT id, username, "mediaType", "mediaUrl"
            FROM "Posts"
            WHERE "mediaType" = 'VIDEO'
            LIMIT 5
        `);

        if (videoPosts.length > 0) {
            console.log('Sample VIDEO posts:');
            videoPosts.forEach(p => {
                const ext = p.mediaUrl ? p.mediaUrl.split('.').pop().toLowerCase() : 'unknown';
                console.log(`  ID ${p.id}: ${p.mediaUrl} (ext: ${ext})`);
            });
        }

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await sequelize.close();
    }
})();
