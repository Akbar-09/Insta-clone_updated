require('dotenv').config();
const sequelize = require('./config/database');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected\n');

        // Count posts with external URLs
        const [count] = await sequelize.query(`
            SELECT COUNT(*) as count
            FROM "Posts"
            WHERE "mediaUrl" ILIKE '%w3schools%'
               OR "mediaUrl" ILIKE '%http://%'
               OR "mediaUrl" ILIKE '%https://%'
        `);

        console.log(`Found ${count[0].count} posts with external URLs\n`);

        if (count[0].count > 0) {
            console.log('Deleting posts with external URLs...\n');

            // Try to delete related records, ignore errors if tables don't exist
            const tables = ['PostReports', 'Likes', 'Comments'];

            for (const table of tables) {
                try {
                    await sequelize.query(`
                        DELETE FROM "${table}"
                        WHERE "postId" IN (
                            SELECT id FROM "Posts"
                            WHERE "mediaUrl" ILIKE '%w3schools%'
                               OR "mediaUrl" ILIKE '%http://%'
                               OR "mediaUrl" ILIKE '%https://%'
                        )
                    `);
                    console.log(`  ✓ Deleted related records from ${table}`);
                } catch (e) {
                    console.log(`  ⚠ Skipped ${table}: ${e.message.split('\n')[0]}`);
                }
            }

            // Delete the posts
            const [result] = await sequelize.query(`
                DELETE FROM "Posts"
                WHERE "mediaUrl" ILIKE '%w3schools%'
                   OR "mediaUrl" ILIKE '%http://%'
                   OR "mediaUrl" ILIKE '%https://%'
            `);

            console.log(`\n✅ Deleted all posts with external URLs.`);

            // Show new count
            const [newCount] = await sequelize.query(`SELECT COUNT(*) as count FROM "Posts"`);
            console.log(`\nRemaining posts: ${newCount[0].count}`);
        } else {
            console.log('✅ No posts with external URLs found.');
        }

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await sequelize.close();
    }
})();
