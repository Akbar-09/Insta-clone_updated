const fs = require('fs');
const path = require('path');

const collectionPath = path.join(__dirname, 'Instagram_API_Collection.json');
const reportPath = path.join(__dirname, 'final_api_report.md');
const outputPath = path.join(__dirname, 'Instagram_API_Documentation_Full.md');

if (!fs.existsSync(collectionPath)) {
    console.error('Postman collection not found!');
    process.exit(1);
}

const collection = JSON.parse(fs.readFileSync(collectionPath, 'utf8'));
const reportContent = fs.existsSync(reportPath) ? fs.readFileSync(reportPath, 'utf8') : '';

// Helper to find response from report
function getResponseFromReport(method, endpoint) {
    // Escape special characters in endpoint for regex
    const escapedEndpoint = endpoint.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\| [^|]+ \\| ${method} \\| ${escapedEndpoint} \\| [^|]+ \\| (\`{1,3})([\\s\\S]*?)\\1`, 'i');
    const match = reportContent.match(regex);
    if (match) {
        return match[2].trim();
    }
    return '{"status": "success", "message": "API call successful"}';
}

const baseUrl = 'http://192.168.1.15:5000';

function generateCurl(item, baseUrl) {
    const req = item.request;
    if (!req) return null;

    let curl = `curl -X ${req.method} "${baseUrl}${req.url.path ? '/' + req.url.path.join('/') : ''}"`;

    if (req.header) {
        req.header.forEach(h => {
            curl += ` \\\n  -H "${h.key}: ${h.value}"`;
        });
    }

    if (req.body && req.body.raw) {
        curl += ` \\\n  -d '${req.body.raw}'`;
    }

    return curl;
}

let md = `# Instagram Clone API Documentation\n\n`;
md += `**Base URL:** \`${baseUrl}\`\n`;
md += `**Auth:** Most endpoints require a JWT token in the \`Authorization\` header as \`Bearer <token>\`.\n\n`;

md += `## Table of Contents\n`;
collection.item.forEach(service => {
    md += `- [${service.name}](#${service.name.toLowerCase().replace(/\s+/g, '-')})\n`;
});
md += `\n---\n\n`;

collection.item.forEach(service => {
    md += `## ${service.name}\n\n`;

    if (service.item) {
        service.item.forEach(api => {
            const req = api.request;
            if (!req) return;

            const method = req.method || 'GET';
            const rawUrl = req.url.raw || '';
            const path = req.url.path ? '/' + req.url.path.join('/') : (rawUrl.split('}}')[1] || rawUrl);

            md += `### ${api.name}\n`;
            md += `**Endpoint:** \`${method} ${path}\`\n\n`;

            if (req.body && req.body.raw) {
                md += `**Request Body:**\n\`\`\`json\n${req.body.raw}\n\`\`\`\n\n`;
            }

            const curl = generateCurl(api, baseUrl);
            md += `**Sample Curl Request:**\n\`\`\`bash\n${curl}\n\`\`\`\n\n`;

            const response = getResponseFromReport(method, path);
            md += `**Sample Response:**\n\`\`\`json\n${response}\n\`\`\`\n\n`;

            md += `---\n\n`;
        });
    }
});

fs.writeFileSync(outputPath, md);
console.log(`Documentation generated at: ${outputPath}`);
