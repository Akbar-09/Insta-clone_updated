const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FollowerActivity = sequelize.define('FollowerActivity', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: { // The professional account
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dayOfWeek: { // 0-6
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    hourOfDay: { // 0-23
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
}, {
    tableName: 'follower_activity_heatmap',
    indexes: [
        { fields: ['userId', 'dayOfWeek', 'hourOfDay'], unique: true }
    ]
});

module.exports = FollowerActivity;
