const { Client } = require('pg');
const client = new Client({
    user: 'postgres', host: 'localhost', database: 'instagram', password: 'aspire123', port: 5433
});

async function check() {
    try {
        await client.connect();
        const res = await client.query('SELECT "mediaUrl", count(*) FROM "Posts" GROUP BY "mediaUrl" ORDER BY count DESC LIMIT 10');
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}
check();
