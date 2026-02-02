const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'conversation_id'
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'sender_id'
    },
    type: {
        type: DataTypes.ENUM('text', 'image', 'video', 'story_reply'),
        defaultValue: 'text'
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true // Allow null for media-only messages
    },
    mediaUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'media_url'
    },
    replyToStoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'reply_to_story_id'
    },
    isSeen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    flagged: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {

    indexes: [
        {
            fields: ['conversation_id']
        },
        {
            fields: ['createdAt']
        }
    ]
});

module.exports = Message;
