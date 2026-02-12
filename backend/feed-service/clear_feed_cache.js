const { client } = require('./config/redis');
require('dotenv').config();

async function clear() {
    try {
        console.log('Connecting to Redis...');
        await client.connect(); // v4 client
        console.log('Connected.');

        await client.del('global_feed');
        console.log('Cleared global_feed.');

    } catch (e) {
        console.error(e);
    } finally {
        await client.quit();
    }
}

clear();
