require('dotenv').config();
const sequelize = require('./config/database');
const Post = require('./models/Post');
const { Op } = require('sequelize');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('🔗 Database connected (PostgreSQL).\n');
        console.log('🔍 Searching for posts with Google APIs video URLs...\n');

        // Find all posts with Google storage URLs
        const googleVideoPosts = await Post.findAll({
            where: {
                [Op.or]: [
                    { mediaUrl: { [Op.iLike]: '%googleapis.com%' } },
                    { mediaUrl: { [Op.iLike]: '%storage.googleapis.com%' } },
                    { mediaUrl: { [Op.iLike]: '%gtv-videos-bucket%' } }
                ]
            }
        });

        if (googleVideoPosts.length === 0) {
            console.log('✅ No posts found with Google APIs video URLs.');
            await sequelize.close();
            process.exit(0);
        }

        console.log(`📊 Found ${googleVideoPosts.length} post(s) with Google APIs video URLs:\n`);

        // Display details of posts to be deleted
        googleVideoPosts.forEach((post, index) => {
            console.log(`${index + 1}. Post ID: ${post.id}`);
            console.log(`   User ID: ${post.userId}`);
            console.log(`   Username: ${post.username}`);
            console.log(`   Media Type: ${post.mediaType}`);
            console.log(`   Media URL: ${post.mediaUrl || 'N/A'}`);
            console.log(`   Caption: ${post.caption ? post.caption.substring(0, 50) + '...' : 'N/A'}`);
            console.log(`   Created: ${post.createdAt}`);
            console.log('');
        });

        // Delete the posts
        console.log('🗑️  Deleting posts...\n');

        const deletedCount = await Post.destroy({
            where: {
                [Op.or]: [
                    { mediaUrl: { [Op.iLike]: '%googleapis.com%' } },
                    { mediaUrl: { [Op.iLike]: '%storage.googleapis.com%' } },
                    { mediaUrl: { [Op.iLike]: '%gtv-videos-bucket%' } }
                ]
            }
        });

        console.log(`✅ Successfully deleted ${deletedCount} post(s) with Google APIs video URLs.`);
        console.log('\n🎉 Cleanup complete!');

    } catch (error) {
        console.error('❌ Error removing Google API videos:', error.message);
        console.error(error);
        process.exit(1);
    } finally {
        await sequelize.close();
        process.exit(0);
    }
})();
