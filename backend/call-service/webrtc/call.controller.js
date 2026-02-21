const callService = require('./call.service');

class CallController {
    async startCall(req, res) {
        try {
            console.log("startCall received body:", req.body);
            const { callerId, receiverId, callType } = req.body;
            const callLog = await callService.createCallLog({
                caller_id: callerId,
                receiver_id: receiverId,
                call_type: callType,
                status: 'missed', // Default status until accepted/completed
                started_at: new Date()
            });
            res.status(201).json(callLog);
        } catch (error) {
            console.error("error in startCall:", error);
            res.status(500).json({ error: error.message, stack: error.stack });
        }
    }

    async updateStatus(req, res) {
        try {
            const { id } = req.params;
            const { status, endedAt, duration } = req.body;
            const updateData = { status };
            if (endedAt) updateData.ended_at = endedAt;
            if (duration) updateData.duration_seconds = duration;

            const callLog = await callService.updateCallLog(id, updateData);
            res.status(200).json(callLog);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getHistory(req, res) {
        try {
            const { userId } = req.params;
            const history = await callService.getCallHistory(userId);
            res.status(200).json(history);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CallController();
