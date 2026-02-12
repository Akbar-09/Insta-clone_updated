const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ArticleTag = sequelize.define('ArticleTag', {
    articleId: {
        type: DataTypes.UUID,
        primaryKey: true,
        field: 'article_id'
    },
    tagId: {
        type: DataTypes.UUID,
        primaryKey: true,
        field: 'tag_id'
    }
}, {
    tableName: 'help_article_tags',
    timestamps: false
});

module.exports = ArticleTag;
