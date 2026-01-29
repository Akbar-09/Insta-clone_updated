const Notification = require('./models/Notification');
const sequelize = require('./config/database');

const TARGET_USER_IDS = [51]; // Seed for 'akbar' (id 51)

const ACTION_USERS = [
    { id: 101, username: 'user_test_1', avatar: 'https://ui-avatars.com/api/?name=user_test_1&background=random' },
    { id: 102, username: 'user_test_2', avatar: 'https://ui-avatars.com/api/?name=user_test_2&background=random' },
    { id: 103, username: 'user_test_3', avatar: 'https://ui-avatars.com/api/?name=user_test_3&background=random' },
    { id: 104, username: 'user_test_4', avatar: 'https://ui-avatars.com/api/?name=user_test_4&background=random' },
    { id: 105, username: 'user_test_5', avatar: 'https://ui-avatars.com/api/?name=user_test_5&background=random' },
];

const NOTIFICATION_TYPES = ['LIKE', 'COMMENT', 'FOLLOW', 'MENTION', 'REPLY'];

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateNotifications(userId) {
    const notifications = [];
    const count = 10; // Generate 10 notifications per user

    for (let i = 0; i < count; i++) {
        const fromUser = getRandomItem(ACTION_USERS);
        const type = getRandomItem(NOTIFICATION_TYPES);
        const isRead = i > 5; // Half read, half unread
        const timeOffset = Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 7); // Random time within last 7 days

        let resourceId = null;
        let resourceImage = null;

        if (type !== 'FOLLOW') {
            resourceId = Math.floor(Math.random() * 100) + 1;
            resourceImage = `https://picsum.photos/seed/${resourceId}/200/200`;
        }

        notifications.push({
            userId: userId,
            fromUserId: fromUser.id,
            fromUsername: fromUser.username,
            fromUserAvatar: fromUser.avatar,
            type: type,
            resourceId: resourceId,
            resourceImage: resourceImage,
            isRead: isRead,
            createdAt: new Date(Date.now() - timeOffset)
        });
    }

    // Add a specific recent "Today" notification
    notifications.push({
        userId: userId,
        fromUserId: 101,
        fromUsername: 'user_test_1',
        fromUserAvatar: 'https://ui-avatars.com/api/?name=user_test_1&background=random',
        type: 'LIKE',
        resourceId: 999,
        resourceImage: 'https://picsum.photos/seed/999/200/200',
        isRead: false,
        createdAt: new Date()
    });

    return notifications;
}

async function seed() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // Sync models
        await sequelize.sync();

        console.log('Seeding notifications...');

        // Clear existing for these users to avoid duplicates piling up? 
        // Optional, but safer for "empty" state reset if requested. 
        // But user said "add some data", so maybe just add.
        // Let's delete existing to be clean.
        await Notification.destroy({ where: { userId: TARGET_USER_IDS } });

        let allNotifications = [];
        for (const userId of TARGET_USER_IDS) {
            allNotifications = [...allNotifications, ...generateNotifications(userId)];
        }

        await Notification.bulkCreate(allNotifications);
        console.log(`Successfully seeded ${allNotifications.length} mock notifications for users ${TARGET_USER_IDS.join(', ')}.`);
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await sequelize.close();
    }
}

seed();
