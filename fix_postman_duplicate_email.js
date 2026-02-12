const fs = require('fs');
const path = require('path');

const collectionPath = path.join(__dirname, 'Jaadoe_Social_Network.postman_collection.json');

try {
    const content = fs.readFileSync(collectionPath, 'utf8');
    const collection = JSON.parse(content);

    const authService = collection.item.find(i => i.name === 'auth-service');
    if (authService) {

        // Helper to add dynamic pre-request script
        const addDynamicAuthScript = (item) => {
            if (!item.event) item.event = [];
            // Remove existing prerequest if any (to avoid duplicates, though mainly just overwriting)
            item.event = item.event.filter(e => e.listen !== 'prerequest');

            item.event.push({
                listen: "prerequest",
                script: {
                    exec: [
                        "const randomId = Math.floor(Math.random() * 1000000);",
                        "pm.environment.set(\"randomEmail\", `user_${randomId}@example.com`);",
                        "pm.environment.set(\"randomUsername\", `user_${randomId}`);",
                        "console.log(`Generated credentials: user_${randomId}`);"
                    ],
                    type: "text/javascript"
                }
            });

            // Update Body to use these variables
            if (item.request && item.request.body && item.request.body.mode === 'raw') {
                const body = JSON.parse(item.request.body.raw);
                body.email = "{{randomEmail}}";
                body.username = "{{randomUsername}}";
                item.request.body.raw = JSON.stringify(body, null, 2);
            }
        };

        // Apply to Signup
        const signup = authService.item.find(i => i.name === 'POST /signup');
        if (signup) {
            addDynamicAuthScript(signup);
            console.log('Fixed POST /signup to use dynamic random email/username');
        }

        // Apply to Register
        const register = authService.item.find(i => i.name === 'POST /register');
        if (register) {
            addDynamicAuthScript(register);
            console.log('Fixed POST /register to use dynamic random email/username');
        }
    }

    fs.writeFileSync(collectionPath, JSON.stringify(collection, null, 2));
    console.log('Postman collection updated with dynamic auth credentials.');

} catch (e) {
    console.error('Error fixing duplicates:', e);
}
