const { Client } = require('pg');
const client = new Client({
    user: 'postgres', host: 'localhost', database: 'instagram', password: 'aspire123', port: 5433
});

async function check() {
    try {
        await client.connect();
        const res = await client.query('SELECT count(*) FROM "Media"');
        console.log("Media Count:", res.rows[0].count);

        const res2 = await client.query('SELECT count(*) FROM "Posts"');
        console.log("Posts Count:", res2.rows[0].count);
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}
check();
