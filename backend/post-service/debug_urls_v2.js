const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: 'instagram',
    password: process.env.DB_PASSWORD || 'aspire123',
    port: 5432,
});

async function debug() {
    try {
        await client.connect();
        console.error('Connected to instagram DB.');

        // 1. Check "dummy video 2"
        const res = await client.query(`SELECT id, caption, "mediaUrl", "mediaType" FROM "Posts" WHERE caption ILIKE '%dummy video 2%' OR caption ILIKE '%demo video 2%' LIMIT 5`);
        if (res.rows.length === 0) {
            console.error('No "dummy video 2" found. Showing random 5 posts:');
            const randomRes = await client.query(`SELECT id, caption, "mediaUrl" FROM "Posts" LIMIT 5`);
            console.error(randomRes.rows);
        } else {
            console.error('Found posts:', res.rows);
        }

        // 2. Check "Media" table existence
        const tableCheck = await client.query(`SELECT to_regclass('public."Media"')`);
        if (tableCheck.rows[0].to_regclass) {
            console.error('Media table found in instagram DB. Checking for UUID 1382da49...');
            const mediaRes = await client.query(`SELECT * FROM "Media" WHERE "tempKey" LIKE '%1382da49-c502-426b-8024-d6c9117d4665%' OR "r2Key" LIKE '%1382da49-c502-426b-8024-d6c9117d4665%'`);
            console.error('Found media records:', mediaRes.rows);
        } else {
            console.error('Media table NOT found in instagram DB.');
        }

    } catch (e) {
        console.error('Error:', e);
    } finally {
        await client.end();
    }
}

debug();
