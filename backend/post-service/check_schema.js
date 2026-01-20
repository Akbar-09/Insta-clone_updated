const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'post_db',
    password: process.env.DB_PASSWORD || 'password',
    port: 5432,
});

async function checkSchema() {
    try {
        await client.connect();
        const res = await client.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'Posts' 
            AND column_name IN ('likesCount', 'commentsCount')
        `);
        console.log('Found Columns:', res.rows);
    } catch (err) {
        console.error('Error executing query:', err.message);
    } finally {
        await client.end();
    }
}

checkSchema();
