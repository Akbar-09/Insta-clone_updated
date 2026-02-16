const fs = require('fs');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

// Load Swagger Config
// Note: We need to adapt the path since we are in backend root, not gateway root
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Instagram Clone API',
            version: '1.0.0',
            description: 'API Documentation for Flutter Developers',
        },
        servers: [
            { url: 'http://192.168.1.5:5000/api/v1', description: 'Local Development Gateway' }
        ],
    },
    apis: ['./gateway/src/swagger/*.js'], // Adjusted path relative to backend root
};

const swaggerSpec = swaggerJsdoc(options);

// Helper to generate complex curl commands
function generateCurl(method, url, params, body) {
    let cmd = `curl -X ${method.toUpperCase()} "${url}" \\\n  -H "Content-Type: application/json"`;

    // Add Authorization header
    cmd += ` \\\n  -H "Authorization: Bearer <YOUR_TOKEN>"`;

    if (body) {
        cmd += ` \\\n  -d '${JSON.stringify(body, null, 2)}'`;
    }
    return cmd;
}

// Generate Markdown
let md = `# Instagram Clone API Documentation (Flutter)\n\n`;
md += `**Base URL:** \`http://192.168.1.5:5000/api/v1\`\n\n`;
md += `**Authentication:** All endpoints (except Auth/Public) typically require a Bearer Token via \`Authorization\` header.\n\n`;

// Tag Order
const tagOrder = [
    'Auth', 'Users', 'Posts', 'Stories', 'Reels', 'Feed', 'Comments',
    'Messages', 'Notifications', 'Search', 'Media', 'Ads', 'Live', 'Insights', 'Admin', 'Help'
];

// Group paths by tag
const pathsByTag = {};
Object.keys(swaggerSpec.paths).forEach(pathKey => {
    const pathItem = swaggerSpec.paths[pathKey];
    Object.keys(pathItem).forEach(method => {
        const operation = pathItem[method];
        const tag = operation.tags ? operation.tags[0] : 'Uncategorized';

        if (!pathsByTag[tag]) pathsByTag[tag] = [];
        pathsByTag[tag].push({
            method: method.toUpperCase(),
            path: pathKey,
            ...operation
        });
    });
});

// Iterate through tags
tagOrder.forEach(tag => {
    const endpoints = pathsByTag[tag];
    if (!endpoints || endpoints.length === 0) return;

    md += `## ${tag}\n\n`;

    endpoints.forEach(endpoint => {
        md += `### ${endpoint.summary || endpoint.description || (endpoint.method + ' ' + endpoint.path)}\n\n`;
        md += `**Endpoint:** \`${endpoint.method} ${endpoint.path}\`\n\n`;

        // Parameters
        if (endpoint.parameters && endpoint.parameters.length > 0) {
            md += `#### Parameters\n`;
            md += `| Name | In | Type | Required | Description |\n`;
            md += `|---|---|---|---|---|\n`;
            endpoint.parameters.forEach(param => {
                md += `| \`${param.name}\` | ${param.in} | ${param.schema?.type || 'string'} | ${param.required ? '✅' : '❌'} | ${param.description || '-'} |\n`;
            });
            md += `\n`;
        }

        // Request Body
        let bodyExample = null;
        if (['POST', 'PUT', 'PATCH'].includes(endpoint.method)) {
            // Try to infer body structure (Swagger usually has requestBody, but our auto_generated might not be complete yet)
            // We'll create a generic example based on common patterns if not explicit
            if (tag === 'Auth' && endpoint.path.includes('/login')) {
                bodyExample = { email: "user@example.com", password: "password123", deviceId: "device-xyz" };
            } else if (tag === 'Auth' && endpoint.path.includes('/register')) {
                bodyExample = { email: "user@example.com", password: "password123", username: "newuser", fullName: "New User" };
            } else if (tag === 'Posts' && endpoint.method === 'POST') {
                bodyExample = { caption: "My new post", mediaUrls: ["http://..."], location: "New York" };
            } else if (tag === 'Comments') {
                bodyExample = { content: "Great post!" };
            } else {
                bodyExample = { field1: "value1", field2: "value2" };
            }

            md += `#### Request Body (Example)\n\`\`\`json\n${JSON.stringify(bodyExample, null, 2)}\n\`\`\`\n\n`;
        }

        // CURL Example
        const fullUrl = `http://192.168.1.5:5000/api/v1${endpoint.path.replace(/:([a-zA-Z0-9_]+)/g, '{$1}')}`;
        // Note: curl usually doesn't like {:id} syntax, but for documentation it's clear. 
        // Let's replace simple params with placeholders.
        const curlUrl = `http://192.168.1.5:5000/api/v1${endpoint.path.replace(/:([a-zA-Z0-9_]+)/g, '123')}`;

        md += `#### Sample Request (CURL)\n\`\`\`bash\n${generateCurl(endpoint.method, curlUrl, null, bodyExample)}\n\`\`\`\n\n`;

        // Response Example
        md += `#### Sample Response\n\`\`\`json\n{\n  "status": "success",\n  "data": { ... }\n}\n\`\`\`\n\n`;

        md += `---\n\n`;
    });
});

// Sort uncategorized if any
if (pathsByTag['Uncategorized']) {
    md += `## Uncategorized\n\n`;
    pathsByTag['Uncategorized'].forEach(endpoint => {
        md += `### ${endpoint.method} ${endpoint.path}\n`;
        // ... (simplified)
        md += `\n`;
    });
}

fs.writeFileSync('api_docs_flutter.md', md);
console.log('Documentation generated: api_docs_flutter.md');
