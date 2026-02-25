require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const r2CurrentKeys = new Set(
    JSON.parse(fs.readFileSync(path.join(__dirname, 'r2_current_list.json'), 'utf-8'))
);
const availableProfiles = Array.from(r2CurrentKeys).filter(k => k.includes('/profiles/'));
console.log('Available profile images:', availableProfiles.length, availableProfiles);

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    { host: process.env.DB_HOST, port: process.env.DB_PORT, dialect: 'postgres', logging: false }
);

function extractKey(url) {
    if (!url) return null;
    if (url.includes('/api/v1/media/files/')) return url.split('/api/v1/media/files/')[1];
    if (url.startsWith('/uploads/')) return url;
    return null;
}

async function run() {
    await sequelize.authenticate();

    const users = await sequelize.query(
        `SELECT id, username, "profilePicture" FROM "Users" WHERE "profilePicture" IS NOT NULL AND "profilePicture" != ''`,
        { type: Sequelize.QueryTypes.SELECT }
    );
    console.log(`\nChecking ${users.length} users with profile pictures...\n`);

    let brokenCount = 0;
    for (const user of users) {
        const key = extractKey(user.profilePicture);
        if (key && key.startsWith('Jaadoe/') && !r2CurrentKeys.has(key)) {
            console.log(`❌ ${user.username}: BROKEN profile pic: ${user.profilePicture}`);
            brokenCount++;
        }
    }
    if (brokenCount === 0) console.log('✅ All profile pictures are valid R2 keys');
    else console.log(`\n❌ ${brokenCount} users have broken profile pictures`);

    await sequelize.close();
}

run().catch(console.error);
