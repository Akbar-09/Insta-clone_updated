const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AccountCategory = sequelize.define('AccountCategory', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: { // 'creator' or 'business'
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true
});

module.exports = AccountCategory;
