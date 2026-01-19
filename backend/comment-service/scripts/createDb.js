const { Client } = require('pg');
require('dotenv').config();

const createDb = async () => {
    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: 'postgres', // Connect to default DB
        password: process.env.DB_PASSWORD,
        port: 5432,
    });

    try {
        await client.connect();
        // Check if DB exists
        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_NAME}'`);
        if (res.rowCount === 0) {
            console.log(`Creating database ${process.env.DB_NAME}...`);
            await client.query(`CREATE DATABASE "${process.env.DB_NAME}"`);
            console.log('Database created successfully.');
        } else {
            console.log('Database already exists.');
        }
    } catch (err) {
        console.error('Error creating database:', err);
    } finally {
        await client.end();
    }
};

createDb();
