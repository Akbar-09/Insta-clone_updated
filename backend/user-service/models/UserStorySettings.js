const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserStorySettings = sequelize.define('UserStorySettings', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'user_id'
    },
    storyReplies: {
        type: DataTypes.ENUM('everyone', 'followers', 'off'),
        defaultValue: 'everyone',
        field: 'story_replies'
    }
}, {
    tableName: 'user_story_settings',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = UserStorySettings;
