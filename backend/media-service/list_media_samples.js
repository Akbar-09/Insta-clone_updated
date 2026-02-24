const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'instagram',
    password: process.env.DB_PASSWORD || 'aspire123',
    port: process.env.DB_PORT || 5433,
});

async function listMedia() {
    try {
        await client.connect();
        const res = await client.query('SELECT count(*) FROM "Media"');
        console.log('Total media records:', res.rows[0].count);

        const samples = await client.query('SELECT * FROM "Media" LIMIT 5');
        console.log('Sample records:', JSON.stringify(samples.rows, null, 2));

    } catch (e) {
        console.error(e);
    } finally {
        await client.end();
    }
}

listMedia();
