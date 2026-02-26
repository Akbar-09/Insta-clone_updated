const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'instagram',
    password: 'aspire123',
    port: 5432,
});

async function run() {
    try {
        await client.connect();
        const res = await client.query('SELECT username FROM "UserProfiles"');
        console.log('Usernames:', res.rows.map(r => r.username));
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await client.end();
    }
}

run();
