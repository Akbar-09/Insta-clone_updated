require('dotenv').config();
const sequelize = require('./config/database');
const Post = require('./models/Post');

const IMAGE_URLS = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
    'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80'
];

const VIDEO_URLS = [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
];

async function seedContent() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        console.log('Seeding 20 Images...');
        for (let i = 0; i < 20; i++) {
            const userId = Math.floor(Math.random() * 50) + 100; // Users 100-150
            const url = IMAGE_URLS[i % IMAGE_URLS.length];
            await Post.create({
                userId,
                username: `user_${userId}`,
                caption: `Beautiful photo ${i + 1} #photo #explore`,
                mediaUrl: url,
                mediaType: 'IMAGE',
                likesCount: Math.floor(Math.random() * 2000),
                commentsCount: Math.floor(Math.random() * 200)
            });
        }

        console.log('Seeding 10 Videos (Reels)...');
        for (let i = 0; i < 10; i++) {
            const userId = Math.floor(Math.random() * 50) + 100;
            const url = VIDEO_URLS[i % VIDEO_URLS.length];
            await Post.create({
                userId,
                username: `creator_${userId}`,
                caption: `Awesome reel ${i + 1} #reel #viral`,
                mediaUrl: url,
                mediaType: 'VIDEO',
                likesCount: Math.floor(Math.random() * 5000),
                commentsCount: Math.floor(Math.random() * 500)
            });
        }

        console.log('Seeding Complete! Added 30 mixed items.');

    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await sequelize.close();
    }
}

seedContent();
