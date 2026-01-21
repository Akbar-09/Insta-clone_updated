const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Report = sequelize.define('Report', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reportedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reason: {
        type: DataTypes.ENUM('spam', 'violence', 'hate', 'nudity', 'scam', 'false_information', 'bullying', 'other'),
        allowNull: false,
    },
    details: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('pending', 'reviewed', 'resolved', 'dismissed'),
        defaultValue: 'pending',
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Report;
