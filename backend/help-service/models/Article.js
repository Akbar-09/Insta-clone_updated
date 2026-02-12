const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Article = sequelize.define('Article', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    excerpt: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('draft', 'published'),
        defaultValue: 'published'
    },
    categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'category_id'
    },
    views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: 'views_count'
    },
    isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_featured'
    }
}, {
    tableName: 'help_articles',
    timestamps: true,
    underscored: true,
    indexes: [
        {
            fields: ['slug']
        },
        {
            fields: ['category_id']
        }
    ]
});

module.exports = Article;
