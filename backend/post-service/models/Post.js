const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    username: { // Denormalized for simpler feeds
        type: DataTypes.STRING,
        allowNull: false,
    },
    caption: {
        type: DataTypes.TEXT,
    },
    mediaUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mediaType: {
        type: DataTypes.ENUM('IMAGE', 'VIDEO'),
        defaultValue: 'IMAGE',
    },
    likesCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    commentsCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    hideLikes: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    commentsDisabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Post;
