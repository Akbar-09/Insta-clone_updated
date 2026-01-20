const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'post_db',
    password: process.env.DB_PASSWORD || 'password',
    port: 5432,
});

const VIDEO_URLS = [
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
];

async function seedVideos() {
    try {
        await client.connect();

        console.log('Seeding videos...');

        for (let i = 0; i < 15; i++) {
            const userId = Math.floor(Math.random() * 50) + 1; // Random user 1-50
            const mediaUrl = VIDEO_URLS[i % VIDEO_URLS.length];
            const caption = `Amazing video #${i + 1} #explore #video`;
            const likesCount = Math.floor(Math.random() * 500);
            const commentsCount = Math.floor(Math.random() * 50);

            await client.query(
                `INSERT INTO "Posts" ("userId", "username", "caption", "mediaUrl", "mediaType", "likesCount", "commentsCount", "createdAt", "updatedAt") 
                 VALUES ($1, $2, $3, $4, 'VIDEO', $5, $6, NOW(), NOW())`,
                [userId, `user_${userId}`, caption, mediaUrl, likesCount, commentsCount]
            );
        }

        console.log('Successfully seeded 15 video posts.');

    } catch (err) {
        console.error('Error seeding videos:', err.message);
    } finally {
        await client.end();
    }
}

seedVideos();
