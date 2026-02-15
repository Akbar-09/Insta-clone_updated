const { Client } = require('pg');

const OLD_IP = '192.168.1.15';
const NEW_IP = '192.168.1.5';

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

async function updateTable(client, tableName, columns) {
    for (const col of columns) {
        try {
            // Check if column exists
            const checkQuery = `
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = '${tableName}' AND column_name = '${col}'
            `;
            const checkRes = await client.query(checkQuery);

            if (checkRes.rowCount > 0) {
                const query = `UPDATE "${tableName}" SET "${col}" = REPLACE("${col}", '${OLD_IP}', '${NEW_IP}') WHERE "${col}" LIKE '%${OLD_IP}%'`;
                const res = await client.query(query);
                console.log(`Updated ${res.rowCount} rows in ${tableName}.${col}`);
            } else {
                // Try lowercase table name if quoted failed (or vice versa? No, checking logic is key)
            }
        } catch (e) {
            console.log(`Skipping ${tableName}.${col}: ${e.message}`);
        }
    }
}

async function updateDB(config, label) {
    const client = new Client(config);
    try {
        await client.connect();
        console.log(`Connected to ${label} (${config.database})`);

        // Get all tables
        const res = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);

        const tables = res.rows.map(r => r.table_name);
        console.log('Tables:', tables.join(', '));

        for (const table of tables) {
            let columnsToCheck = [];
            if (config.database === 'media_db') {
                if (table === 'Media' || table === 'media') columnsToCheck = ['url', 'thumbnailUrl', 'originalUrl'];
            } else {
                if (table === 'Posts' || table === 'posts') columnsToCheck = ['mediaUrl', 'thumbnailUrl'];
                if (table === 'UserProfiles' || table === 'user_profiles') columnsToCheck = ['profilePicture'];
                if (table === 'Stories' || table === 'stories') columnsToCheck = ['mediaUrl'];
                if (table === 'Reels' || table === 'reels') columnsToCheck = ['videoUrl', 'imageUrl'];
            }

            if (columnsToCheck.length > 0) {
                await updateTable(client, table, columnsToCheck);
            }
        }

    } catch (err) {
        console.error(`Error processing ${label}:`, err.message);
    } finally {
        await client.end();
    }
}

async function run() {
    await updateDB(DB_CONFIG_MEDIA, 'Media DB');
    await updateDB(DB_CONFIG_INSTAGRAM, 'Instagram DB');
}

run();
