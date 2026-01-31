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
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Ad,
            key: 'id'
        }
    },
    clickerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
});

// Association
Ad.hasMany(AdClick, { foreignKey: 'adId' });
AdClick.belongsTo(Ad, { foreignKey: 'adId' });

module.exports = AdClick;
