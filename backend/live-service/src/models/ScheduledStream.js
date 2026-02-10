const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ScheduledStream = sequelize.define('ScheduledStream', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    scheduledAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    category: {
        type: DataTypes.ENUM('Social', 'Gaming', 'Education', 'Music', 'Fitness', 'Tech'),
        allowNull: false,
        defaultValue: 'Social'
    },
    thumbnailUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    visibility: {
        type: DataTypes.ENUM('Public', 'Followers', 'Private'),
        defaultValue: 'Public'
    },
    status: {
        type: DataTypes.ENUM('SCHEDULED', 'STARTED', 'CANCELLED'),
        defaultValue: 'SCHEDULED'
    }
}, {
    tableName: 'scheduled_streams',
    timestamps: true,
    indexes: [
        { fields: ['userId'] },
        { fields: ['scheduledAt'] }
    ]
});

module.exports = ScheduledStream;
