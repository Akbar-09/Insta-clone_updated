const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CloseFriend = sequelize.define('CloseFriend', {
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
    friendId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'friend_id'
    }
}, {
    tableName: 'close_friends',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'friend_id']
        }
    ]
});

module.exports = CloseFriend;
