const { Client } = require('pg');

async function findOldIp() {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        password: 'aspire123',
        port: 5432,
        database: 'instagram'
    });

    try {
        await client.connect();
        const res = await client.query(`
            SELECT table_name, column_name 
            FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND data_type IN ('text', 'character varying', 'jsonb')
        `);

        for (const row of res.rows) {
            try {
                const search = await client.query(`SELECT * FROM "${row.table_name}" WHERE "${row.column_name}"::text LIKE '%192.168.1.5%'`);
                if (search.rowCount > 0) {
                    console.log(`Found in ${row.table_name}.${row.column_name}: ${search.rowCount} rows`);
                }
            } catch (e) { }
        }

        // Also check media_db
        const clientMedia = new Client({
            user: 'postgres',
            host: 'localhost',
            password: 'aspire123',
            port: 5432,
            database: 'media_db'
        });
        await clientMedia.connect();
        const resMedia = await clientMedia.query(`
            SELECT table_name, column_name 
            FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND data_type IN ('text', 'character varying', 'jsonb')
        `);

        for (const row of resMedia.rows) {
            try {
                const search = await clientMedia.query(`SELECT * FROM "${row.table_name}" WHERE "${row.column_name}"::text LIKE '%192.168.1.5%'`);
                if (search.rowCount > 0) {
                    console.log(`Found in media_db.${row.table_name}.${row.column_name}: ${search.rowCount} rows`);
                }
            } catch (e) { }
        }
        await clientMedia.end();

    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

findOldIp();
