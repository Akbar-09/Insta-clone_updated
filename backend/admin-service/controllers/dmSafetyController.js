const { publishEvent } = require('../config/rabbitmq');
const { AuditLog } = require('../models');

exports.getReportedMessages = async (req, res) => {
    try {
        res.json({
            success: true, data: [
                { id: 1, senderId: 101, text: 'Harmful message', reportedBy: 102 }
            ]
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.flagConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { reason } = req.body;

        await publishEvent('CONVERSATION_FLAGGED', { conversationId, reason, adminId: req.admin.id });

        await AuditLog.create({
            adminId: req.admin.id,
            adminUsername: req.admin.username,
            action: 'FLAG_CONVERSATION',
            resourceType: 'MESSAGE',
            resourceId: conversationId,
            details: { reason }
        });

        res.json({ success: true, message: 'Conversation flagged' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
