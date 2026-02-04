const Conversation = require('./models/Conversation');
const Message = require('./models/Message');
const sequelize = require('./config/database');

async function addFlaggedDMs() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // 1. High Risk Conversation (Harassment/Threats)
        const conv1 = await Conversation.create({
            user1Id: 7,
            user2Id: 20,
            lastMessageContent: 'I will find where you live and make you regret this.',
            lastMessageSenderId: 7,
            riskScore: 85,
            riskLevel: 'high',
            status: 'flagged',
            flaggedAt: new Date(),
            aiFlags: ['Harassment', 'Physical Threat']
        });

        await Message.bulkCreate([
            { conversationId: conv1.id, senderId: 20, content: 'Please stop messaging me.' },
            { conversationId: conv1.id, senderId: 7, content: 'You think you can just block me and it is over?' },
            { conversationId: conv1.id, senderId: 7, content: 'I will find where you live and make you regret this.', flagged: true }
        ]);

        // 2. Medium Risk Conversation (Scam/Phishing)
        const conv2 = await Conversation.create({
            user1Id: 20,
            user2Id: 1, // Using ID 1 as common target
            lastMessageContent: 'Verify your account here: http://insta-verify-login.com/auth',
            lastMessageSenderId: 20,
            riskScore: 45,
            riskLevel: 'medium',
            status: 'flagged',
            flaggedAt: new Date(),
            aiFlags: ['Suspicious Link', 'Scam']
        });

        await Message.bulkCreate([
            { conversationId: conv2.id, senderId: 20, content: 'Hey, I work for Instagram Support.' },
            { conversationId: conv2.id, senderId: 20, content: 'We noticed unusual activity on your account.' },
            { conversationId: conv2.id, senderId: 20, content: 'Verify your account here: http://insta-verify-login.com/auth', flagged: true }
        ]);

        console.log('Successfully added dummy flagged conversations and messages.');
        process.exit(0);
    } catch (error) {
        console.error('Error adding dummy DMs:', error);
        process.exit(1);
    }
}

addFlaggedDMs();
