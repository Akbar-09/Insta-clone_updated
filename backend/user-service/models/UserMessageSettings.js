const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserMessageSettings = sequelize.define('UserMessageSettings', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'user_id'
    },
    messageRequestsFrom: {
        type: DataTypes.ENUM('everyone', 'followers', 'no_one'),
        defaultValue: 'everyone',
        field: 'message_requests_from'
    },
    groupAddPermission: {
        type: DataTypes.ENUM('everyone', 'followers_only'),
        defaultValue: 'everyone',
        field: 'group_add_permission'
    }
}, {
    tableName: 'user_message_settings',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = UserMessageSettings;
