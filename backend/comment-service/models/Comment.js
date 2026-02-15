const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    likesCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'flagged', 'removed'),
        defaultValue: 'pending'
    },
    reportedCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'parent_id'
    },
    type: {
        type: DataTypes.ENUM('text', 'sticker'),
        defaultValue: 'text'
    },
    mediaUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'media_url'
    },
    targetType: {
        type: DataTypes.ENUM('post', 'reel'),
        defaultValue: 'post',
        field: 'target_type'
    }
});


module.exports = Comment;
