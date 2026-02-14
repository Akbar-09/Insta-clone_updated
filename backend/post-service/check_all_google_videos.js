require('dotenv').config();
const sequelize = require('./config/database');
const Post = require('./models/Post');
const { Op } = require('sequelize');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('🔗 Database connected.\n');

        // Check Posts table
        console.log('📊 Checking Posts table...\n');
        const [posts] = await sequelize.query(`
            SELECT id, userId, username, mediaType, mediaUrl, thumbnailUrl 
            FROM Posts 
            WHERE mediaUrl LIKE '%googleapis.com%' 
               OR mediaUrl LIKE '%storage.googleapis.com%' 
               OR mediaUrl LIKE '%gtv-videos-bucket%'
               OR thumbnailUrl LIKE '%googleapis.com%'
               OR thumbnailUrl LIKE '%storage.googleapis.com%'
               OR thumbnailUrl LIKE '%gtv-videos-bucket%'
            LIMIT 20
        `);

        if (posts.length > 0) {
            console.log(`Found ${posts.length} posts with Google URLs:\n`);
            posts.forEach((post, i) => {
                console.log(`${i + 1}. Post ID: ${post.id}, User: ${post.username}`);
                console.log(`   Media URL: ${post.mediaUrl}`);
                console.log(`   Thumbnail: ${post.thumbnailUrl || 'N/A'}`);
                console.log('');
            });
        } else {
            console.log('✅ No posts with Google URLs found.\n');
        }

        // Check Reels table if it exists
        console.log('📊 Checking Reels table...\n');
        try {
            const [reels] = await sequelize.query(`
                SELECT id, userId, videoUrl, thumbnailUrl 
                FROM Reels 
                WHERE videoUrl LIKE '%googleapis.com%' 
                   OR videoUrl LIKE '%storage.googleapis.com%' 
                   OR videoUrl LIKE '%gtv-videos-bucket%'
                   OR thumbnailUrl LIKE '%googleapis.com%'
                   OR thumbnailUrl LIKE '%storage.googleapis.com%'
                   OR thumbnailUrl LIKE '%gtv-videos-bucket%'
                LIMIT 20
            `);

            if (reels.length > 0) {
                console.log(`Found ${reels.length} reels with Google URLs:\n`);
                reels.forEach((reel, i) => {
                    console.log(`${i + 1}. Reel ID: ${reel.id}, User ID: ${reel.userId}`);
                    console.log(`   Video URL: ${reel.videoUrl}`);
                    console.log(`   Thumbnail: ${reel.thumbnailUrl || 'N/A'}`);
                    console.log('');
                });
            } else {
                console.log('✅ No reels with Google URLs found.\n');
            }
        } catch (reelError) {
            console.log('ℹ️  Reels table does not exist or error:', reelError.message, '\n');
        }

        // Check all tables
        console.log('📊 Listing all tables in database...\n');
        const [tables] = await sequelize.query('SHOW TABLES');
        console.log('Available tables:', tables.map(t => Object.values(t)[0]).join(', '));

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
    } finally {
        await sequelize.close();
        process.exit(0);
    }
})();
