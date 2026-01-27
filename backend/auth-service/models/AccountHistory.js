const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AccountHistory = sequelize.define('AccountHistory', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    action: {
        type: DataTypes.STRING, // e.g., "password_change", "email_update", "bio_update"
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING, // e.g., "Password", "Email"
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING, // e.g., "You changed your password"
        allowNull: false,
    },
    oldValue: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    newValue: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    icon: {
        type: DataTypes.STRING, // store icon name or type
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = AccountHistory;
