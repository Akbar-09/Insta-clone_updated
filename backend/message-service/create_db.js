const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'postgres', // Connect to default DB
    password: process.env.DB_PASSWORD,
    port: 5432,
});

async function createDb() {
    try {
        await client.connect();
        console.log('Connected to postgres db');

        const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'message_db'");
        if (res.rowCount === 0) {
            await client.query('CREATE DATABASE message_db');
            console.log('Created message_db');
        } else {
            console.log('message_db already exists');
        }
    } catch (err) {
        console.error('Error creating database:', err);
    } finally {
        await client.end();
    }
}

createDb();
