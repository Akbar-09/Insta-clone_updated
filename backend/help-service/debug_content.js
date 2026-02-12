const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');
const Category = require('./models/Category');
const Article = require('./models/Article');

const check = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB.');

        // 1. Find the Category "Subscription on Jaadoe"
        const category = await Category.findOne({
            where: { name: 'Subscription on Jaadoe' }
        });

        if (!category) {
            console.log('Category "Subscription on Jaadoe" NOT FOUND.');
            return;
        }

        console.log('Category Found:', category.toJSON());

        // 2. Find Articles linked to this Category
        const articles = await Article.findAll({
            where: { categoryId: category.id }
        });

        console.log(`Found ${articles.length} articles for this category.`);
        articles.forEach(a => {
            console.log(`- Title: "${a.title}", Slug: "${a.slug}", Status: "${a.status}", ID: ${a.id}`);
        });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await sequelize.close();
    }
};

check();
