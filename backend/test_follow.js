const followService = require('./user-service/services/followService');
const sequelize = require('./user-service/config/database');
const Follow = require('./user-service/models/Follow');

async function testFollow() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        await Follow.sync({ force: true });
        console.log('Follow model synced.');

        const followerId = 10; // testuser123
        const followingId = 5; // foodie_one

        console.log(`Attempting to follow user ${followingId} by ${followerId}...`);

        // Try unfollow first to clean up
        await followService.unfollowUser(followerId, followingId);

        const result = await followService.followUser(followerId, followingId);
        console.log('Follow result:', result);

        const isFollowing = await followService.isFollowing(followerId, followingId);
        console.log('Is Following?', isFollowing);

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await sequelize.close();
    }
}

testFollow();
