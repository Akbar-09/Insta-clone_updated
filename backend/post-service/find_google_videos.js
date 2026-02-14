require('dotenv').config();
const sequelize = require('./config/database');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('🔗 Database connected.\n');

        // Check all tables
        console.log('📊 Listing all tables in database...\n');
        const [tables] = await sequelize.query('SHOW TABLES');
        console.log('Available tables:');
        tables.forEach(t => console.log('  -', Object.values(t)[0]));
        console.log('');

        // Get table name (case-sensitive)
        const tableName = tables.find(t =>
            Object.values(t)[0].toLowerCase() === 'posts'
        );

        if (tableName) {
            const actualTableName = Object.values(tableName)[0];
            console.log(`Found Posts table as: ${actualTableName}\n`);

            // Check Posts table
            console.log('📊 Checking for Google API videos...\n');
            const [posts] = await sequelize.query(`
                SELECT id, userId, username, mediaType, mediaUrl, thumbnailUrl 
                FROM ${actualTableName}
                WHERE mediaUrl LIKE '%googleapis.com%' 
                   OR mediaUrl LIKE '%storage.googleapis.com%' 
                   OR mediaUrl LIKE '%gtv-videos-bucket%'
                   OR thumbnailUrl LIKE '%googleapis.com%'
                   OR thumbnailUrl LIKE '%storage.googleapis.com%'
                   OR thumbnailUrl LIKE '%gtv-videos-bucket%'
                LIMIT 20
            `);

            if (posts.length > 0) {
                console.log(`❌ Found ${posts.length} posts with Google URLs:\n`);
                posts.forEach((post, i) => {
                    console.log(`${i + 1}. Post ID: ${post.id}, User: ${post.username}`);
                    console.log(`   Media URL: ${post.mediaUrl}`);
                    console.log(`   Thumbnail: ${post.thumbnailUrl || 'N/A'}`);
                    console.log('');
                });
            } else {
                console.log('✅ No posts with Google URLs found.\n');
            }
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await sequelize.close();
        process.exit(0);
    }
})();
