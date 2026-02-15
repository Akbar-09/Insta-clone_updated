const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContentMetric = sequelize.define('ContentMetric', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    contentId: {
        type: DataTypes.STRING, // Can be Post ID (int) or Ad ID (uuid)
        allowNull: false,
    },
    contentType: {
        type: DataTypes.ENUM('POST', 'REEL', 'STORY', 'AD'),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    reach: {
        type: DataTypes.INTEGER, // Unique users
        defaultValue: 0,
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    comments: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    shares: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    saves: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
}, {
    tableName: 'content_metrics',
    indexes: [
        { fields: ['userId', 'date'] },
        { fields: ['contentId', 'date'] },
        { fields: ['contentType'] }
    ]
});

module.exports = ContentMetric;
