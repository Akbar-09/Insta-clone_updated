// Check profile picture URLs across all DB ports
const { Sequelize } = require('sequelize');

async function checkProfilePics(port) {
    const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
        host: 'localhost', port, dialect: 'postgres', logging: false
    });
    try {
        await seq.authenticate();
        const rows = await seq.query(
            `SELECT "userId", username, "profilePicture" FROM "UserProfiles" 
             WHERE "profilePicture" IS NOT NULL AND "profilePicture" != '' 
             ORDER BY "userId" DESC LIMIT 20`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        if (rows.length === 0) {
            console.log(`Port ${port}: No profiles with pictures`);
        } else {
            console.log(`\n=== Port ${port}: ${rows.length} profile(s) with pictures ===`);
            rows.forEach(r => {
                const url = (r.profilePicture || '').substring(0, 90);
                console.log(`  User ${r.userId} (${r.username}): ${url}`);
            });
        }
        await seq.close();
    } catch (e) {
        console.log(`Port ${port}: ${e.message.substring(0, 80)}`);
        await seq.close().catch(() => { });
    }
}

checkProfilePics(5432).then(() => checkProfilePics(5433)).then(() => checkProfilePics(5434));
