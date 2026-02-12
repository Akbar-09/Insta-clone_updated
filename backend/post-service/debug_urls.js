const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'instagram',
    password: process.env.DB_PASSWORD || 'aspire123',
    port: 5432,
});

async function debug() {
    try {
        await client.connect();
        console.log('Connected.');

        // 1. Check "dummy video 2"
        const res = await client.query(`SELECT id, caption, "mediaUrl" FROM "Posts" WHERE caption LIKE '%dummy video 2%' OR caption LIKE '%demo video 2%'`);
        console.log('Found posts:', res.rows);

        // 2. Check broken UUID
        // The UUID from error: 1382da49-c502-426b-8024-d6c9117d4665
        // It could be in "mediaUrl" of a Post, or in "AdMedia" or "Media" table.
        // It's likely a Media record.
        // Let's check "Media" table (media-service DB) - wait, media service uses sqlite? No, sequelize config.
        // media-service likely uses 'media_db' or 'instagram' DB?
        // Let's check media-service .env in next step.
        // Assuming it uses same DB for now or I'll check 'Media' table if it exists in 'instagram' DB.

        const tableCheck = await client.query(`SELECT to_regclass('public."Media"')`);
        if (tableCheck.rows[0].to_regclass) {
            const mediaRes = await client.query(`SELECT * FROM "Media" WHERE "tempKey" LIKE '%1382da49-c502-426b-8024-d6c9117d4665%' OR "r2Key" LIKE '%1382da49-c502-426b-8024-d6c9117d4665%'`);
            console.log('Found media records:', mediaRes.rows);
        } else {
            console.log('Media table not found in this DB.');
        }

    } catch (e) {
        console.error(e);
    } finally {
        await client.end();
    }
}

debug();
