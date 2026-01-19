const { Client } = require('pg');

const databases = [
    'auth_db', 'user_db', 'post_db', 'story_db', 'reel_db',
    'comment_db', 'feed_db', 'notification_db', 'search_db',
    'message_db', 'media_db'
];

const connectAndSetup = async (password) => {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: password,
        port: 5432,
    });

    try {
        await client.connect();
        console.log(`SUCCESS: Connected with password '${password}'`);

        const res = await client.query('SELECT datname FROM pg_database;');
        const existingDbs = res.rows.map(r => r.datname);
        console.log('Existing DBs:', existingDbs);

        for (const db of databases) {
            if (!existingDbs.includes(db)) {
                console.log(`Creating database: ${db}`);
                try {
                    await client.query(`CREATE DATABASE ${db};`);
                    console.log(`Created ${db}`);
                } catch (e) {
                    console.error(`Failed to create ${db}: ${e.message}`);
                }
            } else {
                console.log(`Database ${db} already exists.`);
            }
        }

        await client.end();
        return true;
    } catch (err) {
        console.log(`FAILED: Could not connect with password '${password}': ${err.message}`);
        return false;
    }
};

const run = async () => {
    console.log('Trying password: "password"...');
    if (await connectAndSetup('password')) return;

    console.log('Trying password: "postgres123"...');
    if (await connectAndSetup('postgres123')) return;

    console.log('All passwords failed.');
};

run();
