require('dotenv').config();
const sequelize = require('./config/database');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to Reels DB\n');

        // Count reels with external URLs
        const [count] = await sequelize.query(`
            SELECT COUNT(*) as count
            FROM "Reels"
            WHERE "videoUrl" ILIKE '%w3schools%'
               OR "videoUrl" ILIKE '%http://%'
               OR "videoUrl" ILIKE '%https://%'
        `);

        console.log(`Found ${count[0].count} reels with external URLs\n`);

        if (count[0].count > 0) {
            console.log('Deleting reels with external URLs...\n');

            // Try to delete related records
            const tables = ['ReelLikes', 'ReelComments'];

            for (const table of tables) {
                try {
                    await sequelize.query(`
                        DELETE FROM "${table}"
                        WHERE "reelId" IN (
                            SELECT id FROM "Reels"
                            WHERE "videoUrl" ILIKE '%w3schools%'
                               OR "videoUrl" ILIKE '%http://%'
                               OR "videoUrl" ILIKE '%https://%'
                        )
                    `);
                    console.log(`  ✓ Deleted related records from ${table}`);
                } catch (e) {
                    console.log(`  ⚠ Skipped ${table}: ${e.message.split('\n')[0]}`);
                }
            }

            // Delete the reels
            await sequelize.query(`
                DELETE FROM "Reels"
                WHERE "videoUrl" ILIKE '%w3schools%'
                   OR "videoUrl" ILIKE '%http://%'
                   OR "videoUrl" ILIKE '%https://%'
            `);

            console.log(`\n✅ Deleted all reels with external URLs.`);

            // Show new count
            const [newCount] = await sequelize.query(`SELECT COUNT(*) as count FROM "Reels"`);
            console.log(`\nRemaining reels: ${newCount[0].count}`);
        } else {
            console.log('✅ No reels with external URLs found.');
        }

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await sequelize.close();
    }
})();
