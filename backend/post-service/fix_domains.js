const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: 'instagram', // Main DB
    password: process.env.DB_PASSWORD || 'aspire123',
    port: 5432,
});

async function fix() {
    try {
        await client.connect();
        console.log('Connected to DB.');

        // Replace commondatastorage.googleapis.com with storage.googleapis.com
        const oldDomain = 'commondatastorage.googleapis.com';
        const newDomain = 'storage.googleapis.com';

        // Fix Posts
        const resPosts = await client.query(
            `UPDATE "Posts" 
             SET "mediaUrl" = REPLACE("mediaUrl", $1, $2) 
             WHERE "mediaUrl" LIKE $3`,
            [oldDomain, newDomain, `%${oldDomain}%`]
        );
        console.log(`Updated ${resPosts.rowCount} posts.`);

        // Fix Reels
        const resReels = await client.query(
            `UPDATE "Reels" 
             SET "videoUrl" = REPLACE("videoUrl", $1, $2) 
             WHERE "videoUrl" LIKE $3`,
            [oldDomain, newDomain, `%${oldDomain}%`]
        );
        console.log(`Updated ${resReels.rowCount} reels.`);

    } catch (e) {
        console.error(e);
    } finally {
        await client.end();
    }
}

fix();
