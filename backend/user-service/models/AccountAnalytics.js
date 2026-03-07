const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AccountAnalytics = sequelize.define('AccountAnalytics', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    profile_views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    post_reach: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    engagement: {
        type: DataTypes.DECIMAL,
        defaultValue: 0.0,
    },
    followers_growth: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    recorded_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    timestamps: false
});

module.exports = AccountAnalytics;
