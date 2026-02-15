require('dotenv').config();
const sequelize = require('./config/database');
const Post = require('./models/Post');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected\n');

        // Sample video posts with local/relative URLs
        // Replace these with actual uploaded video URLs from your media service
        const sampleVideoPosts = [
            {
                userId: 5,
                username: 'user_test_5',
                caption: 'Amazing sunset timelapse #nature #sunset',
                mediaUrl: '/uploads/videos/sunset_timelapse.mp4',
                thumbnailUrl: '/uploads/thumbnails/sunset_thumb.jpg',
                mediaType: 'VIDEO',
                likesCount: 42,
                commentsCount: 8
            },
            {
                userId: 10,
                username: 'user_test_10',
                caption: 'City life 🌆 #urban #cityscape',
                mediaUrl: '/uploads/videos/city_life.mp4',
                thumbnailUrl: '/uploads/thumbnails/city_thumb.jpg',
                mediaType: 'VIDEO',
                likesCount: 156,
                commentsCount: 23
            },
            {
                userId: 15,
                username: 'user_test_15',
                caption: 'Beach waves 🌊 #ocean #relaxing',
                mediaUrl: '/uploads/videos/beach_waves.mp4',
                thumbnailUrl: '/uploads/thumbnails/beach_thumb.jpg',
                mediaType: 'VIDEO',
                likesCount: 89,
                commentsCount: 12
            }
        ];

        console.log('Creating sample video posts...\n');

        for (const postData of sampleVideoPosts) {
            try {
                const post = await Post.create(postData);
                console.log(`✓ Created video post ID ${post.id} by ${post.username}`);
            } catch (e) {
                console.log(`✗ Failed to create post: ${e.message}`);
            }
        }

        console.log('\n✅ Sample video posts created!');
        console.log('\nNote: These posts use placeholder URLs. You should:');
        console.log('1. Upload actual videos through the app, OR');
        console.log('2. Update these posts with real uploaded video URLs');

        // Show new stats
        const [stats] = await sequelize.query(`
            SELECT "mediaType", COUNT(*) as count
            FROM "Posts"
            GROUP BY "mediaType"
        `);

        console.log('\nNew post statistics:');
        stats.forEach(s => {
            console.log(`  ${s.mediaType}: ${s.count} posts`);
        });

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await sequelize.close();
    }
})();
