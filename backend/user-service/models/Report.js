const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Report = sequelize.define('Report', {
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
        type: DataTypes.JSONB, // Store array of file paths/URLs
        defaultValue: []
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending' // 'pending', 'reviewing', 'resolved', 'dismissed'
    },
    browserInfo: {
        type: DataTypes.JSONB,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Report;
