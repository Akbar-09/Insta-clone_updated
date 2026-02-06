const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    port: 5432,
});

async function createDb() {
    try {
        await client.connect();

        const dbName = process.env.DB_NAME || 'media_db';
        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);
        if (res.rowCount === 0) {
            await client.query(`CREATE DATABASE "${dbName}"`);
            console.log(`Created ${dbName}`);
        } else {
            console.log(`${dbName} already exists`);
        }
    } catch (err) {
        console.error('Error creating database:', err);
    } finally {
        await client.end();
    }
}

createDb();
