const { Client } = require('pg');

const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'instagram',
    password: 'aspire123',
    port: 5432,
};

async function check() {
    const client = new Client(config);
    await client.connect();
    const res = await client.query('SELECT "mediaUrl" FROM "Posts" LIMIT 5');
    console.log(JSON.stringify(res.rows, null, 2));
    await client.end();
}

check().catch(console.error);
