const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserSession = sequelize.define('UserSession', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deviceId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.TEXT, // Refresh token
        allowNull: true
    },
    lastLogin: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'user_sessions',
    timestamps: true,
    indexes: [
        {
            fields: ['userId']
        },
        {
            fields: ['deviceId']
        }
    ]
});

module.exports = UserSession;
