const fs = require('fs');
const collection = JSON.parse(fs.readFileSync('./Jaadoe_Social_Network.postman_collection.json', 'utf8'));

const otherServices = [
    'feed-service', 'story-service', 'reel-service', 'message-service',
    'notification-service', 'search-service', 'ad-service', 'insight-service',
    'help-service', 'live-service', 'admin-service'
];

otherServices.forEach(name => {
    const service = collection.item.find(f => f.name === name);
    if (!service) return;
    console.log(`\n--- ${name} ---`);
    if (service.item) {
        service.item.forEach(i => console.log(i.name));
    }
});
