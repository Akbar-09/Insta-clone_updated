const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');

// Models
const Category = require('./models/Category');
const Article = require('./models/Article');
const Feedback = require('./models/Feedback');
const Tag = require('./models/Tag');
const ArticleTag = require('./models/ArticleTag');

// Associations
Category.hasMany(Article, { foreignKey: 'categoryId' });
Article.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Category, { as: 'Subcategories', foreignKey: 'parentId' });
Category.belongsTo(Category, { as: 'Parent', foreignKey: 'parentId' });
Article.hasMany(Feedback, { foreignKey: 'articleId' });
Article.belongsToMany(Tag, { through: ArticleTag, foreignKey: 'articleId' });
Tag.belongsToMany(Article, { through: ArticleTag, foreignKey: 'tagId' });

const helpRoutes = require('./routes/helpRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
// app.use(cors()); // Handled by Gateway
app.use(express.json());

// Routes
app.use('/', helpRoutes);
app.use('/admin', adminRoutes);

const PORT = 5060; // Dedicated port for help service

sequelize.authenticate()
    .then(() => {
        console.log('PostgreSQL Connected...');
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Help Service running on port ${PORT}`));
    })
    .catch(err => console.error('DB Connection Error:', err));
