require('dotenv').config();
const sequelize = require('./config/database');
const UserProfile = require('./models/UserProfile');

async function seedUsers() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');
        await sequelize.sync();

        const dummyUsers = [
            { userId: 1, username: 'akbar_codes', fullName: 'Akbar', bio: 'Coding Enthusiast' },
            { userId: 2, username: 'jane_doe', fullName: 'Jane Doe', bio: 'Just living life' },
            { userId: 3, username: 'john_smith', fullName: 'John Smith', bio: 'Photographer' },
            { userId: 4, username: 'travel_lover', fullName: 'Traveler', bio: 'Wanderlust' },
            { userId: 5, username: 'foodie_one', fullName: 'Foodie', bio: 'Food Critic' },
            { userId: 101, username: 'creator_101', fullName: 'Reel Creator 101', bio: 'Making awesome reels every day!' },
            { userId: 102, username: 'creator_102', fullName: 'Reel Creator 102', bio: 'Dance and music' },
            { userId: 103, username: 'creator_103', fullName: 'Reel Creator 103', bio: 'Comedy sketches' },
            { userId: 10, username: 'testuser123', fullName: 'Test User', bio: 'Verification Account' }
        ];

        console.log('Seeding User Profiles...');

        for (const user of dummyUsers) {
            const exists = await UserProfile.findOne({ where: { userId: user.userId } });

            if (!exists) {
                await UserProfile.create({
                    userId: user.userId,
                    username: user.username,
                    fullName: user.fullName,
                    bio: user.bio,
                    profilePicture: `https://ui-avatars.com/api/?name=${user.username}&background=random`,
                    followersCount: Math.floor(Math.random() * 1000),
                    followingCount: Math.floor(Math.random() * 500)
                });
                console.log(`Created profile for ${user.username}`);
            } else {
                console.log(`Profile for ${user.username} already exists.`);
            }
        }

        console.log('User Profile Seeding Complete!');

    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await sequelize.close();
    }
}

seedUsers();
