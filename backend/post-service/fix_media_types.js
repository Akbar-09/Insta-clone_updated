require('dotenv').config();
const sequelize = require('./config/database');
const Post = require('./models/Post');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('🔗 Database connected.\n');

        // Find posts marked as VIDEO
        const videoPosts = await Post.findAll({
            where: { mediaType: 'VIDEO' },
            limit: 20
        });

        console.log(`📊 Found ${videoPosts.length} posts marked as VIDEO:\n`);

        videoPosts.forEach((post, i) => {
            console.log(`${i + 1}. Post ID: ${post.id}`);
            console.log(`   User: ${post.username}`);
            console.log(`   Media Type: ${post.mediaType}`);
            console.log(`   Media URL: ${post.mediaUrl}`);
            console.log(`   Is actually a video? ${post.mediaUrl && (post.mediaUrl.includes('.mp4') || post.mediaUrl.includes('.webm') || post.mediaUrl.includes('.mov'))}`);
            console.log('');
        });

        // Find posts that have video extensions but are marked as IMAGE
        const [mismarkedPosts] = await sequelize.query(`
            SELECT id, username, mediaType, "mediaUrl" 
            FROM "Posts" 
            WHERE "mediaType" = 'IMAGE' 
            AND (
                "mediaUrl" ILIKE '%.mp4' 
                OR "mediaUrl" ILIKE '%.webm' 
                OR "mediaUrl" ILIKE '%.mov'
                OR "mediaUrl" ILIKE '%.avi'
            )
            LIMIT 20
        `);

        if (mismarkedPosts.length > 0) {
            console.log(`\n⚠️  Found ${mismarkedPosts.length} posts marked as IMAGE but have video URLs:\n`);
            mismarkedPosts.forEach((post, i) => {
                console.log(`${i + 1}. Post ID: ${post.id}, Media URL: ${post.mediaUrl}`);
            });
        }

        // Find posts marked as VIDEO but have image extensions
        const [wrongVideos] = await sequelize.query(`
            SELECT id, username, mediaType, "mediaUrl" 
            FROM "Posts" 
            WHERE "mediaType" = 'VIDEO' 
            AND (
                "mediaUrl" ILIKE '%.jpg' 
                OR "mediaUrl" ILIKE '%.jpeg' 
                OR "mediaUrl" ILIKE '%.png' 
                OR "mediaUrl" ILIKE '%.gif'
                OR "mediaUrl" ILIKE '%.webp'
            )
            LIMIT 20
        `);

        if (wrongVideos.length > 0) {
            console.log(`\n❌ Found ${wrongVideos.length} posts marked as VIDEO but have image URLs:\n`);
            wrongVideos.forEach((post, i) => {
                console.log(`${i + 1}. Post ID: ${post.id}, Media URL: ${post.mediaUrl}`);
            });

            // Fix them
            console.log('\n🔧 Fixing these posts...\n');
            const [result] = await sequelize.query(`
                UPDATE "Posts" 
                SET "mediaType" = 'IMAGE' 
                WHERE "mediaType" = 'VIDEO' 
                AND (
                    "mediaUrl" ILIKE '%.jpg' 
                    OR "mediaUrl" ILIKE '%.jpeg' 
                    OR "mediaUrl" ILIKE '%.png' 
                    OR "mediaUrl" ILIKE '%.gif'
                    OR "mediaUrl" ILIKE '%.webp'
                )
            `);
            console.log(`✅ Fixed ${wrongVideos.length} posts.\n`);
        } else {
            console.log('\n✅ No posts with incorrect VIDEO mediaType found.\n');
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
    } finally {
        await sequelize.close();
        process.exit(0);
    }
})();
