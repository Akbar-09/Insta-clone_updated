const fs = require('fs');

const collectionPath = './Jaadoe_Social_Network.postman_collection.json';
const collection = JSON.parse(fs.readFileSync(collectionPath, 'utf8'));

// Helper to recursively traverse
function traverse(item, callback) {
    callback(item);
    if (item.item) {
        item.item.forEach(sub => traverse(sub, callback));
    }
}

const userService = collection.item.find(f => f.name === 'user-service');
if (userService) {
    traverse(userService, (item) => {
        if (!item.request) return;

        // Fix POST /batch
        if (item.name.includes('/batch') && item.request.method === 'POST') {
            item.request.body = {
                mode: 'raw',
                raw: JSON.stringify({
                    userIds: ["{{userId}}"]
                }, null, 2)
            };
        }

        // Fix POST /feedback
        if (item.name.includes('/feedback') && item.request.method === 'POST') {
            item.request.body = {
                mode: 'raw',
                raw: JSON.stringify({
                    rating: 5,
                    feedback: "This is a test feedback"
                }, null, 2)
            };
        }

        // Fix POST /hidden-words/words
        if (item.name.includes('/words') && item.request.method === 'POST') {
            item.request.body = {
                mode: 'raw',
                raw: JSON.stringify({
                    word: "testword"
                }, null, 2)
            };
        }

        // Fix POST /report-problem (ensure "description" or "details")
        if (item.name.includes('/report-problem') && item.request.method === 'POST') {
            // The error said "Please provide some details or attach a file."
            // Assuming field is 'details' or 'description'
            item.request.body = {
                mode: 'raw',
                raw: JSON.stringify({
                    reason: "Bug",
                    details: "This is a test report details field",
                    description: "This is a test report description field" // Sending both to be safe
                }, null, 2)
            };
        }

        // Remove bodies from GET requests in user-service too (safety)
        if (item.request.method === 'GET' || item.request.method === 'DELETE') {
            item.request.body = null;
        }
    });
}

fs.writeFileSync(collectionPath, JSON.stringify(collection, null, 2));
console.log('Postman collection updated for User Service (Fixed missing bodies).');
