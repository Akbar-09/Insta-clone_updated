const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Ad = require('./Ad');

const AdImpression = sequelize.define('AdImpression', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    adId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'ads',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    viewerId: {
        type: DataTypes.INTEGER, // User who saw the ad
        allowNull: true, // Can be anonymous if allowed, but usually logged in
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'ad_impressions',
    timestamps: true
});

// Association
Ad.hasMany(AdImpression, { foreignKey: 'adId' });
AdImpression.belongsTo(Ad, { foreignKey: 'adId' });

module.exports = AdImpression;
