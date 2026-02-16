const fs = require('fs');
const path = require('path');

const endpointsPath = path.join(__dirname, 'all_endpoints.json');
const outputPath = path.join(__dirname, 'Instagram_Updated_Postman_Collection.json');

// Helper to generate a Postman Item
function generateItem(endpoint) {
    const item = {
        name: `${endpoint.method} ${endpoint.originalPath || endpoint.path}`,
        request: {
            method: endpoint.method,
            header: [
                {
                    key: 'Content-Type',
                    value: 'application/json'
                },
                {
                    key: 'Authorization',
                    value: 'Bearer {{token}}'
                }
            ],
            url: {
                raw: `{{baseUrl}}${endpoint.path}`,
                host: ['{{baseUrl}}'],
                path: endpoint.path.split('/').filter(p => p !== '')
            }
        }
    };

    // Add body if it's a POST, PUT, or PATCH
    if (['POST', 'PUT', 'PATCH'].includes(endpoint.method)) {
        item.request.body = {
            mode: 'raw',
            raw: JSON.stringify(generateBody(endpoint), null, 2)
        };
    }

    // Special handling for Login to save token
    if (endpoint.path.includes('/auth/login') && endpoint.method === 'POST') {
        item.event = [
            {
                listen: 'test',
                script: {
                    exec: [
                        'pm.test("Status code is 200", function () {',
                        '    pm.response.to.have.status(200);',
                        '});',
                        '',
                        'var jsonData = pm.response.json();',
                        '// Adjust this based on your actual response structure',
                        '// Assuming response structure: { status: "success", data: { token: "..." } }',
                        'if (jsonData.data && jsonData.data.token) {',
                        '    pm.collectionVariables.set("token", jsonData.data.token);',
                        '    console.log("Token saved (data.token): " + jsonData.data.token);',
                        '} else if (jsonData.token) {',
                        '    pm.collectionVariables.set("token", jsonData.token);',
                        '    console.log("Token saved (token): " + jsonData.token);',
                        '} else {',
                        '    console.log("Token not found in response");',
                        '}'
                    ],
                    type: 'text/javascript'
                }
            }
        ];
        // Add specific body for login if possible
        item.request.body.raw = JSON.stringify({
            email: "user@example.com",
            password: "password123",
            deviceId: "device-xyz"
        }, null, 2);
    }

    // Special handling for Signup
    if (endpoint.path.includes('/auth/signup') && endpoint.method === 'POST') {
        item.request.body.raw = JSON.stringify({
            email: "newuser@example.com",
            password: "password123",
            username: "newuser",
            fullName: "New User"
        }, null, 2);
    }


    return item;
}

// Helper to generate a dummy body based on path/method
function generateBody(endpoint) {
    // Simple heuristic for common fields
    const body = {};
    if (endpoint.path.includes('email')) body.email = "test@example.com";
    if (endpoint.path.includes('password')) body.password = "password123";
    if (endpoint.path.includes('comment')) body.content = "This is a comment";
    if (endpoint.path.includes('post')) body.caption = "This is a post caption";
    // Add more as needed or keep empty
    return body;
}

function main() {
    try {
        const rawData = fs.readFileSync(endpointsPath, 'utf8');
        const endpoints = JSON.parse(rawData);

        const collection = {
            info: {
                name: "Instagram Clone API (Updated)",
                schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
            },
            variable: [
                {
                    key: "baseUrl",
                    value: "http://192.168.1.5:5000",
                    type: "string"
                },
                {
                    key: "token",
                    value: "",
                    type: "string"
                }
            ],
            item: []
        };

        const services = {};

        // Group endpoints by service
        endpoints.forEach(endpoint => {
            if (!services[endpoint.service]) {
                services[endpoint.service] = [];
            }
            services[endpoint.service].push(generateItem(endpoint));
        });

        // Convert grouped services to collection folders
        const serviceNames = Object.keys(services).sort();

        // Reorder to put auth-service first
        const authIndex = serviceNames.indexOf('auth-service');
        if (authIndex > -1) {
            serviceNames.splice(authIndex, 1);
            serviceNames.unshift('auth-service');
        }

        serviceNames.forEach(serviceName => {
            collection.item.push({
                name: serviceName,
                item: services[serviceName]
            });
        });

        fs.writeFileSync(outputPath, JSON.stringify(collection, null, 2));
        console.log(`Successfully generated Postman collection at ${outputPath}`);

    } catch (error) {
        console.error("Error generating collection:", error);
    }
}

main();
