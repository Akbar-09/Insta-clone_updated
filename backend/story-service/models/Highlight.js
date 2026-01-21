const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Highlight = sequelize.define('Highlight', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    coverStoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'cover_story_id'
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
    },
}, {
    tableName: 'highlights',
    timestamps: false,
    indexes: [
        {
            fields: ['user_id']
        }
    ]
});

module.exports = Highlight;
