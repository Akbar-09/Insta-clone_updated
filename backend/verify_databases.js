const { Client } = require('pg');

const databases = [
    'instagram', // auth-service
    'user_db',
    'post_db',
    'story_db',
    'comment_db',
    'notification_db',
    'search_db',
    'message_db',
    'reel_db'
];

const config = {
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    port: 5432
};

const checkDatabases = async () => {
    // First connect to postgres to check what exists
    const client = new Client({ ...config, database: 'postgres' });

    try {
        await client.connect();
        console.log('Connected to postgres successfully.');

        const res = await client.query('SELECT datname FROM pg_database');
        const existingDbs = new Set(res.rows.map(row => row.datname));

        console.log('\nChecking required databases:');
        const missing = [];
        databases.forEach(db => {
            if (existingDbs.has(db)) {
                console.log(`[PASS] ${db} exists.`);
            } else {
                console.log(`[FAIL] ${db} MISSING.`);
                missing.push(db);
            }
        });

        if (missing.length > 0) {
            console.log(`\nCreating missing databases: ${missing.join(', ')}...`);
            for (const db of missing) {
                try {
                    await client.query(`CREATE DATABASE "${db}"`);
                    console.log(`[CREATED] ${db}`);
                } catch (err) {
                    console.error(`[ERROR] Failed to create ${db}:`, err.message);
                }
            }
        } else {
            console.log('\nAll databases exist.');
        }

    } catch (err) {
        console.error('Fatal connection error:', err);
    } finally {
        await client.end();
    }
};

checkDatabases();
