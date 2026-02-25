const { Client } = require('pg');

async function run() {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        password: 'aspire123',
        port: 5433,
        database: 'instagram'
    });
    try {
        await client.connect();
        // Check a few posts that were previously broken
        const res = await client.query('SELECT id, "mediaUrl" FROM "Posts" WHERE id IN (137, 139, 1843, 1844, 2074) ORDER BY id');
        console.log('Posts:', JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await client.end();
    }
}

run();
