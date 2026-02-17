const amqp = require('amqplib');

async function triggerTestNotification(userId) {
    try {
        const connection = await amqp.connect('amqp://guest:guest@localhost:5672');
        const channel = await connection.createChannel();
        const queue = 'notification_queue';

        const payload = {
            userId: userId,
            type: 'like',
            title: 'Test Notification',
            message: 'This is a test push notification from the system!',
            link: '/feed',
            fromUserId: 999,
            fromUsername: 'SystemTester'
        };

        await channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)), { persistent: true });

        console.log(`[Test] Notification triggered for user ${userId}`);

        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 500);
    } catch (error) {
        console.error('Test Trigger Error:', error);
    }
}

// Pass userId as argument: node test_push.js <userId>
const userId = process.argv[2] || 51;
triggerTestNotification(userId);
