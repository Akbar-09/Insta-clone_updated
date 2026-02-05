const fs = require('fs');

const endpoints = JSON.parse(fs.readFileSync('all_endpoints.json', 'utf8'));

const collection = {
    info: {
        name: "Jaadoe Social Network API",
        schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    item: [],
    auth: {
        type: "bearer",
        bearer: [
            {
                key: "token",
                value: "{{token}}",
                type: "string"
            }
        ]
    },
    variable: [
        {
            key: "baseUrl",
            value: "http://localhost:5000/api/v1",
            type: "string"
        },
        {
            key: "token",
            value: "",
            type: "string"
        }
    ]
};

const serviceFolders = {};

endpoints.forEach(ep => {
    if (!serviceFolders[ep.service]) {
        serviceFolders[ep.service] = {
            name: ep.service,
            item: []
        };
        collection.item.push(serviceFolders[ep.service]);
    }

    const routeMap = {
        'auth-service': 'auth',
        'user-service': 'users',
        'post-service': 'posts',
        'story-service': 'stories',
        'comment-service': 'comments',
        'feed-service': 'feed',
        'notification-service': 'notifications',
        'search-service': 'search',
        'message-service': 'messages',
        'reel-service': 'reels',
        'media-service': 'media',
        'ad-service': 'ads',
        'live-service': 'live',
        'admin-service': 'admin'
    };

    const gatewayRoute = routeMap[ep.service];
    const cleanPath = ep.path === '/' ? '' : ep.path;

    const request = {
        name: `${ep.method} ${ep.path} (${ep.file})`,
        request: {
            method: ep.method,
            header: [
                {
                    key: "Content-Type",
                    value: "application/json"
                }
            ],
            url: {
                raw: `{{baseUrl}}/${gatewayRoute}${cleanPath.replace(/:(\w+)/g, '{{$1}}')}`,
                host: ["{{baseUrl}}"],
                path: [gatewayRoute, ...cleanPath.split('/').filter(p => p)]
            }
        },
        response: []
    };

    // Special logic for Login to save token
    if ((ep.path === '/login' || ep.path === '/signup') && (ep.service === 'auth-service' || ep.service === 'admin-service')) {
        request.event = [
            {
                listen: "test",
                script: {
                    exec: [
                        "var jsonData = pm.response.json();",
                        "if (jsonData.data && jsonData.data.token) {",
                        "    pm.collectionVariables.set(\"token\", jsonData.data.token);",
                        "}"
                    ],
                    type: "text/javascript"
                }
            }
        ];
    }

    // Body for POST/PUT if needed (simple placeholder)
    if (ep.method === 'POST' || ep.method === 'PUT' || ep.method === 'PATCH') {
        request.request.body = {
            mode: "raw",
            raw: "{}"
        };
    }

    serviceFolders[ep.service].item.push(request);
});

fs.writeFileSync('Jaadoe_Social_Network.postman_collection.json', JSON.stringify(collection, null, 2));
console.log('Postman collection generated successfully!');
