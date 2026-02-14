require('dotenv').config();
const sequelize = require('./config/database');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected\n');

        // Find VIDEO posts that don't have video file extensions
        const [wrongVideos] = await sequelize.query(`
            SELECT id, username, "mediaType", "mediaUrl"
            FROM "Posts"
            WHERE "mediaType" = 'VIDEO'
            AND "mediaUrl" NOT ILIKE '%.mp4'
            AND "mediaUrl" NOT ILIKE '%.webm'
            AND "mediaUrl" NOT ILIKE '%.mov'
            AND "mediaUrl" NOT ILIKE '%.avi'
            AND "mediaUrl" NOT ILIKE '%.m4v'
            AND "mediaUrl" NOT ILIKE '%.mkv'
            LIMIT 50
        `);

        console.log(`Found ${wrongVideos.length} posts marked as VIDEO without video extensions:\n`);

        if (wrongVideos.length > 0) {
            wrongVideos.slice(0, 10).forEach((p, i) => {
                console.log(`${i + 1}. ID ${p.id} (${p.username}): ${p.mediaUrl}`);
            });
            console.log('');

            // Fix them
            console.log(`Fixing ${wrongVideos.length} posts...\n`);

            const [result] = await sequelize.query(`
                UPDATE "Posts"
                SET "mediaType" = 'IMAGE'
                WHERE "mediaType" = 'VIDEO'
                AND "mediaUrl" NOT ILIKE '%.mp4'
                AND "mediaUrl" NOT ILIKE '%.webm'
                AND "mediaUrl" NOT ILIKE '%.mov'
                AND "mediaUrl" NOT ILIKE '%.avi'
                AND "mediaUrl" NOT ILIKE '%.m4v'
                AND "mediaUrl" NOT ILIKE '%.mkv'
            `);

            console.log('Fixed!');

            // Check new stats
            const [stats] = await sequelize.query(`
                SELECT "mediaType", COUNT(*) as count
                FROM "Posts"
                GROUP BY "mediaType"
            `);

            console.log('\nNew statistics:');
            stats.forEach(s => {
                console.log(`  ${s.mediaType}: ${s.count} posts`);
            });
        } else {
            console.log('No issues found!');
        }

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await sequelize.close();
    }
})();
