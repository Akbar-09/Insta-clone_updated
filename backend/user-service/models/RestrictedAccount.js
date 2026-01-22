const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RestrictedAccount = sequelize.define('RestrictedAccount', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    restrictedUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'restricted_user_id'
    }
}, {
    tableName: 'restricted_accounts',
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_at',
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'restricted_user_id']
        }
    ]
});

module.exports = RestrictedAccount;
