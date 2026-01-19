const { Client } = require('pg');

const tryConnect = async (password) => {
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
        console.log('Databases:', res.rows.map(r => r.datname));

        await client.end();
        return true;
    } catch (err) {
        console.log(`FAILED: Could not connect with password '${password}': ${err.message}`);
        return false;
    }
};

const run = async () => {
    console.log('Checking connection...');
    const p1 = await tryConnect('password');
    const p2 = await tryConnect('postgres123');

    if (!p1 && !p2) {
        console.log('Both passwords failed.');
    }
};

run();
