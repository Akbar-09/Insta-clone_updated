const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FavoriteAccount = sequelize.define('FavoriteAccount', {
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
    favoriteUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'favorite_user_id'
    }
}, {
    tableName: 'favorite_accounts',
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_at',
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'favorite_user_id']
        }
    ]
});

module.exports = FavoriteAccount;
