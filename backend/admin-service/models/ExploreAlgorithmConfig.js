const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ExploreAlgorithmConfig = sequelize.define('ExploreAlgorithmConfig', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    freshnessWeight: { type: DataTypes.INTEGER, defaultValue: 70 },
    engagementWeight: { type: DataTypes.INTEGER, defaultValue: 60 },
    relevanceWeight: { type: DataTypes.INTEGER, defaultValue: 85 },
    locationWeight: { type: DataTypes.INTEGER, defaultValue: 40 }
}, {
    tableName: 'explore_algorithm_config',
    timestamps: true,
    createdAt: false,
    updatedAt: 'updated_at'
});

module.exports = ExploreAlgorithmConfig;
