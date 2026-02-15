const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Ad = require('./Ad');

const AdMetric = sequelize.define('AdMetric', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
    impressions: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    clicks: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    reach: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    spent: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'ad_metrics',
    timestamps: true,
    indexes: [
        { fields: ['adId', 'date'], unique: true }
    ]
});

Ad.hasMany(AdMetric, { foreignKey: 'adId', as: 'metrics' });
AdMetric.belongsTo(Ad, { foreignKey: 'adId' });

module.exports = AdMetric;
