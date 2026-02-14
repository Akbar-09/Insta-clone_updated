require('dotenv').config();
const sequelize = require('./config/database');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected\n');

        // Check for posts with temp paths
        const [postsWithTemp] = await sequelize.query(`
            SELECT id, username, "mediaUrl", "thumbnailUrl"
            FROM "Posts"
            WHERE "mediaUrl" ILIKE '%/temp/%'
               OR "thumbnailUrl" ILIKE '%/temp/%'
            LIMIT 20
        `);

        console.log(`Found ${postsWithTemp.length} posts with /temp/ paths:\n`);

        if (postsWithTemp.length > 0) {
            postsWithTemp.forEach((post, i) => {
                console.log(`${i + 1}. Post ID ${post.id} (${post.username})`);
                console.log(`   Media: ${post.mediaUrl}`);
                if (post.thumbnailUrl) {
                    console.log(`   Thumb: ${post.thumbnailUrl}`);
                }
                console.log('');
            });

            // Delete these posts
            console.log('Deleting posts with temp paths...\n');
            const [result] = await sequelize.query(`
                DELETE FROM "Posts"
                WHERE "mediaUrl" ILIKE '%/temp/%'
                   OR "thumbnailUrl" ILIKE '%/temp/%'
            `);
            console.log(`✅ Deleted posts with temp paths.\n`);
        } else {
            console.log('✅ No posts with /temp/ paths found.\n');
        }

        // Show final stats
        const [total] = await sequelize.query(`SELECT COUNT(*) as count FROM "Posts"`);
        console.log(`Remaining posts: ${total[0].count}`);

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await sequelize.close();
    }
})();
