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
    type: {
        type: DataTypes.ENUM('LIKE', 'COMMENT', 'FOLLOW'),
        allowNull: false,
    },
    resourceId: { // postId, commentId, etc.
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
