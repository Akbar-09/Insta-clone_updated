const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');
const Category = require('./models/Category');

const check = async () => {
    try {
        await sequelize.authenticate();

        const subscription = await Category.findOne({ where: { slug: 'subscription' } });
        if (!subscription) {
            console.log('Subscription category not found');
            return;
        }
        console.log(`Subscription ID: ${subscription.id}`);

        const subCats = await Category.findAll({ where: { parentId: subscription.id } });
        console.log('Subcategories of Subscription:');
        subCats.forEach(c => {
            console.log(`- Name: "${c.name}", Slug: "${c.slug}"`);
        });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await sequelize.close();
    }
};

check();
