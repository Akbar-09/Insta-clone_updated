const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Feedback = sequelize.define('Feedback', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    articleId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    isHelpful: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

module.exports = Feedback;
