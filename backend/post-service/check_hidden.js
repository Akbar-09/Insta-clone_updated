const { Sequelize } = require('sequelize');
const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost', port: 5433, dialect: 'postgres', logging: false
});

seq.query(
    `SELECT COUNT(*) as total, 
     SUM(CASE WHEN "isHidden" = false THEN 1 ELSE 0 END) as visible,
     SUM(CASE WHEN "isHidden" = true THEN 1 ELSE 0 END) as hidden
     FROM "Posts"`,
    { type: Sequelize.QueryTypes.SELECT }
).then(rows => {
    console.log('Post visibility summary:');
    console.log(`  Total posts:   ${rows[0].total}`);
    console.log(`  Visible posts: ${rows[0].visible}`);
    console.log(`  Hidden posts:  ${rows[0].hidden}`);
    return seq.query(
        `SELECT id, "mediaUrl" FROM "Posts" WHERE "isHidden" = false ORDER BY id DESC LIMIT 20`,
        { type: Sequelize.QueryTypes.SELECT }
    );
}).then(rows => {
    console.log('\nTop 20 visible posts:');
    rows.forEach(r => {
        const url = (r.mediaUrl || '').substring(0, 80);
        console.log(`  Post ${r.id}: ${url}`);
    });
    seq.close();
}).catch(e => {
    console.error('Error:', e.message);
    seq.close();
});
