const { Client } = require('pg');

async function run() {
    const client = new Client({
        user: 'postgres', host: 'localhost', password: 'aspire123', port: 5433, database: 'instagram'
    });
    await client.connect();
    // Find a post with 2 comments
    const res = await client.query(`
        SELECT "postId", count(*) 
        FROM "Comments" 
        GROUP BY "postId" 
        HAVING count(*) = 2
        LIMIT 1
    `);

    if (res.rows.length > 0) {
        const postId = res.rows[0].postId;
        const comms = await client.query('SELECT id, text, parent_id FROM "Comments" WHERE "postId" = $1', [postId]);
        console.log(`Comments for Post ${postId}:`, JSON.stringify(comms.rows, null, 2));
    } else {
        console.log('No posts found with exactly 2 comments.');
    }
    await client.end();
}

run();
