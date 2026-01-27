const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FeatureLimit = sequelize.define('FeatureLimit', {
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
    featureName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'feature_name'
    },
    isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_blocked'
    }
}, {
    tableName: 'feature_limits',
    timestamps: false
});

module.exports = FeatureLimit;
