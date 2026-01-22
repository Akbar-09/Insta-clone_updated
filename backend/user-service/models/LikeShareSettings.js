const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LikeShareSettings = sequelize.define('LikeShareSettings', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'user_id'
    },
    hideLikeShareCounts: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'hide_like_share_counts'
    }
}, {
    tableName: 'like_share_settings',
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_at'
});

module.exports = LikeShareSettings;
