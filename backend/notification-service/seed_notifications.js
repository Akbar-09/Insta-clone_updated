const Notification = require('./models/Notification');
const sequelize = require('./config/database');

const MOCK_NOTIFICATIONS = [
    {
        userId: 2,
        fromUserId: 101,
        fromUsername: 'faiz_09_fz',
        fromUserAvatar: 'https://i.pravatar.cc/150?u=faiz_09_fz',
        type: 'LIKE',
        resourceId: 1,
        resourceImage: 'https://picsum.photos/id/1/200/200',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
    },
    {
        userId: 2,
        fromUserId: 102,
        fromUsername: 'ramiz_shaikh44',
        fromUserAvatar: 'https://i.pravatar.cc/150?u=ramiz_shaikh44',
        type: 'FOLLOW',
        resourceId: 0,
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
    },
    {
        userId: 2,
        fromUserId: 103,
        fromUsername: 'ayuu.rx_2405',
        fromUserAvatar: 'https://i.pravatar.cc/150?u=ayuu.rx_2405',
        type: 'COMMENT',
        resourceId: 1,
        resourceImage: 'https://picsum.photos/id/1/200/200',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48) // 2 days ago
    },
    {
        userId: 2,
        fromUserId: 104,
        fromUsername: 'qasim___fitness',
        fromUserAvatar: 'https://i.pravatar.cc/150?u=qasim___fitness',
        type: 'REPLY',
        resourceId: 1,
        resourceImage: 'https://picsum.photos/id/1/200/200',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5) // 5 days ago
    },
    {
        userId: 2,
        fromUserId: 105,
        fromUsername: 'shaikhmhammadiddiquie',
        fromUserAvatar: 'https://i.pravatar.cc/150?u=shaikhmhammadiddiquie',
        type: 'FOLLOW',
        resourceId: 0,
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10) // 10 days ago
    },
    {
        userId: 2,
        fromUserId: 106,
        fromUsername: 'khurshidfitnees',
        fromUserAvatar: 'https://i.pravatar.cc/150?u=khurshidfitnees',
        type: 'LIKE',
        resourceId: 2,
        resourceImage: 'https://picsum.photos/id/10/200/200',
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15) // 15 days ago
    },
    {
        userId: 2,
        fromUserId: 107,
        fromUsername: 'vajidansari_',
        fromUserAvatar: 'https://i.pravatar.cc/150?u=vajidansari_',
        type: 'COMMENT',
        resourceId: 2,
        resourceImage: 'https://picsum.photos/id/10/200/200',
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20) // 20 days ago
    }
];

async function seed() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // Sync models
        await sequelize.sync();

        // Check if user 2 exists or just seed anyway (UI will show what's in DB for that ID)

        await Notification.bulkCreate(MOCK_NOTIFICATIONS);
        console.log('Successfully seeded mock notifications for user ID 2.');
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await sequelize.close();
    }
}

seed();
