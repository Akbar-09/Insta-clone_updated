require('dotenv').config();
const sequelize = require('./config/database');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('🔗 Database connected.\n');

        // Direct SQL query to check for Google URLs
        console.log('📊 Checking Posts table for Google URLs...\n');
        const [posts] = await sequelize.query(`
            SELECT id, userId, username, mediaType, mediaUrl 
            FROM Posts 
            WHERE mediaUrl LIKE '%googleapis.com%' 
               OR mediaUrl LIKE '%storage.googleapis.com%' 
               OR mediaUrl LIKE '%gtv-videos-bucket%'
            LIMIT 20
        `);

        if (posts.length > 0) {
            console.log(`❌ Found ${posts.length} posts with Google URLs:\n`);
            posts.forEach((post, i) => {
                console.log(`${i + 1}. Post ID: ${post.id}, User: ${post.username}`);
                console.log(`   Media URL: ${post.mediaUrl}`);
                console.log('');
            });

            // Delete them
            console.log('🗑️  Deleting these posts...\n');
            const [result] = await sequelize.query(`
                DELETE FROM Posts 
                WHERE mediaUrl LIKE '%googleapis.com%' 
                   OR mediaUrl LIKE '%storage.googleapis.com%' 
                   OR mediaUrl LIKE '%gtv-videos-bucket%'
            `);
            console.log(`✅ Deleted ${result.affectedRows || posts.length} posts.\n`);
        } else {
            console.log('✅ No posts with Google URLs found.\n');
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await sequelize.close();
        process.exit(0);
    }
})();
