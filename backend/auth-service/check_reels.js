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
        const res = await client.query('SELECT id, "videoUrl" FROM "Reels" WHERE "videoUrl" LIKE \'%1771053937764-231248378%\' LIMIT 10');
        console.log('Broken Reels:', JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await client.end();
    }
}

run();
