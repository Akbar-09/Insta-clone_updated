const authenticateUser = (req, res, next) => {
    const userId = req.headers['x-user-id'];
    const username = req.headers['x-user-username'];

    if (!userId) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }

    req.user = {
        id: parseInt(userId),
        username: username
    };
    next();
};

module.exports = authenticateUser;
