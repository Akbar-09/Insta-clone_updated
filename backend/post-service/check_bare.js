const { Sequelize } = require('sequelize');
const fs = require('fs');
const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost', port: 5433, dialect: 'postgres', logging: false
});
seq.query(`
    SELECT id, "mediaUrl", "mediaType" FROM "Posts"
    WHERE "mediaUrl" NOT LIKE 'http%'
    AND "mediaUrl" NOT LIKE '/api/%'
    AND "mediaUrl" NOT LIKE '/uploads/%'
    ORDER BY id DESC
`)
    .then(([r]) => {
        let out = r.length > 0 ? '' : 'No bare URLs found.\n';
        r.forEach(p => out += `Post ${p.id} [${p.mediaType}]: "${p.mediaUrl}"\n`);
        fs.writeFileSync('bare_urls.txt', out);
        console.log(out || 'No bare URLs found.');
        seq.close();
    }).catch(e => { console.error(e.message); seq.close(); });
