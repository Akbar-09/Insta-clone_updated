const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AccountStatus = sequelize.define('AccountStatus', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'user_id'
    },
    status: {
        type: DataTypes.ENUM('OK', 'WARNING', 'LIMITED'),
        defaultValue: 'OK'
    },
    lastChecked: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'last_checked'
    }
}, {
    tableName: 'account_status',
    timestamps: false
});

module.exports = AccountStatus;
