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
        allowNull: false
    },
    user2Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // We can store a snippet or ID of the last message for quick preview
    lastMessageId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    lastMessageContent: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    lastMessageSenderId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    lastMessageAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    indexes: [
        {
            fields: ['user1Id', 'user2Id']
        },
        {
            fields: ['updatedAt']
        }
    ]
});

module.exports = Conversation;
