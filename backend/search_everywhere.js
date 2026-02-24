const Redis = require('ioredis');
const { Sequelize } = require('sequelize');

async function checkEverywhere() {
    const ports = [5432, 5433];
    const target = '1770360174825-454549326_opt.webp';

    console.log(`Searching for: ${target}`);

    // Check DBs
    for (const port of ports) {
        console.log(`\n--- DB Port ${port} ---`);
        const sequelize = new Sequelize(`postgres://postgres:postgres@localhost:${port}/postgres`, { logging: false });
        try {
            const [tables] = await sequelize.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`);
            for (const { table_name } of tables) {
                const [cols] = await sequelize.query(`
                    SELECT column_name 
                    FROM information_schema.columns 
                    WHERE table_name = '${table_name}' 
                    AND (data_type LIKE '%char%' OR data_type LIKE '%text%')
                `);

                for (const { column_name } of cols) {
                    const [matches] = await sequelize.query(`
                        SELECT * FROM "${table_name}" 
                        WHERE "${column_name}" ILIKE '%${target}%'
                    `);
                    if (matches.length > 0) {
                        console.log(`Found in table "${table_name}", column "${column_name}":`);
                        console.log(matches);
                    }
                }
            }
        } catch (e) {
            console.error(`Error on port ${port}: ${e.message}`);
        } finally {
            await sequelize.close();
        }
    }

    // Check Redis
    console.log(`\n--- Redis ---`);
    const redis = new Redis({ host: 'localhost', port: 6379 });
    try {
        let cursor = '0';
        do {
            const [newCursor, keys] = await redis.scan(cursor, 'MATCH', '*', 'COUNT', 100);
            cursor = newCursor;
            for (const key of keys) {
                const type = await redis.type(key);
                let val = '';
                if (type === 'string') val = await redis.get(key);
                else if (type === 'hash') val = JSON.stringify(await redis.hgetall(key));
                else if (type === 'list') val = JSON.stringify(await redis.lrange(key, 0, -1));

                if (val.includes(target)) {
                    console.log(`Found in Redis key "${key}" (type: ${type})`);
                }
            }
        } while (cursor !== '0');
    } catch (e) {
        console.error(`Error on Redis: ${e.message}`);
    } finally {
        redis.disconnect();
    }
}

checkEverywhere();
