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

        console.log('--- Searching for user_105 ---');
        const res105 = await client.query('SELECT * FROM "UserProfiles" WHERE username = \'user_105\' OR "fullName" LIKE \'%user_105%\'');
        console.log(JSON.stringify(res105.rows, null, 2));

        console.log('--- Searching for entries with old man photo ---');
        // The old man photo URL likely contains picsum
        const resPicsum = await client.query('SELECT username, "profilePicture" FROM "UserProfiles" WHERE "profilePicture" LIKE \'%picsum%\' LIMIT 10');
        console.log(JSON.stringify(resPicsum.rows, null, 2));

    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

checkUser();
