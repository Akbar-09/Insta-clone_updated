const Category = require('../models/Category');
const Article = require('../models/Article');
const Feedback = require('../models/Feedback');
const Tag = require('../models/Tag');
const { Op, Sequelize } = require('sequelize');

// Public: Get Categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            where: { parentId: null },
            include: [{ model: Category, as: 'Subcategories' }],
            order: [['order', 'ASC']]
        });
        res.json({ status: 'success', data: categories });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Public: Get Category by Slug (for category page)
exports.getCategoryBySlug = async (req, res) => {
    try {
        const category = await Category.findOne({
            where: { slug: req.params.slug },
            include: [
                { model: Category, as: 'Subcategories' },
                {
                    model: Category,
                    as: 'Parent'
                }
            ]
        });

        if (!category) {
            return res.status(404).json({ status: 'fail', message: 'Category not found' });
        }

        const articles = await Article.findAll({
            where: { categoryId: category.id, status: 'published' },
            limit: 20, // Pagination can be added
            order: [['createdAt', 'DESC']]
        });

        res.json({ status: 'success', data: { category, articles } });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
}

// Public: Get All Articles (Latest/Popular)
exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.findAll({
            where: { status: 'published' },
            limit: 10,
            order: [['createdAt', 'DESC']],
            include: [{ model: Category, attributes: ['name', 'slug'] }]
        });
        res.json({ status: 'success', data: articles });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.getFeaturedArticles = async (req, res) => {
    try {
        const articles = await Article.findAll({
            where: { isFeatured: true, status: 'published' },
            limit: 6
        });
        res.json({ status: 'success', data: articles });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Public: Get Article by Slug
exports.getArticleBySlug = async (req, res) => {
    try {
        const article = await Article.findOne({
            where: { slug: req.params.slug, status: 'published' },
            include: [
                { model: Category },
                { model: Tag } // Include tags
            ]
        });
        if (!article) return res.status(404).json({ status: 'fail', message: 'Article not found' });

        await article.increment('views'); // Increment view count

        // Find related articles (same category, excluding current)
        const relatedArticles = await Article.findAll({
            where: {
                categoryId: article.categoryId,
                id: { [Op.ne]: article.id },
                status: 'published'
            },
            limit: 3
        });

        res.json({ status: 'success', data: { article, relatedArticles } });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Public: Search Articles (Full Text Search)
exports.searchArticles = async (req, res) => {
    const { q } = req.query;
    if (!q) return res.json({ status: 'success', data: [] });

    try {
        // Use PostgreSQL Full Text Search
        const articles = await Article.findAll({
            where: {
                status: 'published',
                [Op.or]: [
                    { title: { [Op.iLike]: `%${q}%` } }, // Fallback to iLike for simpler matches or if FTS not set up yet
                    { content: { [Op.iLike]: `%${q}%` } }
                    // For true FTS, we'd use Sequelize.literal but iLike is safer to start if vector column isn't pre-generated
                ]
            },
            limit: 20
        });

        // Note: For true scalability with millions of rows, we'd implement tsvector column and index.
        // For now, iLike is functional for the prototype.

        res.json({ status: 'success', data: articles });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.submitFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.create(req.body);
        res.json({ status: 'success', data: feedback });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// --- ADMIN CONTROLLERS ---

// Admin: Create Category
exports.createCategory = async (req, res) => {
    try {
        const { name, slug, icon, parentId, order } = req.body;

        const existingCategory = await Category.findOne({ where: { slug } });
        if (existingCategory) {
            return res.status(409).json({ status: 'fail', message: 'Category with this slug already exists' });
        }

        const finalParentId = (parentId === "" || parentId === "null" || parentId === 0) ? null : parentId;

        const category = await Category.create({ name, slug, icon, parentId: finalParentId, order });
        res.json({ status: 'success', data: category });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Admin: Update Category
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        await category.update(req.body);
        res.json({ status: 'success', data: category });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Admin: Delete Category
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        await category.destroy();
        res.json({ status: 'success', message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Admin: Create Article
exports.createArticle = async (req, res) => {
    try {
        const { title, slug, content, excerpt, categoryId, isFeatured, status, tags } = req.body;
        const article = await Article.create({
            title, slug, content, excerpt, categoryId, isFeatured, status
        });

        if (tags && tags.length > 0) {
            // Find or create tags and associate
            for (const tagName of tags) {
                const [tag] = await Tag.findOrCreate({ where: { name: tagName, slug: tagName.toLowerCase().replace(/ /g, '-') } });
                await article.addTag(tag);
            }
        }

        res.json({ status: 'success', data: article });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Admin: Update Article
exports.updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findByPk(id);
        if (!article) return res.status(404).json({ message: 'Article not found' });

        await article.update(req.body);

        if (req.body.tags) {
            const tagInstances = [];
            for (const tagName of req.body.tags) {
                const [tag] = await Tag.findOrCreate({ where: { name: tagName, slug: tagName.toLowerCase().replace(/ /g, '-') } });
                tagInstances.push(tag);
            }
            await article.setTags(tagInstances);
        }

        res.json({ status: 'success', data: article });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Admin: Delete Article
exports.deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findByPk(id);
        if (!article) return res.status(404).json({ message: 'Article not found' });

        await article.destroy();
        res.json({ status: 'success', message: 'Article deleted' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Admin: Get All Articles (Paginated, for CMS)
exports.getAdminArticles = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Article.findAndCountAll({
            include: [{ model: Category, attributes: ['name'] }],
            order: [['updatedAt', 'DESC']],
            limit,
            offset
        });

        res.json({
            status: 'success',
            data: rows,
            pagination: {
                total: count,
                page,
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
