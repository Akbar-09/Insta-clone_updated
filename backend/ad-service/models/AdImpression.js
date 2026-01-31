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
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Ad,
            key: 'id'
        }
    },
    viewerId: {
        type: DataTypes.INTEGER, // User who saw the ad
        allowNull: true, // Can be anonymous if allowed, but usually logged in
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
});

// Association
Ad.hasMany(AdImpression, { foreignKey: 'adId' });
AdImpression.belongsTo(Ad, { foreignKey: 'adId' });

module.exports = AdImpression;
