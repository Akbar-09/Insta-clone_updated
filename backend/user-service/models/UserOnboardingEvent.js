const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserOnboardingEvent = sequelize.define('UserOnboardingEvent', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    eventType: {
        type: DataTypes.STRING, // e.g., 'added_profile_picture', 'wrote_bio'
        allowNull: false
    },
    completedDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = UserOnboardingEvent;
