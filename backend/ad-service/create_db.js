const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'aspire123',
    port: 5432,
});

async function createDb() {
    try {
        await client.connect();
        await client.query('CREATE DATABASE ad_db');
        console.log('Database ad_db created successfully');
    } catch (err) {
        if (err.code === '42P04') { // Duplicate database
            console.log('Database ad_db already exists');
        } else {
            console.error('Error creating database:', err);
        }
    } finally {
        await client.end();
    }
}

createDb();
