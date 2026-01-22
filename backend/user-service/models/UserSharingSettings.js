const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserSharingSettings = sequelize.define('UserSharingSettings', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'user_id'
    },
    storyShares: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'story_shares'
    },
    postToStory: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'post_to_story'
    },
    reposts: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'reposts'
    },
    websiteEmbeds: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'website_embeds'
    },
    featuredRequests: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'featured_requests'
    }
}, {
    tableName: 'user_sharing_settings',
    timestamps: false
});

module.exports = UserSharingSettings;
