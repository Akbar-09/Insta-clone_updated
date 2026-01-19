const { client } = require('./config/redis');

const clearCache = async () => {
    try {
        await client.connect();
        console.log('Redis Connected.');

        await client.del('global_feed');
        console.log('global_feed cleared.');

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

clearCache();
