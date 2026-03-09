const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const UserProfile = require('./UserProfile');

const PostTag = sequelize.define('PostTag', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    taggedUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserProfile,
            key: 'userId'
        }
    },
    approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'post_tags',
    timestamps: true,
    updatedAt: false,
    indexes: [
        {
            unique: true,
            fields: ['postId', 'taggedUserId']
        }
    ]
});

module.exports = PostTag;
