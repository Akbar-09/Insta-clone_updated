const { Sequelize } = require('sequelize');
const fs = require('fs');
const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost', port: 5432, dialect: 'postgres', logging: false
});
seq.query(`
    SELECT "userId", username, "profilePicture" FROM "UserProfiles"
    WHERE "profilePicture" IS NOT NULL AND "profilePicture" != ''
    AND "profilePicture" NOT LIKE 'http%'
    AND "profilePicture" NOT LIKE '/api/%'
    ORDER BY "userId" DESC
    LIMIT 20
`)
    .then(([r]) => {
        let out = r.length > 0 ? `Found ${r.length} profiles with non-http, non-api profilePicture:\n` : 'No bare profile picture URLs found.\n';
        r.forEach(p => out += `User ${p.userId} (${p.username}): "${p.profilePicture}"\n`);
        fs.writeFileSync('profile_urls.txt', out);
        console.log(out);
        seq.close();
    }).catch(e => {
        // try port 5433
        console.log('Trying port 5433...');
        const seq2 = new Sequelize('instagram', 'postgres', 'aspire123', {
            host: 'localhost', port: 5433, dialect: 'postgres', logging: false
        });
        seq2.query(`
        SELECT "userId", username, "profilePicture" FROM "UserProfiles"
        WHERE "profilePicture" IS NOT NULL AND "profilePicture" != ''
        AND "profilePicture" NOT LIKE 'http%'
        AND "profilePicture" NOT LIKE '/api/%'
        LIMIT 20
    `).then(([r]) => {
            let out = r.length > 0 ? `Found ${r.length} profiles:\n` : 'All OK.\n';
            r.forEach(p => out += `User ${p.userId} (${p.username}): "${p.profilePicture}"\n`);
            fs.writeFileSync('profile_urls.txt', out);
            console.log(out);
            seq2.close();
        }).catch(e2 => { console.error(e2.message); seq2.close(); });
    });
