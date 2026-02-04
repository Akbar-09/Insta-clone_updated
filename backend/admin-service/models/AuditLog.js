const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AuditLog = sequelize.define('AuditLog', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    adminId: { type: DataTypes.INTEGER, allowNull: false },
    actionType: { type: DataTypes.STRING, allowNull: false },
    targetType: { type: DataTypes.ENUM('user', 'post', 'reel', 'story', 'report', 'hashtag', 'comment', 'auth', 'system', 'avatar', 'admin', 'language'), allowNull: false },
    targetId: { type: DataTypes.STRING, allowNull: true },
    metadata: { type: DataTypes.JSONB, defaultValue: {} }
}, {
    tableName: 'admin_audit_logs',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = AuditLog;
