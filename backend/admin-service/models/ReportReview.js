const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ReportReview = sequelize.define('ReportReview', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    reportId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    adminId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    actionTaken: {
        type: DataTypes.STRING, // banned_user, deleted_content, ignored, warned
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    resolvedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = ReportReview;
