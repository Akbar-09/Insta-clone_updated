const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const NotificationSettings = sequelize.define('NotificationSettings', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER, // Matching other services where userId is typically INT
        allowNull: false,
        unique: true
    },
    // Push Notification Settings
    pauseAllPush: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    likes: {
        type: DataTypes.ENUM('OFF', 'FOLLOWING', 'EVERYONE'),
        defaultValue: 'EVERYONE'
    },
    comments: {
        type: DataTypes.ENUM('OFF', 'FOLLOWING', 'EVERYONE'),
        defaultValue: 'EVERYONE'
    },
    mentions: {
        type: DataTypes.ENUM('OFF', 'FOLLOWING', 'EVERYONE'),
        defaultValue: 'EVERYONE'
    },
    follows: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    messages: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    storyReplies: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    // Email Notification Settings
    feedbackEmails: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    reminderEmails: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    productEmails: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    newsEmails: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    supportEmails: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: true
});

module.exports = NotificationSettings;
