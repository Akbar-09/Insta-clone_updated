const { Sequelize, DataTypes } = require('sequelize');

// Connect to the shared database
const sequelize = new Sequelize('postgres://postgres:aspire123@localhost:5432/instagram', {
    logging: false,
    dialect: 'postgres'
});

// Define UserProfile Model (Minimal for seeding)
const UserProfile = sequelize.define('UserProfile', {
    userId: { type: DataTypes.INTEGER, unique: true, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    fullName: { type: DataTypes.STRING },
    profilePicture: { type: DataTypes.STRING },
    accountStatus: { type: DataTypes.STRING, defaultValue: 'active' },
    followersCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    followingCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    loginProvider: { type: DataTypes.STRING, defaultValue: 'email' }
}, {
    tableName: 'UserProfiles', // Assuming default pluralization
    timestamps: true
});

// Define Post Model (Minimal for seeding)
const Post = sequelize.define('Post', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    username: { type: DataTypes.STRING },
    caption: { type: DataTypes.TEXT },
    mediaUrl: { type: DataTypes.STRING },
    mediaType: { type: DataTypes.STRING, defaultValue: 'IMAGE' },
    likesCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    commentsCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    viewsCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    isHidden: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
    tableName: 'Posts', // We confirmed 'Posts' earlier
    timestamps: true
});

const generateRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const seedData = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // 1. Seed Users (for Acquisition Chart)
        console.log('Seeding Users...');
        const users = [];

        // Focus on 2026 for the demo so charts fill up
        const startYear = new Date('2026-01-01');
        const endYear = new Date(); // Now (Feb 2026)

        for (let i = 0; i < 150; i++) {
            // 80% chance to be in 2026 to populate the "Current Year" chart
            // 20% chance for 2025 (historical)
            const isCurrentYear = Math.random() > 0.2;
            const sDate = isCurrentYear ? startYear : new Date('2025-01-01');
            const eDate = isCurrentYear ? endYear : new Date('2025-12-31');

            const date = generateRandomDate(sDate, eDate);

            users.push({
                userId: 2000 + i, // Fake Auth ID
                username: `user_demo_${i}_${Math.floor(Math.random() * 1000)}`,
                fullName: `Demo User ${i}`,
                profilePicture: `https://i.pravatar.cc/150?u=${2000 + i}`,
                createdAt: date,
                updatedAt: date,
                loginProvider: Math.random() > 0.6 ? 'google' : (Math.random() > 0.5 ? 'facebook' : 'email'),
                followersCount: Math.floor(Math.random() * 500)
            });
        }

        // Use bulkCreate with updateOnDuplicate to ensure profile pictures are updated
        await UserProfile.bulkCreate(users, {
            updateOnDuplicate: ['username', 'fullName', 'profilePicture', 'updatedAt']
        });
        console.log('Users seeded/updated.');

        // 2. Seed Posts (for Engagement/Top Content)
        console.log('Seeding Posts...');
        const posts = [];

        for (let i = 0; i < 300; i++) {
            // 80% chance to be in 2026
            const isCurrentYear = Math.random() > 0.2;
            const sDate = isCurrentYear ? startYear : new Date('2025-01-01');
            const eDate = isCurrentYear ? endYear : new Date('2025-12-31');

            const date = generateRandomDate(sDate, eDate);
            const user = users[Math.floor(Math.random() * users.length)];
            const isVideo = Math.random() > 0.7;

            posts.push({
                userId: user.userId,
                username: user.username,
                caption: `Analytics demo post #${i}. #metrics #2026`,
                mediaUrl: isVideo ? 'https://www.w3schools.com/html/mov_bbb.mp4' : `https://picsum.photos/seed/${i + 1000}/600/600`,
                mediaType: isVideo ? 'VIDEO' : 'IMAGE',
                likesCount: Math.floor(Math.random() * 2000),
                commentsCount: Math.floor(Math.random() * 500),
                viewsCount: Math.floor(Math.random() * 20000) + 500,
                createdAt: date,
                updatedAt: date
            });
        }

        await Post.bulkCreate(posts, { ignoreDuplicates: true });
        console.log('Posts seeded with analytics data.');

        console.log('Done!');
        process.exit(0);

    } catch (error) {
        console.error('Seeding failed:', error);
        // Fallback: Check if table names are different (e.g., snake_case) and retry?
        // But for now, just logging error.
        process.exit(1);
    }
};

seedData();
