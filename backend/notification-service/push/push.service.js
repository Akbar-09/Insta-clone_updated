const PushSubscription = require('../models/PushSubscription');

const subscribe = async (userId, subscription) => {
    const { endpoint, keys } = subscription;
    const { p256dh, auth } = keys;

    // Remove old subscription if exists to avoid duplicates
    await PushSubscription.destroy({
        where: {
            userId: userId,
            endpoint: endpoint
        }
    });

    return await PushSubscription.create({
        userId,
        endpoint,
        p256dh,
        auth
    });
};

const unsubscribe = async (userId, endpoint) => {
    return await PushSubscription.destroy({
        where: {
            userId,
            endpoint
        }
    });
};


module.exports = {
    subscribe,
    unsubscribe
};
