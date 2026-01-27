const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserCommentSettings = sequelize.define('UserCommentSettings', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'user_id'
    },
    allowFrom: {
        type: DataTypes.ENUM('everyone', 'following', 'followers', 'mutual', 'off'),
        defaultValue: 'everyone',
        field: 'allow_from'
    },
    allowGif: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'allow_gif'
    }
}, {
    tableName: 'user_comment_settings',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: false
});

module.exports = UserCommentSettings;
