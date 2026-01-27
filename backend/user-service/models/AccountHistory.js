const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AccountHistory = sequelize.define('AccountHistory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    action: {
        type: DataTypes.STRING, // e.g., 'NAME_CHANGE', 'USERNAME_CHANGE', 'BIO_CHANGE', 'PASSWORD_CHANGE'
        allowNull: false
    },
    oldValue: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'old_value'
    },
    newValue: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'new_value'
    }
}, {
    tableName: 'account_history',
    timestamps: true,
    indexes: [
        {
            fields: ['user_id']
        }
    ]
});

module.exports = AccountHistory;
