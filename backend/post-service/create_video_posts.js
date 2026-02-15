require('dotenv').config();
const sequelize = require('./config/database');
const Post = require('./models/Post');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected\n');

        // Real video posts using actual uploaded videos
        const videoPosts = [
            {
                userId: 5,
                username: 'user_test_5',
                caption: 'Check out this amazing video! 🎥 #video #content',
                mediaUrl: '/uploads/1770291853624-795358001_opt.mp4',
                thumbnailUrl: '/uploads/1770291853624-795358001_thumb.jpg',
                mediaType: 'VIDEO',
                likesCount: 42,
                commentsCount: 8
            },
            {
                userId: 10,
                username: 'user_test_10',
                caption: 'My latest video creation 🌟 #creative #video',
                mediaUrl: '/uploads/1770355972506-501701303_opt.mp4',
                thumbnailUrl: '/uploads/1770355972506-501701303_thumb.jpg',
                mediaType: 'VIDEO',
                likesCount: 156,
                commentsCount: 23
            },
            {
                userId: 15,
                username: 'user_test_15',
                caption: 'Amazing moments captured on video 📹 #moments #video',
                mediaUrl: '/uploads/1770359397245-601105188_opt.mp4',
                thumbnailUrl: '/uploads/1770359397245-601105188_thumb.jpg',
                mediaType: 'VIDEO',
                likesCount: 89,
                commentsCount: 12
            },
            {
                userId: 20,
                username: 'user_test_20',
                caption: 'Video content for the explore page 🎬 #explore #trending',
                mediaUrl: '/uploads/1770291853624-795358001_opt.mp4',
                thumbnailUrl: '/uploads/1770291853624-795358001_thumb.jpg',
                mediaType: 'VIDEO',
                likesCount: 203,
                commentsCount: 45
            },
            {
                userId: 25,
                username: 'user_test_25',
                caption: 'Short video clip 🎞️ #short #video',
                mediaUrl: '/uploads/1770355972506-501701303_opt.mp4',
                thumbnailUrl: '/uploads/1770355972506-501701303_thumb.jpg',
                mediaType: 'VIDEO',
                likesCount: 67,
                commentsCount: 15
            }
        ];

        console.log('Creating video posts with real uploaded videos...\n');

        for (const postData of videoPosts) {
            try {
                const post = await Post.create(postData);
                console.log(`✓ Created video post ID ${post.id} by ${post.username}`);
            } catch (e) {
                console.log(`✗ Failed to create post: ${e.message}`);
            }
        }

        console.log('\n✅ Video posts created successfully!');

        // Show new stats
        const [stats] = await sequelize.query(`
            SELECT "mediaType", COUNT(*) as count
            FROM "Posts"
            GROUP BY "mediaType"
        `);

        console.log('\nUpdated post statistics:');
        stats.forEach(s => {
            console.log(`  ${s.mediaType}: ${s.count} posts`);
        });

        console.log('\n📌 Now refresh the explore page to see videos!');

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await sequelize.close();
    }
})();
