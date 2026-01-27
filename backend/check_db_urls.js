const SearchIndex = require('./search-service/models/SearchIndex');
const UserProfile = require('./user-service/models/UserProfile');
const sequelizeSearch = require('./search-service/config/database');
const sequelizeUser = require('./user-service/config/database');

async function checkUrls() {
    try {
        await sequelizeSearch.authenticate();
        await sequelizeUser.authenticate();
        console.log('Connected to DBs');

        const searchResults = await SearchIndex.findAll({ where: { type: 'USER' } });
        console.log('\n--- Search Index URLs ---');
        searchResults.forEach(r => {
            const meta = r.metadata || {};
            if (meta.profilePicture) {
                console.log(`User: ${r.content}, URL: ${meta.profilePicture}`);
            }
        });

        const userResults = await UserProfile.findAll();
        console.log('\n--- User Profile URLs ---');
        userResults.forEach(u => {
            if (u.profilePicture) {
                console.log(`User: ${u.username}, URL: ${u.profilePicture}`);
            }
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelizeSearch.close();
        await sequelizeUser.close();
    }
}

checkUrls();
