const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');
const Category = require('./models/Category');

const check = async () => {
    try {
        await sequelize.authenticate();
        const categories = await Category.findAll({
            where: {
                name: { [Sequelize.Op.iLike]: '%verified%' }
            }
        });

        console.log('--- FOUND CATEGORIES ---');
        categories.forEach(c => {
            console.log(`Name: '${c.name}'`);
            console.log(`Slug: '${c.slug}'`);
            console.log(`ParentId: '${c.parentId}'`);
            console.log('------------------------');
        });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await sequelize.close();
    }
};

check();
