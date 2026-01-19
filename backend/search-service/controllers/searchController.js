const { Op } = require('sequelize');
const SearchIndex = require('../models/SearchIndex');

const search = async (req, res) => {
    try {
        const { q, type } = req.query;
        if (!q) return res.status(400).json({ message: 'Query parameter q is required' });

        const where = {
            content: { [Op.iLike]: `%${q}%` }
        };

        if (type) {
            where.type = type;
        }

        const results = await SearchIndex.findAll({ where, limit: 20 });
        res.json({ status: 'success', data: results });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

module.exports = { search };
