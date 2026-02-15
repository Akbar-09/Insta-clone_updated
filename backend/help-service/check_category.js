const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');
const Category = require('./models/Category');

const check = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected.');

        const existing = await Category.findOne({ where: { slug: 'subscription' } });
        if (existing) {
            console.log('Category "subscription" already exists!');
            console.log(existing.toJSON());
        } else {
            console.log('Category "subscription" does NOT exist.');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await sequelize.close();
    }
};

check();
