const fs = require('fs');
const path = require('path');

const collectionPath = path.join(__dirname, 'Jaadoe_Social_Network.postman_collection.json');

try {
    const collection = JSON.parse(fs.readFileSync(collectionPath, 'utf8'));

    // 1. Add Default Variables (baseUrl)
    if (!collection.variable) {
        collection.variable = [];
    }

    // Check if baseUrl exists, if not add it
    const baseUrlVar = collection.variable.find(v => v.key === 'baseUrl');
    if (!baseUrlVar) {
        collection.variable.push({
            key: "baseUrl",
            value: "http://localhost:5000",
            type: "string"
        });
        console.log('Added default baseUrl variable.');
    }

    // 2. Add Test Scripts to Auth Endpoints
    const authService = collection.item.find(item => item.name === 'auth-service');
    if (authService) {
        const endpointsToUpdate = ['POST /signup', 'POST /login', 'POST /admin/auth/login']; // Added admin login too

        endpointsToUpdate.forEach(endpointName => {
            const requestItem = authService.item.find(item => item.name === endpointName);

            // Check nested items just in case structure varies, but based on previous read it's flat under service
            if (requestItem) {
                // Define the test script
                const testScript = {
                    listen: "test",
                    script: {
                        exec: [
                            "var jsonData = pm.response.json();",
                            "if (jsonData.status === 'success' || jsonData.status === 'true' || (jsonData.data && jsonData.data.token)) {",
                            "    if (jsonData.data && jsonData.data.token) {",
                            "        pm.environment.set(\"token\", jsonData.data.token);",
                            "        pm.globals.set(\"token\", jsonData.data.token);",
                            "        console.log(\"Token updated successfully\");",
                            "    }",
                            "}"
                        ],
                        type: "text/javascript"
                    }
                };

                // Add or replace event
                if (!requestItem.event) {
                    requestItem.event = [];
                }

                // Remove existing test script if any
                requestItem.event = requestItem.event.filter(e => e.listen !== 'test');
                requestItem.event.push(testScript);

                console.log(`Updated test script for ${endpointName}`);
            }
        });

        // Also check admin-service login
        const adminService = collection.item.find(item => item.name === 'admin-service');
        if (adminService) {
            const adminLogin = adminService.item.find(item => item.name === 'POST /login'); // Check exact name from previous file view
            if (adminLogin) {
                // ... logic similar to above
                const testScript = {
                    listen: "test",
                    script: {
                        exec: [
                            "var jsonData = pm.response.json();",
                            "if (jsonData.data && jsonData.data.token) {",
                            "    pm.environment.set(\"token\", jsonData.data.token);",
                            "    pm.globals.set(\"token\", jsonData.data.token);",
                            "}"
                        ],
                        type: "text/javascript"
                    }
                };
                if (!adminLogin.event) adminLogin.event = [];
                adminLogin.event = adminLogin.event.filter(e => e.listen !== 'test');
                adminLogin.event.push(testScript);
                console.log('Updated test script for Admin POST /login');
            }
        }

    } else {
        console.log('Auth Service folder not found');
    }

    fs.writeFileSync(collectionPath, JSON.stringify(collection, null, 2));
    console.log('Postman collection updated successfully.');

} catch (err) {
    console.error('Error updating collection:', err);
}
