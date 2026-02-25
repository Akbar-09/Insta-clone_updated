const Message = require('./models/Message');
const sequelize = require('./config/database');

async function check() {
    try {
        const messages = await Message.findAll({
            where: { type: 'call_history' },
            limit: 10
        });
        console.log('Found call_history messages:', messages.length);
        messages.forEach(m => {
            console.log(`ID: ${m.id}, From: ${m.senderId}, To: (conv ${m.conversationId}), Content: ${m.content}, CallType: ${m.callType}`);
        });
    } catch (e) {
        console.error('Error checking messages:', e);
    } finally {
        process.exit();
    }
}

check();
