require('dotenv').config();
const sequelize = require('./config/database');
const SearchIndex = require('./models/SearchIndex');

async function seedSearchIndex() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');
        await sequelize.sync();

        const dummyUsers = [
            { id: 1, username: 'akbar_codes', fullName: 'Akbar' },
            { id: 2, username: 'jane_doe', fullName: 'Jane Doe' },
            { id: 3, username: 'john_smith', fullName: 'John Smith' },
            { id: 4, username: 'travel_lover', fullName: 'Traveler' },
            { id: 5, username: 'foodie_one', fullName: 'Foodie' },
            { id: 101, username: 'creator_101', fullName: 'Reel Creator 101' },
            { id: 102, username: 'creator_102', fullName: 'Reel Creator 102' },
            { id: 103, username: 'creator_103', fullName: 'Reel Creator 103' },
            { id: 10, username: 'testuser123', fullName: 'Test User' } // The one I created
        ];

        console.log('Seeding Search Index...');

        for (const user of dummyUsers) {
            // Check if exists
            const exists = await SearchIndex.findOne({
                where: {
                    type: 'USER',
                    referenceId: user.id
                }
            });

            if (!exists) {
                await SearchIndex.create({
                    type: 'USER',
                    referenceId: user.id,
                    content: user.username,
                    metadata: {
                        fullName: user.fullName,
                        profilePicture: `https://ui-avatars.com/api/?name=${user.username}&background=random`
                    }
                });
                console.log(`Added ${user.username}`);
            } else {
                console.log(`Skipped ${user.username} (already exists)`);
            }
        }

        console.log('Search Index Seeding Complete!');

    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await sequelize.close();
    }
}

seedSearchIndex();
