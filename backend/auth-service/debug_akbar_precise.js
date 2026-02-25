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
        const res = await client.query('SELECT username, email FROM "Users" WHERE username = \'akbar\'');
        if (res.rows.length > 0) {
            const user = res.rows[0];
            console.log(`USERNAME: [${user.username}]`);
            console.log(`EMAIL: [${user.email}]`);
        } else {
            console.log('User akbar not found');
        }
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

checkUser();
