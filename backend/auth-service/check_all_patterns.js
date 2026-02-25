const { Client } = require('pg');
const client = new Client({
    user: 'postgres', host: 'localhost', database: 'instagram', password: 'aspire123', port: 5433
});

async function check() {
    try {
        await client.connect();
        const res = await client.query('SELECT "id", "mediaUrl" FROM "Posts" LIMIT 20');
        res.rows.forEach(r => console.log(`${r.id}: ${r.mediaUrl}`));
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}
check();
