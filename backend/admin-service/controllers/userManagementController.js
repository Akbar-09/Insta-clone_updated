const internalApi = require('../services/internalApi');
const { AuditLog, Report } = require('../models');

exports.listUsers = async (req, res) => {
    try {
        const { page, limit, search } = req.query;
        const response = await internalApi.listUsers({ page, limit, search });

        if (response.data.success && response.data.data) {
            const users = response.data.data;
            const enrichedUsers = await Promise.all(users.map(async (user) => {
                const reportCount = await Report.count({ where: { reported_user_id: user.userId } });
                return { ...user, reportCount };
            }));

            return res.json({
                ...response.data,
                data: enrichedUsers
            });
        }

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.banUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const response = await internalApi.banUser(userId);

        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'BAN_USER',
            targetType: 'user',
            targetId: userId
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.unbanUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const response = await internalApi.unbanUser(userId);

        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'UNBAN_USER',
            targetType: 'user',
            targetId: userId
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const response = await internalApi.deleteUser(userId);

        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'DELETE_USER',
            targetType: 'user',
            targetId: userId
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

};

exports.getUserDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        const [userRes, postsRes, reelsRes, reportCount] = await Promise.all([
            internalApi.getUser(userId),
            internalApi.getUserPostCount(userId),
            internalApi.getUserReelCount(userId),
            Report.count({ where: { reported_user_id: userId } })
        ]);

        const user = userRes.data.data;
        const postCount = postsRes.data.data.count;
        const reelCount = reelsRes.data.data.count;

        res.json({
            success: true,
            data: {
                ...user,
                stats: {
                    posts: postCount,
                    reels: reelCount,
                    reports: reportCount,
                    // followers: user.followersCount, // Assuming these are in user object
                    // following: user.followingCount
                }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
