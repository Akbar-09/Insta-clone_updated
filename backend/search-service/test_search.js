const SearchIndex = require('./models/SearchIndex');
const sequelize = require('./config/database');

async function test() {
    try {
        await sequelize.authenticate();
        const results = await SearchIndex.findAll({ where: { type: 'USER' } });
        console.log('Search Index Users:', results.map(r => ({ id: r.id, refId: r.referenceId, content: r.content })));
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}
test();
