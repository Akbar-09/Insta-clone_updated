const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'user_db',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'password',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: false,
    }
);

module.exports = sequelize;
