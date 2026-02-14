require('dotenv').config();
const sequelize = require('./config/database');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('🔗 Database connected.\n');

        // Show all tables
        const [tables] = await sequelize.query('SHOW TABLES');
        console.log('📊 Available tables:');
        tables.forEach(t => console.log('  -', Object.values(t)[0]));
        console.log('');

        // Try to find posts with Google URLs using the Post model
        const Post = require('./models/Post');
        const { Op } = require('sequelize');

        const googlePosts = await Post.findAll({
            where: {
                [Op.or]: [
                    { mediaUrl: { [Op.like]: '%googleapis.com%' } },
                    { mediaUrl: { [Op.like]: '%storage.googleapis.com%' } },
                    { mediaUrl: { [Op.like]: '%gtv-videos-bucket%' } }
                ]
            },
            limit: 20
        });

        if (googlePosts.length > 0) {
            console.log(`❌ Found ${googlePosts.length} posts with Google URLs:\n`);
            googlePosts.forEach((post, i) => {
                console.log(`${i + 1}. Post ID: ${post.id}, User: ${post.username}`);
                console.log(`   Media URL: ${post.mediaUrl}`);
                console.log('');
            });

            // Delete them
            console.log('🗑️  Deleting these posts...\n');
            const deleted = await Post.destroy({
                where: {
                    [Op.or]: [
                        { mediaUrl: { [Op.like]: '%googleapis.com%' } },
                        { mediaUrl: { [Op.like]: '%storage.googleapis.com%' } },
                        { mediaUrl: { [Op.like]: '%gtv-videos-bucket%' } }
                    ]
                }
            });
            console.log(`✅ Deleted ${deleted} posts.\n`);
        } else {
            console.log('✅ No posts with Google URLs found.\n');
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error.stack);
    } finally {
        await sequelize.close();
        process.exit(0);
    }
})();
