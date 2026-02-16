const fs = require('fs');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

// Load Swagger Config
// We are in backend/gateway
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
    apis: ['./src/swagger/*.js', './index.js'], // Relative to gateway folder
};

const swaggerSpec = swaggerJsdoc(options);

// Helper to generate complex curl commands
function generateCurl(method, url, tag, path, body) {
    let cmd = `curl -X ${method.toUpperCase()} "${url}" \\\n  -H "Content-Type: application/json"`;

    // Auth header
    if (!(tag === 'Auth' && (path.includes('/login') || path.includes('/register') || path.includes('/signup')))) {
        cmd += ` \\\n  -H "Authorization: Bearer <YOUR_TOKEN>"`;
    }

    if (body) {
        cmd += ` \\\n  -d '${JSON.stringify(body)}'`; // Minified for curl
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
// Also keep track of "Uncategorized"
let uncategorized = [];

if (swaggerSpec.paths) {
    Object.keys(swaggerSpec.paths).forEach(pathKey => {
        const pathItem = swaggerSpec.paths[pathKey];
        Object.keys(pathItem).forEach(method => {
            if (method === 'parameters') return; // skip common params
            const operation = pathItem[method];
            const tag = operation.tags ? operation.tags[0] : 'Uncategorized';

            if (tag === 'Uncategorized') {
                if (!pathsByTag['Uncategorized']) pathsByTag['Uncategorized'] = [];
                pathsByTag['Uncategorized'].push({ method, path: pathKey, ...operation });
            } else {
                if (!pathsByTag[tag]) pathsByTag[tag] = [];
                pathsByTag[tag].push({ method: method.toUpperCase(), path: pathKey, ...operation });
            }
        });
    });
}

// Iterate through tags
tagOrder.forEach(tag => {
    const endpoints = pathsByTag[tag];
    if (!endpoints || endpoints.length === 0) return;

    md += `## ${tag}\n\n`;

    endpoints.forEach(endpoint => {
        const summary = endpoint.summary || endpoint.description || (endpoint.method + ' ' + endpoint.path);
        md += `### ${summary}\n\n`;
        md += `**Endpoint:** \`${endpoint.method} ${endpoint.path}\`\n\n`;

        // Parameters
        if (endpoint.parameters && endpoint.parameters.length > 0) {
            md += `#### Parameters\n`;
            md += `| Name | In | Type | Required | Description |\n`;
            md += `|---|---|---|---|---|\n`;
            endpoint.parameters.forEach(param => {
                const type = param.schema?.type || (param.type || 'string');
                const required = param.required ? '✅' : '❌';
                const desc = param.description || '-';
                md += `| \`${param.name}\` | ${param.in} | ${type} | ${required} | ${desc} |\n`;
            });
            md += `\n`;
        }

        // Request Body
        let bodyExample = null;
        if (['POST', 'PUT', 'PATCH'].includes(endpoint.method)) {
            // Heuristic for body content
            if (tag === 'Auth' && (endpoint.path.includes('/login'))) {
                bodyExample = { email: "user@example.com", password: "password123", deviceId: "device-xyz" };
            } else if (tag === 'Auth' && (endpoint.path.includes('/register') || endpoint.path.includes('/signup'))) {
                bodyExample = { email: "user@example.com", password: "password123", username: "newuser", fullName: "New User" };
            } else if (tag === 'Posts' && endpoint.method === 'POST') {
                bodyExample = { caption: "My new post", mediaUrls: ["http://..."], location: "New York" };
            } else if (tag === 'Comments') {
                bodyExample = { content: "Great post!" };
            } else if (tag === 'Ads') {
                bodyExample = { adType: "NEW_MEDIA", caption: "Ad Body", mediaItems: [{ mediaType: "IMAGE", url: "http://..." }] };
            } else {
                // Generic fallback
                bodyExample = { field1: "value1", field2: "value2" };
            }

            md += `#### Request Body (Example)\n\`\`\`json\n${JSON.stringify(bodyExample, null, 2)}\n\`\`\`\n\n`;
        }

        // CURL Example
        // Replace dynamic params :id or {id} with 123 for copy-paste
        let curlPath = endpoint.path.replace(/:([a-zA-Z0-9_]+)/g, '123').replace(/{([a-zA-Z0-9_]+)}/g, '123');
        const fullUrl = `http://192.168.1.5:5000/api/v1${curlPath}`;

        md += `#### Sample Request (CURL)\n\`\`\`bash\n${generateCurl(endpoint.method, fullUrl, tag, endpoint.path, bodyExample)}\n\`\`\`\n\n`;

        // Response Example
        // Default success response
        let respExample = { status: "success", data: {} };
        // Customize slightly based on tag
        if (tag === 'Auth') respExample = { status: "success", data: { token: "ey...", user: { id: 123, username: "user" } } };
        else if (endpoint.method === 'GET' && (endpoint.path.endsWith('s') || endpoint.path.endsWith('/'))) respExample = { status: "success", data: [{ id: 1 }, { id: 2 }] };

        md += `#### Sample Response\n\`\`\`json\n${JSON.stringify(respExample, null, 2)}\n\`\`\`\n\n`;

        md += `---\n\n`;
    });
});

// Sort uncategorized if any
if (pathsByTag['Uncategorized']) {
    md += `## Uncategorized\n\n`;
    pathsByTag['Uncategorized'].forEach(endpoint => {
        md += `### ${endpoint.method} ${endpoint.path}\n`;
        md += `**Endpoint:** \`${endpoint.method} ${endpoint.path}\`\n\n`;

        let curlPath = endpoint.path.replace(/:([a-zA-Z0-9_]+)/g, '123').replace(/{([a-zA-Z0-9_]+)}/g, '123');
        const fullUrl = `http://192.168.1.5:5000/api/v1${curlPath}`;

        md += `#### Sample Request\n\`\`\`bash\ncurl -X ${endpoint.method} "${fullUrl}"\n\`\`\`\n\n`;
        md += `---\n\n`;
    });
}

const outputPath = path.join(__dirname, '../../api_docs_flutter.md');
fs.writeFileSync(outputPath, md);
console.log(`Documentation generated: ${outputPath}`);
