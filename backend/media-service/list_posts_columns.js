const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'instagram',
    password: process.env.DB_PASSWORD || 'aspire123',
    port: process.env.DB_PORT || 5433,
});

async function listColumns() {
    try {
        await client.connect();
        const res = await client.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'Posts'
        `);
        console.log('Columns in Posts table:', res.rows.map(r => r.column_name));
    } catch (e) {
        console.error(e);
    } finally {
        await client.end();
    }
}

listColumns();
