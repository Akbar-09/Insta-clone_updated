const { Client } = require('pg');

async function check(port) {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'instagram',
        password: 'aspire123',
        port: port
    });
    try {
        await client.connect();
        const res = await client.query('SELECT count(*) FROM "Users"');
        console.log(`Port ${port}: ${res.rows[0].count} users`);
    } catch (err) {
        console.log(`Port ${port}: Error connecting (${err.message})`);
    } finally {
        await client.end();
    }
}

async function run() {
    await check(5432);
    await check(5433);
}

run();
