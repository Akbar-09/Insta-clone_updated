require('dotenv').config();
const sequelize = require('./config/database');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to Ad Service DB\n');

        // Check for ad media with temp paths
        const [mediaWithTemp] = await sequelize.query(`
            SELECT id, "adId", "mediaType", url, "thumbnailUrl"
            FROM ad_media
            WHERE url ILIKE '%/temp/%'
               OR "thumbnailUrl" ILIKE '%/temp/%'
            LIMIT 50
        `);

        console.log(`Found ${mediaWithTemp.length} ad media items with /temp/ paths:\n`);

        if (mediaWithTemp.length > 0) {
            mediaWithTemp.slice(0, 10).forEach((media, i) => {
                console.log(`${i + 1}. Media ID ${media.id} (Ad: ${media.adId})`);
                console.log(`   Type: ${media.mediaType}`);
                console.log(`   URL: ${media.url}`);
                if (media.thumbnailUrl) {
                    console.log(`   Thumb: ${media.thumbnailUrl}`);
                }
                console.log('');
            });

            // Delete these ad media items
            console.log(`\nDeleting ${mediaWithTemp.length} ad media items with temp paths...\n`);
            const [result] = await sequelize.query(`
                DELETE FROM ad_media
                WHERE url ILIKE '%/temp/%'
                   OR "thumbnailUrl" ILIKE '%/temp/%'
            `);
            console.log(`✅ Deleted ad media items with temp paths.\n`);
        } else {
            console.log('✅ No ad media with /temp/ paths found.\n');
        }

        // Show final stats
        const [total] = await sequelize.query(`SELECT COUNT(*) as count FROM ad_media`);
        console.log(`Remaining ad media items: ${total[0].count}`);

        // Also check for orphaned ads (ads without media)
        const [orphanedAds] = await sequelize.query(`
            SELECT a.id, a."userId", a.status
            FROM ads a
            LEFT JOIN ad_media am ON a.id = am."adId"
            WHERE am.id IS NULL
            LIMIT 20
        `);

        if (orphanedAds.length > 0) {
            console.log(`\n⚠️  Found ${orphanedAds.length} ads without media (orphaned):`);
            orphanedAds.slice(0, 5).forEach((ad, i) => {
                console.log(`  ${i + 1}. Ad ID ${ad.id} (User: ${ad.userId}, Status: ${ad.status})`);
            });

            console.log('\nDeleting orphaned ads...');
            await sequelize.query(`
                DELETE FROM ads
                WHERE id IN (
                    SELECT a.id
                    FROM ads a
                    LEFT JOIN ad_media am ON a.id = am."adId"
                    WHERE am.id IS NULL
                )
            `);
            console.log('✅ Deleted orphaned ads.\n');
        }

    } catch (error) {
        console.error('Error:', error.message);
        console.error(error);
    } finally {
        await sequelize.close();
    }
})();
