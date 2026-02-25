const { Client } = require('pg');

async function run() {
    const client = new Client({
        user: 'postgres', host: 'localhost', password: 'aspire123', port: 5433, database: 'instagram'
    });
    await client.connect();
    // Find reels/posts with exactly 2 comments
    const res = await client.query(`
        SELECT "postId", count(*) 
        FROM "Comments" 
        GROUP BY "postId" 
        HAVING count(*) = 2
    `);
    console.log('Post IDs with 2 comments:', res.rows);

    if (res.rows.length > 0) {
        const postId = res.rows[0].postId;
        const comms = await client.query('SELECT id, text, "parentId" FROM "Comments" WHERE "postId" = $1', [postId]);
        console.log(`Comments for Post ${postId}:`, comms.rows);
    }
    await client.end();
}

run();
