const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');
const Category = require('./models/Category');

const check = async () => {
    try {
        await sequelize.authenticate();
        // Search for relevant categories
        const categories = await Category.findAll({
            where: {
                name: { [Sequelize.Op.iLike]: '%verified%' }
            }
        });

        if (categories.length > 0) {
            console.log('Found categories:');
            categories.forEach(c => console.log(`- Name: "${c.name}", Slug: "${c.slug}", ParentID: "${c.parentId}"`));
        } else {
            console.log('No "verified" category found.');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await sequelize.close();
    }
};

check();
