const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'instagram',
    password: process.env.DB_PASSWORD || 'aspire123',
    port: process.env.DB_PORT || 5433,
});

async function listVisiblePosts() {
    try {
        await client.connect();
        const res = await client.query(`SELECT id, "mediaUrl", username FROM "Posts" WHERE username = 'farhan' LIMIT 20`);
        console.log('Posts found:', res.rows.length);

        for (const row of res.rows) {
            console.log(`Checking Post ${row.id}: ${row.mediaUrl}`);
            // We can't easily check HTTP here without a library, but we can check if it starts with Jaadoe
        }

    } catch (e) {
        console.error(e);
    } finally {
        await client.end();
    }
}

listVisiblePosts();
