const { Sequelize } = require('sequelize');
const fs = require('fs');

const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost', port: 5433, dialect: 'postgres', logging: false
});

async function main() {
    let out = '';
    try {
        const [activeBroken] = await seq.query(`
            SELECT id, "mediaUrl" FROM "Posts"
            WHERE "isHidden" = false
              AND "mediaUrl" NOT LIKE 'http%'
              AND "mediaUrl" NOT LIKE '/api/v1/media%'
            LIMIT 5
        `);
        out += activeBroken.length === 0
            ? 'ALL ACTIVE POSTS HAVE VALID MEDIA URLS\n'
            : `WARNING: ${activeBroken.length} active posts have broken URLs\n`;

        const [[{ total }]] = await seq.query(`SELECT COUNT(*) as total FROM "Posts"`);
        const [[{ hidden }]] = await seq.query(`SELECT COUNT(*) as hidden FROM "Posts" WHERE "isHidden" = true`);
        const [[{ active }]] = await seq.query(`SELECT COUNT(*) as active FROM "Posts" WHERE "isHidden" = false`);
        const [[{ r2 }]] = await seq.query(`SELECT COUNT(*) as r2 FROM "Posts" WHERE "mediaUrl" LIKE '/api/v1/media%' AND "isHidden" = false`);

        out += `\nTotal posts:       ${total}\n`;
        out += `Hidden posts:      ${hidden}\n`;
        out += `Active posts:      ${active}\n`;
        out += `Active R2 posts:   ${r2}\n`;

        const [hiddenReel] = await seq.query(`SELECT COUNT(*) as cnt FROM "Reels" WHERE "isHidden" = true`);
        out += `Hidden reels:      ${hiddenReel[0].cnt}\n`;

        const [profileOk] = await seq.query(`
            SELECT COUNT(*) as cnt FROM "UserProfiles"
            WHERE "profilePicture" != '' AND "profilePicture" NOT LIKE 'http%' AND "profilePicture" NOT LIKE '/api/%'
        `);
        out += `Profile pic issues: ${profileOk[0].cnt}\n`;

    } catch (e) { out += 'Error: ' + e.message; }
    finally {
        await seq.close();
        fs.writeFileSync('final_status.txt', out);
        console.log(out);
    }
}
main();
