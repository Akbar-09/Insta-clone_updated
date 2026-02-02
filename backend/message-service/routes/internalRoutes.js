const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const { Op } = require('sequelize');

// List flagged conversations
router.get('/conversations', async (req, res) => {
    try {
        const { risk, status, page = 1, limit = 10 } = req.query;
        const offset = (parseInt(page) - 1) * parseInt(limit);

        const whereClause = {
            status: { [Op.ne]: 'cleared' }
        };

        if (risk && risk !== 'all') whereClause.riskLevel = risk;
        if (status && status !== 'all') whereClause.status = status;

        const { count, rows } = await Conversation.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset,
            order: [['riskScore', 'DESC'], ['flaggedAt', 'DESC']]
        });

        res.json({
            success: true,
            data: rows,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(count / parseInt(limit))
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// DM Oversight Stats
router.get('/stats', async (req, res) => {
    try {
        const highRisk = await Conversation.count({ where: { riskLevel: 'high', status: 'flagged' } });
        const underInvestigation = await Conversation.count({ where: { status: 'investigating' } });
        const safeCleared = await Conversation.count({ where: { status: 'cleared' } });

        res.json({
            success: true,
            data: { highRisk, underInvestigation, safeCleared }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Fetch full transcript
router.get('/conversations/:conversationId/transcript', async (req, res) => {
    try {
        const conv = await Conversation.findByPk(req.params.conversationId);
        if (!conv) return res.status(404).json({ success: false, message: 'Conversation not found' });

        const messages = await Message.findAll({
            where: { conversationId: conv.id },
            order: [['createdAt', 'ASC']]
        });

        res.json({
            success: true,
            data: {
                conversationId: conv.id,
                riskScore: conv.riskScore,
                aiFlags: conv.aiFlags || [],
                messages: messages
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Mark conversation safe
router.patch('/conversations/:conversationId/mark-safe', async (req, res) => {
    try {
        const conv = await Conversation.findByPk(req.params.conversationId);
        if (!conv) return res.status(404).json({ success: false, message: 'Conversation not found' });

        conv.status = 'cleared';
        await conv.save();

        res.json({ success: true, message: 'Conversation marked safe', data: conv });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
