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
        const res = await client.query('SELECT * FROM "Comments" LIMIT 5');
        console.log('Comments:', res.rows);

        const res2 = await client.query('SELECT * FROM "CommentLikes" LIMIT 5');
        console.log('CommentLikes:', res2.rows);

        // Check columns of Comments table
        const res3 = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'Comments'");
        console.log('Comments Columns:', res3.rows);

    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

check();
