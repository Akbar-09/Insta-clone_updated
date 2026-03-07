const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const UserProfile = require('./UserProfile');

const ProfileAction = sequelize.define('ProfileAction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserProfile,
            key: 'userId'
        }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false // e.g. 'Order Food', 'Book Now', 'Reserve'
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'profile_actions',
    timestamps: true,
    updatedAt: false
});

module.exports = ProfileAction;
