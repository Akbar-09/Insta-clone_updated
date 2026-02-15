const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Ad = require('./Ad');

const AdTarget = sequelize.define('AdTarget', {
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
    targetType: {
        type: DataTypes.ENUM('AUTOMATIC', 'CUSTOM'),
        defaultValue: 'AUTOMATIC',
    },
    locations: {
        type: DataTypes.JSONB, // Array of locations
        allowNull: true,
    },
    ageRange: {
        type: DataTypes.JSONB, // { min: 18, max: 65 }
        allowNull: true,
    },
    interests: {
        type: DataTypes.JSONB, // Array of interests
        allowNull: true,
    },
    gender: {
        type: DataTypes.ENUM('ALL', 'MALE', 'FEMALE'),
        defaultValue: 'ALL',
    }
}, {
    tableName: 'ad_targets',
    timestamps: true
});

Ad.hasOne(AdTarget, { foreignKey: 'adId', as: 'target' });
AdTarget.belongsTo(Ad, { foreignKey: 'adId' });

module.exports = AdTarget;
