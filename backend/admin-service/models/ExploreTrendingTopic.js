const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ExploreTrendingTopic = sequelize.define('ExploreTrendingTopic', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    topic: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {
    tableName: 'explore_trending_topics',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = ExploreTrendingTopic;
