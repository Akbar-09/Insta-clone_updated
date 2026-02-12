const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true
    },
    parentId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'parent_id'
    },
    order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: 'order_index'
    }
}, {
    tableName: 'help_categories',
    timestamps: true,
    underscored: true
});

module.exports = Category;
