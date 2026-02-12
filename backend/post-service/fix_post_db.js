const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: 'post_db', // Check post_db explicitly
    password: process.env.DB_PASSWORD || 'aspire123',
    port: 5432,
});

async function debug() {
    try {
        await client.connect();
        console.error('Connected to post_db.');

        const res = await client.query(`SELECT id, caption, "mediaUrl" FROM "Posts" WHERE caption ILIKE '%dummy video 2%' OR caption ILIKE '%demo video 2%'`);
        console.error('Found posts in post_db:', res.rows);

        // Fix them if found
        if (res.rows.length > 0) {
            const BAD_URL = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
            const GOOD_URL = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

            await client.query(`UPDATE "Posts" SET "mediaUrl" = $1 WHERE "mediaUrl" = $2`, [GOOD_URL, BAD_URL]);
            console.error('Fixed Bad URLs in post_db');
        }

    } catch (e) {
        console.error('Error connecting/querying post_db:', e.message);
    } finally {
        await client.end();
    }
}

debug();
