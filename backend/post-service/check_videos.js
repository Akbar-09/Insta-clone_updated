const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'post_db',
    password: process.env.DB_PASSWORD || 'password',
    port: 5432,
});

async function checkVideoPosts() {
    try {
        await client.connect();
        const res = await client.query('SELECT count(*) FROM "Posts" WHERE "mediaType" = \'VIDEO\'');
        console.log('Video Posts Count:', res.rows[0].count);

        const total = await client.query('SELECT count(*) FROM "Posts"');
        console.log('Total Posts Count:', total.rows[0].count);
    } catch (err) {
        console.error('Error executing query:', err.message);
    } finally {
        await client.end();
    }
}

checkVideoPosts();
