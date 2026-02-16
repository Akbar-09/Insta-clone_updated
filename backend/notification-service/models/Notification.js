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
            fields: ['userId'],
        },
        {
            fields: ['is_read'],
        },
        {
            fields: ['createdAt'],
        },
    ]
});


module.exports = Notification;
