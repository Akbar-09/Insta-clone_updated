const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DMModerationLog = sequelize.define('DMModerationLog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    adminId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    actionType: {
        type: DataTypes.ENUM('mark_safe', 'ban_users'),
        allowNull: false
    },
    metadata: {
        type: DataTypes.JSONB,
        defaultValue: {}
    }
}, {
    tableName: 'dm_moderation_logs',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = DMModerationLog;
