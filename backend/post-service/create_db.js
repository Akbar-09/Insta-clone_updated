const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'postgres',
    password: process.env.DB_PASSWORD,
    port: 5432,
});

async function createDb() {
    try {
        await client.connect();

        const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'post_db'");
        if (res.rowCount === 0) {
            await client.query('CREATE DATABASE post_db');
            console.log('Created post_db');
        } else {
            console.log('post_db already exists');
        }
    } catch (err) {
        console.error('Error creating database:', err);
    } finally {
        await client.end();
    }
}

createDb();
