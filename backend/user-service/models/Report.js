const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AppFeedback = sequelize.define('AppFeedback', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    files: {
        type: DataTypes.JSONB,
        defaultValue: []
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    },
    browserInfo: {
        type: DataTypes.JSONB,
        allowNull: true
    }
}, {
    timestamps: true,
    tableName: 'AppFeedback' // Unique table name
});

module.exports = AppFeedback;
