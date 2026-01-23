const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const StoryReaction = sequelize.define('StoryReaction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    storyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reactorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        defaultValue: 'LIKE', // Can be expanded to emoji reactions
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'story_reactions',
    indexes: [
        {
            unique: true,
            fields: ['storyId', 'reactorId']
        }
    ]
});

module.exports = StoryReaction;
