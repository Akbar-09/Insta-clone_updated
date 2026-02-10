const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Impression = sequelize.define('Impression', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: { // Owner of content
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    contentId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contentType: {
        type: DataTypes.ENUM('POST', 'REEL', 'STORY', 'AD'),
        allowNull: false,
    },
    viewerId: {
        type: DataTypes.INTEGER, // If null, anonymous (but usually we track logged in)
        allowNull: true,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'impressions',
    timestamps: false,
    indexes: [
        { fields: ['userId', 'timestamp'] },
        { fields: ['contentId', 'timestamp'] },
        { fields: ['viewerId'] }
    ]
});

module.exports = Impression;
