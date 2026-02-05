const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AdminNotification = sequelize.define('AdminNotification', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    target: {
        type: DataTypes.STRING, // 'all', 'country', 'platform'
        defaultValue: 'all'
    },
    targetValue: {
        type: DataTypes.STRING, // 'United States', 'Mobile', etc.
        allowNull: true
    },
    recipientsCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM('sent', 'scheduled', 'failed'),
        defaultValue: 'sent'
    },
    scheduledFor: {
        type: DataTypes.DATE,
        allowNull: true
    },
    sentAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = AdminNotification;
