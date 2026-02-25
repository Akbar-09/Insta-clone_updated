const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'instagram',
    password: 'aspire123',
    port: 5433
});

async function checkUser() {
    try {
        await client.connect();
        const res = await client.query('SELECT id, username, email, password FROM "Users" WHERE email = \'akbar@example.com\' OR username = \'akbar\'');
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

checkUser();
