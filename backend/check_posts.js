const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'instagram',
    password: 'aspire123',
    port: 5432,
});

async function check() {
    try {
        await client.connect();
        const res = await client.query('SELECT id FROM "Posts" ORDER BY id DESC LIMIT 5');
        console.log('Last 5 Post IDs:', res.rows.map(r => r.id));

        const count = await client.query('SELECT count(*) FROM "Posts"');
        console.log('Total Posts:', count.rows[0].count);

        const p138 = await client.query('SELECT * FROM "Posts" WHERE id = 138');
        console.log('Post 138 exists:', p138.rows.length > 0);
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

check();
