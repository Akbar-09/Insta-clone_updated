const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HighlightStory = sequelize.define('HighlightStory', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    highlightId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'highlight_id'
    },
    storyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'story_id'
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
    },
}, {
    tableName: 'highlight_stories',
    timestamps: false,
    indexes: [
        {
            fields: ['highlight_id']
        },
        {
            fields: ['story_id']
        },
        {
            unique: true,
            fields: ['highlight_id', 'story_id']
        }
    ]
});

module.exports = HighlightStory;
