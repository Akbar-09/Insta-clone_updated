const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'live_db',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'aspire123', // Using the password from conversation history
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        port: process.env.DB_PORT || 5432,
        logging: false,
    }
);

module.exports = sequelize;
