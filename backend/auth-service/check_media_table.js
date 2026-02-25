const { Client } = require('pg');

async function run() {
    const client = new Client({
        user: 'postgres', host: 'localhost', password: 'aspire123', port: 5433, database: 'instagram'
    });
    await client.connect();
    const res = await client.query('SELECT count(*) FROM "Media" WHERE "r2Key" IS NOT NULL AND "r2Key" != \'\'');
    console.log('Total Media records with r2Key:', res.rows[0].count);

    // Find some broken ones
    const brokenRes = await client.query('SELECT id, "r2Key", url FROM "Media" WHERE "r2Key" IS NOT NULL AND "r2Key" != \'\' LIMIT 50');
    // We'll check these manually or with a script.
    console.log('Sample Media records:', JSON.stringify(brokenRes.rows.slice(0, 5), null, 2));

    await client.end();
}

run();
