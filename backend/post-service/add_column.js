const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'post_db',
    password: process.env.DB_PASSWORD || 'password',
    port: 5432,
});

async function addColumn() {
    try {
        await client.connect();
        console.log('Adding commentsCount column...');
        await client.query(`
            ALTER TABLE "Posts" 
            ADD COLUMN IF NOT EXISTS "commentsCount" INTEGER DEFAULT 0;
        `);
        console.log('Column added successfully.');
    } catch (err) {
        console.error('Migration failed:', err.message);
    } finally {
        await client.end();
    }
}

addColumn();
