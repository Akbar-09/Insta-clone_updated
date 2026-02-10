const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Interaction = sequelize.define('Interaction', {
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
    actorId: { // User who liked/commented
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('LIKE', 'COMMENT', 'SHARE', 'SAVE'),
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'interactions',
    timestamps: false,
    indexes: [
        { fields: ['userId', 'timestamp'] },
        { fields: ['contentId', 'timestamp'] },
        { fields: ['type'] }
    ]
});

module.exports = Interaction;
