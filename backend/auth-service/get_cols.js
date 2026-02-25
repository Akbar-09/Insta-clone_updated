const { Client } = require('pg');

async function run() {
    const client = new Client({
        user: 'postgres', host: 'localhost', password: 'aspire123', port: 5433, database: 'instagram'
    });
    await client.connect();
    const res = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'Comments'");
    console.log('Columns:', res.rows.map(r => r.column_name));
    await client.end();
}

run();
