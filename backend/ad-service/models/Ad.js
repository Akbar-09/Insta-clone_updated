const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ad = sequelize.define('Ad', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    advertiserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    targetUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    headline: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    type: {
        type: DataTypes.ENUM('image', 'video', 'carousel'),
        defaultValue: 'image',
    },
    status: {
        type: DataTypes.ENUM('pending', 'active', 'paused', 'completed', 'rejected'),
        defaultValue: 'pending',
    },
    budget: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
    },
    spent: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true,
    }
});

module.exports = Ad;
