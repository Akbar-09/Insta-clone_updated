const { Client } = require('pg');

const DB_CONFIG = {
    user: 'postgres',
    host: 'localhost',
    database: 'instagram',
    password: 'aspire123',
    port: 5432,
};

const PASSWORD_HASH = '$2b$10$EgpG4YCuzFaPXspg930xX.uuX9Gf62.TObKxYvO7X7whSANwlfUL/e'; // 'password123'

const VIDEO_URLS = [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
];

const client = new Client(DB_CONFIG);

async function seed() {
    try {
        await client.connect();
        console.log('Connected to database.');

        // 1. Truncate Tables
        console.log('Clearing existing data...');
        // Order matters due to foreign keys
        // Dependent tables first
        const tables = ['Reels', 'Stories', 'Posts', 'UserProfiles', 'Users'];

        for (const table of tables) {
            try {
                // Check if table exists before truncating to avoid errors if sync hasn't run
                const check = await client.query(`SELECT to_regclass('public."${table}"')`);
                if (check.rows[0].to_regclass) {
                    await client.query(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE`);
                    console.log(`Cleared ${table}`);
                } else {
                    console.log(`Table ${table} does not exist, skipping truncate.`);
                }
            } catch (e) {
                console.log(`Error clearing ${table}: ${e.message}`);
            }
        }

        console.log('Seeding 50 users...');

        for (let i = 1; i <= 50; i++) {
            const username = `user_test_${i}`;
            const email = `user${i}@example.com`;
            const fullName = `Test User ${i}`;
            const bio = `This is the bio for user ${i}. #test #dummy`;
            const profilePicture = `https://picsum.photos/seed/${username}/200/200`;

            // Create User (Auth)
            // Using raw query to avoid model dependency issues in this script
            const userRes = await client.query(
                `INSERT INTO "Users" ("username", "email", "password", "createdAt", "updatedAt") 
                 VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id`,
                [username, email, PASSWORD_HASH]
            );
            const userId = userRes.rows[0].id;

            // Create UserProfile
            await client.query(
                `INSERT INTO "UserProfiles" ("userId", "username", "fullName", "bio", "profilePicture", "followersCount", "followingCount", "postCount", "createdAt", "updatedAt")
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())`,
                [userId, username, fullName, bio, profilePicture, Math.floor(Math.random() * 1000), Math.floor(Math.random() * 500), 0]
            );

            // Create Posts (Random 0-5)
            const postCount = Math.floor(Math.random() * 6);
            for (let j = 0; j < postCount; j++) {
                const isVideo = Math.random() > 0.8; // 20% chance of video post
                const mediaUrl = isVideo
                    ? VIDEO_URLS[Math.floor(Math.random() * VIDEO_URLS.length)]
                    : `https://picsum.photos/seed/${username}_post_${j}/600/800`;
                const mediaType = isVideo ? 'VIDEO' : 'IMAGE';

                await client.query(
                    `INSERT INTO "Posts" ("userId", "username", "caption", "mediaUrl", "mediaType", "likesCount", "commentsCount", "createdAt", "updatedAt")
                     VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`,
                    [userId, username, `Post ${j + 1} by ${username} #dummy`, mediaUrl, mediaType, Math.floor(Math.random() * 200), Math.floor(Math.random() * 20)]
                );
            }

            // Create Stories (Random 0-3 active)
            const storyCount = Math.floor(Math.random() * 4);
            for (let k = 0; k < storyCount; k++) {
                await client.query(
                    `INSERT INTO "Stories" ("userId", "username", "mediaUrl", "mediaType", "expiresAt", "createdAt", "updatedAt")
                     VALUES ($1, $2, $3, 'IMAGE', NOW() + INTERVAL '24 hours', NOW(), NOW())`,
                    [userId, username, `https://picsum.photos/seed/${username}_story_${k}/400/800`]
                );
            }

            // Create Reels (Random 0-2)
            const reelCount = Math.floor(Math.random() * 3);
            for (let l = 0; l < reelCount; l++) {
                await client.query(
                    `INSERT INTO "Reels" ("userId", "username", "caption", "videoUrl", "likesCount", "createdAt", "updatedAt")
                     VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
                    [userId, username, `Reel ${l + 1} #fun`, VIDEO_URLS[Math.floor(Math.random() * VIDEO_URLS.length)], Math.floor(Math.random() * 500)]
                );
            }
        }

        console.log('Seeding complete!');

    } catch (err) {
        console.error('Seeding error:', err);
    } finally {
        await client.end();
    }
}

seed();
