const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Conversation = sequelize.define('Conversation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user1Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user1_id'
    },
    user2Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user2_id'
    },
    // We can store a snippet or ID of the last message for quick preview
    lastMessageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'last_message_id'
    },
    lastMessageContent: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'last_message_content'
    },
    lastMessageSenderId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'last_message_sender_id'
    },
    lastMessageAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    indexes: [
        {
            name: 'conversations_user1_user2_idx',
            fields: ['user1_id', 'user2_id']
        },
        {
            fields: ['updatedAt']
        }
    ]
});

module.exports = Conversation;
