const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ad = sequelize.define('Ad', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: { // The advertiser
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profileImage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    caption: {
        type: DataTypes.TEXT,
    },
    mediaUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mediaType: {
        type: DataTypes.ENUM('IMAGE', 'VIDEO'),
        defaultValue: 'IMAGE',
    },
    linkUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ctaText: {
        type: DataTypes.STRING, // Learn More, Shop Now, etc.
        defaultValue: 'Learn More',
    },
    budget: {
        type: DataTypes.FLOAT, // Total budget
        defaultValue: 0.0,
    },
    spent: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
    },
    startDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'APPROVED', 'ACTIVE', 'PAUSED', 'EXPIRED', 'REJECTED'),
        defaultValue: 'PENDING',
    },
    // Metrics (Denormalized for speed)
    impressionsCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    clicksCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
});

module.exports = Ad;
