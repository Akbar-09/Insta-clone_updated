const { Client } = require('pg');
const client = new Client({
    user: 'postgres', host: 'localhost', database: 'instagram', password: 'aspire123', port: 5433
});

async function check() {
    await client.connect();
    const res = await client.query('SELECT "mediaUrl" FROM "Posts" WHERE "mediaUrl" LIKE \'%uploads%\' LIMIT 5');
    console.log(JSON.stringify(res.rows, null, 2));
    await client.end();
}
check();
