const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Story = sequelize.define('Story', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mediaUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mediaType: {
        type: DataTypes.ENUM('IMAGE', 'VIDEO'),
        defaultValue: 'IMAGE',
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    viewsCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    likesCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Story;
