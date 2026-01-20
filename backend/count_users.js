const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'user_db',
    password: 'password',
    port: 5432,
});

async function countUsers() {
    try {
        await client.connect();
        const res = await client.query('SELECT COUNT(*) FROM "UserProfiles"');
        console.log(`User Count: ${res.rows[0].count}`);
    } catch (err) {
        console.error('Error executing query:', err.message);
        // Fallback: check if table name is different (sequelize often pluralizes)
        try {
            const res2 = await client.query('SELECT COUNT(*) FROM "UserProfile"');
            console.log(`User Count (UserProfile): ${res2.rows[0].count}`);
        } catch (ignored) { }
    } finally {
        await client.end();
    }
}

countUsers();
