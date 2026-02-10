const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Ad = require('./Ad');

const AdBudget = sequelize.define('AdBudget', {
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
    dailyBudget: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    totalBudget: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    durationDays: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    tableName: 'ad_budgets',
    timestamps: true
});

Ad.hasOne(AdBudget, { foreignKey: 'adId', as: 'budget' });
AdBudget.belongsTo(Ad, { foreignKey: 'adId' });

module.exports = AdBudget;
