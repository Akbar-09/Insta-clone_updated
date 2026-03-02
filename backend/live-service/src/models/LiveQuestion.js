const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const LiveStream = require('./LiveStream');

const LiveQuestion = sequelize.define('LiveQuestion', {
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
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_highlighted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_answered: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'live_questions',
    timestamps: true,
    underscored: true
});

LiveStream.hasMany(LiveQuestion, { foreignKey: 'stream_id' });
LiveQuestion.belongsTo(LiveStream, { foreignKey: 'stream_id' });

module.exports = LiveQuestion;
