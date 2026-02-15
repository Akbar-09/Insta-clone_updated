const { Op, fn, col, literal } = require('sequelize');
const ContentMetric = require('../models/ContentMetric');
const AccountMetric = require('../models/AccountMetric');
const Impression = require('../models/Impression');
const Interaction = require('../models/Interaction');
const FollowerActivity = require('../models/FollowerActivity');
const sequelize = require('../config/database');
const axios = require('axios');

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:5002';

const insightController = {
    getAccountInsights: async (req, res) => {
        try {
            const userId = req.headers['x-user-id'];
            const { range = '7' } = req.query; // 7, 30, 90 days

            const startDate = new Date();
            startDate.setDate(startDate.getDate() - parseInt(range));

            // 1. Basic aggregates from AccountMetric
            const metrics = await AccountMetric.findAll({
                where: {
                    userId,
                    date: { [Op.gte]: startDate }
                },
                order: [['date', 'ASC']]
            });

            // 2. Calculate Unique Accounts Reached from raw Impressions
            const reachData = await Impression.findOne({
                attributes: [[fn('COUNT', fn('DISTINCT', col('viewerId'))), 'totalReach']],
                where: {
                    userId,
                    timestamp: { [Op.gte]: startDate }
                }
            });

            // 3. Calculate Engaged Accounts from raw Interactions
            const engagementData = await Interaction.findOne({
                attributes: [[fn('COUNT', fn('DISTINCT', col('actorId'))), 'totalEngaged']],
                where: {
                    userId,
                    timestamp: { [Op.gte]: startDate }
                }
            });

            // 4. Summarize stats
            const summary = {
                totalViews: metrics.reduce((acc, m) => acc + (m.totalReach || 0), 0), // Simulating views as sum of reach for now or add views field
                accountsReached: parseInt(reachData.get('totalReach') || 0),
                accountsEngaged: parseInt(engagementData.get('totalEngaged') || 0),
                profileVisits: metrics.reduce((acc, m) => acc + (m.profileVisits || 0), 0),
                followerGrowth: {
                    gained: metrics.reduce((acc, m) => acc + (m.newFollowers || 0), 0),
                    lost: metrics.reduce((acc, m) => acc + (m.lostFollowers || 0), 0),
                    net: metrics.reduce((acc, m) => acc + (m.newFollowers - m.lostFollowers || 0), 0)
                },
                timeSeries: metrics
            };

            res.json({ status: 'success', data: summary });
        } catch (error) {
            console.error('Account Insights Error:', error);
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    getContentInsights: async (req, res) => {
        try {
            const userId = req.headers['x-user-id'];
            const { type = 'ALL', sort = 'newest', range = '7' } = req.query;

            const startDate = new Date();
            startDate.setDate(startDate.getDate() - parseInt(range));

            // Sorting logic
            let order = [[col('lastActive'), 'DESC']];
            if (sort === 'highest_engagement') {
                order = [[literal('SUM(likes) + SUM(comments) + SUM(saves) + SUM(shares)'), 'DESC']];
            } else if (sort === 'views') {
                order = [[col('totalViews'), 'DESC']];
            }

            // We want to group by contentId to get totals for the range
            const contentStats = await ContentMetric.findAll({
                attributes: [
                    'contentId',
                    'contentType',
                    [fn('SUM', col('views')), 'totalViews'],
                    [fn('SUM', col('likes')), 'totalLikes'],
                    [fn('SUM', col('comments')), 'totalComments'],
                    [fn('SUM', col('shares')), 'totalShares'],
                    [fn('SUM', col('saves')), 'totalSaves'],
                    [fn('MAX', col('date')), 'lastActive']
                ],
                where: {
                    userId,
                    date: { [Op.gte]: startDate },
                    ...(type !== 'ALL' && { contentType: type })
                },
                group: ['contentId', 'contentType'],
                order: order
            });

            res.json({ status: 'success', data: contentStats });
        } catch (error) {
            console.error('Content Insights Error:', error);
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    getFollowerHeatmap: async (req, res) => {
        try {
            const userId = req.headers['x-user-id'];
            const heatmap = await FollowerActivity.findAll({
                where: { userId }
            });

            res.json({ status: 'success', data: heatmap });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
};

module.exports = insightController;
