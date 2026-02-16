const pushService = require('./push.service');

const subscribe = async (req, res) => {
    try {
        const userId = req.user.id;
        const subscription = req.body;

        if (!subscription || !subscription.endpoint) {
            return res.status(400).json({ status: 'error', message: 'Invalid subscription' });
        }

        await pushService.subscribe(userId, subscription);
        res.json({ status: 'success', message: 'Subscribed to push notifications' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const getPublicKey = async (req, res) => {
    res.json({ status: 'success', data: { publicKey: process.env.VAPID_PUBLIC_KEY } });
};

module.exports = {
    subscribe,
    getPublicKey
};
