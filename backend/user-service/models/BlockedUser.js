const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BlockedUser = sequelize.define('BlockedUser', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    blockerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'blocker_id'
    },
    blockedId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'blocked_id'
    }
}, {
    tableName: 'blocked_users',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['blocker_id', 'blocked_id']
        }
    ]
});

module.exports = BlockedUser;
