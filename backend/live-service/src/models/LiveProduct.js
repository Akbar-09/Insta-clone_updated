const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const LiveStream = require('./LiveStream');

const LiveProduct = sequelize.define('LiveProduct', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    stream_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: LiveStream,
            key: 'id'
        }
    },
    product_id: {
        type: DataTypes.STRING, // External ID from shop service
        allowNull: false
    },
    featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'live_products',
    timestamps: true,
    underscored: true
});

LiveStream.hasMany(LiveProduct, { foreignKey: 'stream_id' });
LiveProduct.belongsTo(LiveStream, { foreignKey: 'stream_id' });

module.exports = LiveProduct;
