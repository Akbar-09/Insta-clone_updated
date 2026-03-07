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
    country: {
        type: DataTypes.STRING,
        defaultValue: 'Unknown',
    },
    loginProvider: {
        type: DataTypes.STRING,
        defaultValue: 'email',
    },
    accountStatus: {
        type: DataTypes.STRING,
        defaultValue: 'active',
    },
    accountType: {
        type: DataTypes.STRING,
        defaultValue: 'personal',
    },
    displayName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    pronouns: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    pronounVisibility: {
        type: DataTypes.STRING,
        defaultValue: 'Everyone',
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    contactEmail: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    contactPhone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    contactAddress: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    avatarType: {
        type: DataTypes.STRING,
        defaultValue: 'image', // 'image' or '3d'
    },
    avatarUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // Onboarding tracking
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    isBirthdatePublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    onboardingCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    onboardingStep: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    tutorialCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    notificationsEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    followersVisibility: {
        type: DataTypes.STRING,
        defaultValue: 'Everyone', // 'Everyone', 'Followers', 'Only Me'
    }
});

module.exports = UserProfile;
