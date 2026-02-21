const { Op } = require('sequelize');
const CallLog = require('../models/CallLog');

class CallService {
    async createCallLog(data) {
        return await CallLog.create(data);
    }

    async updateCallLog(id, updateData) {
        const callLog = await CallLog.findByPk(id);
        if (!callLog) throw new Error('Call log not found');
        return await callLog.update(updateData);
    }

    async getCallHistory(userId) {
        return await CallLog.findAll({
            where: {
                [Op.or]: [
                    { caller_id: userId },
                    { receiver_id: userId }
                ]
            },
            order: [['started_at', 'DESC']]
        });
    }
}

module.exports = new CallService();
