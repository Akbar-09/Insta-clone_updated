const { Client } = require('pg');

async function run() {
    const client = new Client({
        user: 'postgres', host: 'localhost', password: 'aspire123', port: 5433, database: 'instagram'
    });
    await client.connect();
    const res = await client.query('SELECT * FROM "Posts" WHERE id = 2059');
    console.log('Post 2059 Full:', JSON.stringify(res.rows[0], null, 2));
    await client.end();
}

run();
