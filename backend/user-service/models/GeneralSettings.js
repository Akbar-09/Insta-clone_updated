const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GeneralSettings = sequelize.define('GeneralSettings', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'user_id'
    },
    saveStoryToArchive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'save_story_to_archive'
    },
    reduceMotion: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'reduce_motion'
    },
    languageCode: {
        type: DataTypes.STRING,
        defaultValue: 'en',
        field: 'language_code'
    }
}, {
    tableName: 'user_general_settings',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: false
});

module.exports = GeneralSettings;
