const { Client } = require('pg');

async function checkUser() {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        password: 'aspire123',
        port: 5432,
        database: 'instagram'
    });

    try {
        await client.connect();

        console.log('--- Searching for sarfaraz in Users table ---');
        const resUsers = await client.query('SELECT id, username FROM "Users" WHERE username LIKE \'%sarfaraz%\'');
        console.log(JSON.stringify(resUsers.rows, null, 2));

        console.log('--- Searching for sarfaraz in UserProfiles table ---');
        const resProfiles = await client.query('SELECT userId, username, "profilePicture" FROM "UserProfiles" WHERE username LIKE \'%sarfaraz%\'');
        console.log(JSON.stringify(resProfiles.rows, null, 2));

        if (resProfiles.rows.length > 0) {
            const userId = resProfiles.rows[0].userId;
            console.log(`--- Checking AccountHistory for userId ${userId} ---`);
            const resHistory = await client.query('SELECT * FROM "AccountHistories" WHERE "userId" = $1 ORDER BY "createdAt" DESC LIMIT 10', [userId]);
            console.log(JSON.stringify(resHistory.rows, null, 2));
        }

    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

checkUser();
