const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'search_db',
    password: process.env.DB_PASSWORD || 'password',
    port: 5432,
});

async function checkSearchData() {
    try {
        await client.connect();
        const res = await client.query('SELECT * FROM "SearchIndices" WHERE content ILIKE \'%nature beauty%\'');
        console.log('Search Index Results:', res.rows);
    } catch (err) {
        console.error('Error executing query:', err.message);
    } finally {
        await client.end();
    }
}

checkSearchData();
