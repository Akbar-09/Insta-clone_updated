const fs = require('fs');

const collection = JSON.parse(fs.readFileSync('./Jaadoe_Social_Network.postman_collection.json', 'utf8'));
const userService = collection.item.find(i => i.name === 'user-service');

if (userService) {
    const checkList = [
        'POST /batch',
        'POST /feedback',
        'POST /muted',
        'POST /words',  // hidden-words
        'POST /block',  // block/userid
        'POST /report-problem',
        'POST /requests/reject',
        'POST /requests/accept'
    ];

    userService.item.forEach(item => {
        const matches = checkList.some(cl => item.name.includes(cl) || item.request.url.raw.includes(cl.split(' ')[1]));
        if (matches) {
            console.log(`Endpoint: ${item.name}`);
            console.log(`  URL: ${item.request.url.raw}`);
            if (item.request.body && item.request.body.raw) {
                console.log(`  Body: ${item.request.body.raw.replace(/\n/g, ' ')}`);
            } else {
                console.log(`  Body: NULL`);
            }
        }
    });

    console.log(`\nSpecific check for invalid UUIDs or bad paths:`);
    userService.item.forEach(item => {
        if (item.request.url.raw.includes('undefined')) {
            console.log(`  UNDEFINED in URL: ${item.name}, ${item.request.url.raw}`);
        }
    });
}
