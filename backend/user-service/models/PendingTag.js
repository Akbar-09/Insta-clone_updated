const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PendingTag = sequelize.define('PendingTag', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    postId: {
        type: DataTypes.INTEGER, // Integer to match internal standard for IDs if needed, but request asked UUID. Sticking to project convention: usually IDs are Integers in this legacy DB, but user asked for UUID. I will use STRING for flexibility or INTEGER if matching Post model. Let's stick to standard UUID for this new table as requested.
        // Actually, existing IDs are integers in other models. I will use INTEGER to link to posts.
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'post_id'
    },
    taggedUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'tagged_user_id'
    },
    taggedByUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'tagged_by_user_id'
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'removed'),
        defaultValue: 'pending'
    }
}, {
    tableName: 'pending_tags',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = PendingTag;
