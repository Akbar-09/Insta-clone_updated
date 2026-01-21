const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const StoryReport = sequelize.define('StoryReport', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    storyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reporterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    indexes: [
        {
            unique: true,
            fields: ['storyId', 'reporterId']
        }
    ]
});

module.exports = StoryReport;
