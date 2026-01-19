const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ status: 'fail', message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
        }
        req.userId = decoded.id;
        req.username = decoded.username;
        next();
    });
};

module.exports = verifyToken;
