const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FeaturedContent = sequelize.define('FeaturedContent', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    contentType: { type: DataTypes.ENUM('post', 'reel'), allowNull: false },
    contentId: { type: DataTypes.INTEGER, allowNull: false },
    isFeatured: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
    tableName: 'featured_content',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = FeaturedContent;
