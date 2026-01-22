const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserProfile = sequelize.define('UserProfile', {
    userId: { // References Auth Service User ID
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    profilePicture: {
        type: DataTypes.STRING,
        defaultValue: '',
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isPrivate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    showAccountSuggestions: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    allowSearchIndexing: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    followersCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    followingCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    postCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
});

module.exports = UserProfile;
