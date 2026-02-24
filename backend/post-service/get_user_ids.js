const { Sequelize } = require('sequelize');
const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost', port: 5433, dialect: 'postgres', logging: false
});

seq.query('SELECT DISTINCT "userId" FROM "Posts" WHERE "isHidden" = false', {
    type: Sequelize.QueryTypes.SELECT
}).then(rows => {
    console.log('Visible post userIds:', rows.map(x => x.userId).join(','));
    seq.close();
}).catch(e => {
    console.error(e.message);
    seq.close();
});
