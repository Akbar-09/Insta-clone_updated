const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MutedAccount = sequelize.define('MutedAccount', {
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
    mutedUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'muted_user_id'
    }
}, {
    tableName: 'muted_accounts',
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_at',
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'muted_user_id']
        }
    ]
});

module.exports = MutedAccount;
