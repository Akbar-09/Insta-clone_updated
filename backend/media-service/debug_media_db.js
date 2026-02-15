const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: 'media_db', // Hardcode media_db as per .env
    password: process.env.DB_PASSWORD || 'aspire123',
    port: 5432,
});

async function debug() {
    try {
        await client.connect();
        console.log('Connected to media_db.');

        const uuid = '1382da49-c502-426b-8024-d6c9117d4665';
        const res = await client.query(`SELECT * FROM "Media" WHERE "tempKey" LIKE $1 OR "r2Key" LIKE $1`, [`%${uuid}%`]);
        console.log('Found media records:', res.rows);

    } catch (e) {
        console.error(e);
    } finally {
        await client.end();
    }
}

debug();
