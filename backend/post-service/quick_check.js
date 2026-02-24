const { Sequelize } = require('sequelize');
const fs = require('fs');
const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost', port: 5433, dialect: 'postgres', logging: false
});
seq.query(`SELECT id, "mediaUrl", "mediaType" FROM "Posts" ORDER BY id DESC LIMIT 20`)
    .then(([r]) => {
        let out = '';
        r.forEach(p => out += `Post ${p.id} [${p.mediaType}]: ${p.mediaUrl}\n`);
        fs.writeFileSync('url_status.txt', out);
        console.log(out);
        seq.close();
    }).catch(e => { console.error(e.message); seq.close(); });
