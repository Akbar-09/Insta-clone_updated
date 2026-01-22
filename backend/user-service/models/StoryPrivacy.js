const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const StoryPrivacy = sequelize.define('StoryPrivacy', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    hiddenUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'hidden_user_id'
    }
}, {
    tableName: 'story_privacy',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'hidden_user_id']
        }
    ]
});

module.exports = StoryPrivacy;
