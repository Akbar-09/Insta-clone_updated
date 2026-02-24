const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notification = sequelize.define('Notification', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    type: {
        type: DataTypes.STRING, // like, follow, comment, message, system
        allowNull: false,
    },
    fromUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'from_user_id'
    },
    fromUsername: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'from_username'
    },
    fromUserAvatar: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'from_user_avatar'
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_read'
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
    },
}, {
    tableName: 'notifications',
    timestamps: false,

    indexes: [
        {
            name: 'notifications_user_id',
            fields: ['user_id'],
        },
        {
            name: 'notifications_is_read',
            fields: ['is_read'],
        },
        {
            name: 'notifications_created_at',
            fields: ['created_at'],
        },
    ]
});


module.exports = Notification;
