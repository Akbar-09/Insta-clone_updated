const SearchIndex = require('../models/SearchIndex');
const { Op } = require('sequelize');

exports.search = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.trim() === '') {
            return res.json({ status: 'success', data: [] });
        }

        // Search for Users or Hashtags that match the query
        const results = await SearchIndex.findAll({
            where: {
                content: {
                    [Op.iLike]: `%${q}%`
                }
            },
            limit: 20
        });

        res.json({ status: 'success', data: results });
    } catch (error) {
        console.error('Search Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};
