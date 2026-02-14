const { Client } = require('pg');

const OLD_IP = '192.168.1.15';

const DB_CONFIG_MEDIA = {
    user: 'postgres',
    host: 'localhost',
    database: 'media_db',
    password: 'aspire123',
    port: 5432,
};

const DB_CONFIG_INSTAGRAM = {
    user: 'postgres',
    host: 'localhost',
    database: 'instagram',
    password: 'aspire123',
    port: 5432,
};

async function checkTable(client, tableName, columns) {
    for (const col of columns) {
        try {
            const query = `SELECT count(*) FROM "${tableName}" WHERE "${col}" LIKE '%${OLD_IP}%'`;
            const res = await client.query(query);
            if (parseInt(res.rows[0].count) > 0) {
                console.log(`[FOUND] ${tableName}.${col} has ${res.rows[0].count} records with old IP`);

                // Show a sample
                const sampleQuery = `SELECT "${col}" FROM "${tableName}" WHERE "${col}" LIKE '%${OLD_IP}%' LIMIT 1`;
                const sampleRes = await client.query(sampleQuery);
                console.log(`   Sample: ${sampleRes.rows[0][col]}`);
            } else {
                console.log(`[CLEAN] ${tableName}.${col}`);
            }
        } catch (e) {
            console.log(`Skipping check for ${tableName}.${col}: ${e.message}`);
        }
    }
}

async function checkDB(config, label) {
    const client = new Client(config);
    try {
        await client.connect();
        console.log(`Checking ${label}...`);

        if (config.database === 'media_db') {
            await checkTable(client, 'Media', ['url', 'thumbnailUrl', 'originalUrl']);
        } else {
            await checkTable(client, 'Posts', ['mediaUrl', 'thumbnailUrl']);
            await checkTable(client, 'UserProfiles', ['profilePicture']);
            await checkTable(client, 'Stories', ['mediaUrl']);
        }

    } catch (err) {
        console.error(`Error checking ${label}:`, err.message);
    } finally {
        await client.end();
    }
}

async function run() {
    await checkDB(DB_CONFIG_MEDIA, 'Media DB');
    await checkDB(DB_CONFIG_INSTAGRAM, 'Instagram DB');
}

run();
