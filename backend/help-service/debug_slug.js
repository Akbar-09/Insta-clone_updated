const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');
const Category = require('./models/Category');

const check = async () => {
    try {
        await sequelize.authenticate();
        const category = await Category.findOne({
            where: { name: 'Subscription on Jaadoe' }
        });
        if (category) {
            console.log('Category Slug:', category.slug);
            console.log('Category ID:', category.id);
        } else {
            console.log('Category not found');
        }
    } catch (err) {
        console.error(err);
    } finally {
        await sequelize.close();
    }
};
check();
