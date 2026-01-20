require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./config/database');
const Post = require('./models/Post');

async function testQuery() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // 1. Standard Sort Test (No literal)
        console.log('Testing Standard Sort...');
        const posts = await Post.findAll({
            order: [
                ['likesCount', 'DESC'],
                ['createdAt', 'DESC']
            ],
            limit: 5,
            raw: true
        });
        console.log('Standard Sort Passed:', posts.length);

    } catch (error) {
        console.error('Query failed:', error);
    } finally {
        await sequelize.close();
    }
}

testQuery();
