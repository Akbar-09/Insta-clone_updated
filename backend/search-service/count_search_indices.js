const { Client } = require('pg');
require('dotenv').config();

// Default to search_db if not in env
const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'search_db',
    password: process.env.DB_PASSWORD || 'password',
    port: 5432,
});

async function countSearchIndices() {
    try {
        await client.connect();
        const res = await client.query('SELECT COUNT(*) FROM "SearchIndices"');
        console.log(`Search Index Count: ${res.rows[0].count}`);
    } catch (err) {
        console.error('Error executing query:', err.message);
    } finally {
        await client.end();
    }
}

countSearchIndices();
