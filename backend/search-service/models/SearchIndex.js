const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// For MVP, we'll store searchable items in a simple table.
// In production, sync this to ElasticSearch/Algolia.
const SearchIndex = sequelize.define('SearchIndex', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.ENUM('USER', 'POST', 'HASHTAG'),
        allowNull: false,
    },
    referenceId: { // UserId or PostId
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content: { // Username or Caption or Hashtag text
        type: DataTypes.TEXT,
        allowNull: false,
    },
    metadata: {
        type: DataTypes.JSONB, // Store extra info like avatarUrl, postImage
        defaultValue: {},
    },
});

module.exports = SearchIndex;
