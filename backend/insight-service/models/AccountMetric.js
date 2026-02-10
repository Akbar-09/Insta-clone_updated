const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AccountMetric = sequelize.define('AccountMetric', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    totalReach: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    totalEngaged: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    profileVisits: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    newFollowers: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    lostFollowers: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    followersFromPosts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    followersFromAds: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
}, {
    tableName: 'account_metrics',
    indexes: [
        { fields: ['userId', 'date'], unique: true }
    ]
});

module.exports = AccountMetric;
