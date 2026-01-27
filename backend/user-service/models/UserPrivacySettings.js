const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserPrivacySettings = sequelize.define('UserPrivacySettings', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'user_id'
    },
    allowTagsFrom: {
        type: DataTypes.ENUM('everyone', 'following', 'no_one'),
        defaultValue: 'everyone',
        field: 'allow_tags_from'
    },
    manualTagApproval: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'manual_tag_approval'
    },
    allowMentionsFrom: {
        type: DataTypes.ENUM('everyone', 'following', 'no_one'),
        defaultValue: 'everyone',
        field: 'allow_mentions_from'
    }
}, {
    tableName: 'user_privacy_settings',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = UserPrivacySettings;
