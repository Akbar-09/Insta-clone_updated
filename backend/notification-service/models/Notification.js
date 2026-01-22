const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notification = sequelize.define('Notification', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: { // The recipient of the notification
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fromUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fromUsername: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fromUserAvatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    type: {
        type: DataTypes.ENUM('LIKE', 'COMMENT', 'FOLLOW', 'REPLY', 'MENTION'),
        allowNull: false,
    },
    resourceId: { // postId, commentId, etc.
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    resourceImage: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Notification;
