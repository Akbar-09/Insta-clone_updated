const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'instagram',
    password: process.env.DB_PASSWORD || 'aspire123',
    port: process.env.DB_PORT || 5433,
});

async function findMedia() {
    try {
        await client.connect();
        console.log('Connected to DB:', process.env.DB_NAME || 'instagram');

        const search = '1771052299797-234362486';
        const res = await client.query(`SELECT * FROM "Media" WHERE "filename" LIKE $1 OR "url" LIKE $1 OR "r2Key" LIKE $1 OR "tempKey" LIKE $1`, [`%${search}%`]);

        if (res.rows.length === 0) {
            console.log('No records found for:', search);
        } else {
            console.log('Found records:', JSON.stringify(res.rows, null, 2));
        }

    } catch (e) {
        console.error(e);
    } finally {
        await client.end();
    }
}

findMedia();
