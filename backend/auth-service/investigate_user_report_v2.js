const { Client } = require('pg');

async function run() {
    const client = new Client({
        user: 'postgres', host: 'localhost', password: 'aspire123', port: 5433, database: 'instagram'
    });
    await client.connect();

    // Check specific post reported by user
    const postRes = await client.query('SELECT * FROM "Posts" WHERE id = 2059');
    console.log('Post 2059:', postRes.rows[0]);

    // Check user akbar
    const userRes = await client.query('SELECT id, username, "profilePicture" FROM "UserProfiles" WHERE username = \'akbar\'');
    console.log('User Akbar:', userRes.rows[0]);

    // Check Reels for akbar
    const reelsRes = await client.query('SELECT id, caption, "videoUrl" FROM "Reels" WHERE username = \'akbar\'');
    console.log('Reels for Akbar:', reelsRes.rows);

    await client.end();
}

run();
