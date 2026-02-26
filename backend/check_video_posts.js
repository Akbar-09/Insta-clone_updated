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
        const res = await client.query('SELECT COUNT(*) FROM "Posts" WHERE "mediaType" = \'VIDEO\'');
        console.log(`Video Posts Count: ${res.rows[0].count}`);

        const sample = await client.query('SELECT username, "mediaUrl" FROM "Posts" WHERE "mediaType" = \'VIDEO\' LIMIT 5');
        console.log('Sample Video Posts:', sample.rows);
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await client.end();
    }
}

run();
