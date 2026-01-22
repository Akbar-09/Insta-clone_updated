const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FollowRequest = sequelize.define('FollowRequest', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    requesterId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    targetUserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'ACCEPTED', 'REJECTED'),
        defaultValue: 'PENDING'
    }
}, {
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['requesterId', 'targetUserId']
        }
    ]
});

module.exports = FollowRequest;
