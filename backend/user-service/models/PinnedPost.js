const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const UserProfile = require('./UserProfile');

const PinnedPost = sequelize.define('PinnedPost', {
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
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    position: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'pinned_posts',
    timestamps: false
});

module.exports = PinnedPost;
