const fs = require('fs');
const path = require('path');

const backendDir = path.join(__dirname, 'backend');
const services = fs.readdirSync(backendDir).filter(f => fs.statSync(path.join(backendDir, f)).isDirectory() && f !== 'node_modules' && f !== 'gateway');

const allEndpoints = [];

services.forEach(service => {
    const servicePath = path.join(backendDir, service);
    const routesDir = path.join(servicePath, 'routes');
    // Also check src/routes for live-service
    const alternativeRoutesDir = path.join(servicePath, 'src', 'routes');

    let routeFiles = [];
    if (fs.existsSync(routesDir)) {
        routeFiles = fs.readdirSync(routesDir).filter(f => f.endsWith('.js'));
    } else if (fs.existsSync(alternativeRoutesDir)) {
        routeFiles = fs.readdirSync(alternativeRoutesDir).filter(f => f.endsWith('.js'));
    }

    routeFiles.forEach(file => {
        const filePath = fs.existsSync(path.join(routesDir, file)) ? path.join(routesDir, file) : path.join(alternativeRoutesDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');

        lines.forEach(line => {
            const match = line.match(/router\.(get|post|put|delete|patch)\(['"]([^'"]+)['"]/);
            if (match) {
                allEndpoints.push({
                    service,
                    method: match[1].toUpperCase(),
                    path: match[2],
                    file
                });
            }
        });
    });
});

console.log(`Total Endpoints found: ${allEndpoints.length}`);
fs.writeFileSync('all_endpoints.json', JSON.stringify(allEndpoints, null, 2));

const grouped = allEndpoints.reduce((acc, curr) => {
    if (!acc[curr.service]) acc[curr.service] = [];
    acc[curr.service].push(`${curr.method} ${curr.path}`);
    return acc;
}, {});

for (const service in grouped) {
    console.log(`\n--- ${service} (${grouped[service].length}) ---`);
    // grouped[service].forEach(e => console.log(e));
}
