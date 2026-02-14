const { Sequelize } = require('sequelize');

async function checkInconsistency() {
    const s = new Sequelize('instagram', 'postgres', 'aspire123', {
        host: 'localhost',
        dialect: 'postgres',
        logging: false,
    });

    try {
        console.log('Checking for userId -> multiple usernames in Posts...');
        const [rows] = await s.query(`
            SELECT "userId", array_agg(DISTINCT username) as usernames
            FROM "Posts"
            GROUP BY "userId"
            HAVING COUNT(DISTINCT username) > 1
            LIMIT 10
        `);

        console.log(`Found ${rows.length} inconsistent userIds.`);
        if (rows.length > 0) {
            console.log('Sample:', JSON.stringify(rows.slice(0, 3), null, 2));
        }

        console.log('\nChecking for username -> multiple userIds in Posts...');
        const [rows2] = await s.query(`
            SELECT username, array_agg(DISTINCT "userId") as userids
            FROM "Posts"
            GROUP BY username
            HAVING COUNT(DISTINCT "userId") > 1
            LIMIT 10
        `);
        console.log('Results:', JSON.stringify(rows2, null, 2));

    } catch (e) {
        console.error(e);
    } finally {
        await s.close();
    }
}

checkInconsistency();
