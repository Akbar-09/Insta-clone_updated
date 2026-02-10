const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Ad = require('./Ad');

const AdClick = sequelize.define('AdClick', {
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
    clickerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'ad_clicks',
    timestamps: true
});

// Association
Ad.hasMany(AdClick, { foreignKey: 'adId' });
AdClick.belongsTo(Ad, { foreignKey: 'adId' });

module.exports = AdClick;
