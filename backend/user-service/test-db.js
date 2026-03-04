const { Sequelize } = require('sequelize');
const s = new Sequelize('postgres://postgres:aspire123@localhost:5432/instagram');
s.query('SELECT username FROM "Users" WHERE username LIKE \'tanmay%\'')
    .then(r => console.log('Users:', r[0].map(u => u.username).join(', ')))
    .catch(console.error)
    .finally(() => process.exit(0));
