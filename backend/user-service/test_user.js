const UserProfile = require('./models/UserProfile');
const sequelize = require('./config/database');

async function test() {
    try {
        await sequelize.authenticate();
        const profiles = await UserProfile.findAll();
        console.log('Profiles:', profiles.map(p => ({ id: p.id, userId: p.userId, username: p.username })));
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}
test();
