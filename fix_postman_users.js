const fs = require('fs');
const path = require('path');

const collectionPath = path.join(__dirname, 'Jaadoe_Social_Network.postman_collection.json');

try {
    const content = fs.readFileSync(collectionPath, 'utf8');
    const collection = JSON.parse(content);

    // 1. Update Auth Service Login/Signup to save userId and username
    const authService = collection.item.find(i => i.name === 'auth-service');
    if (authService) {
        ['POST /login', 'POST /signup'].forEach(endpoint => {
            const item = authService.item.find(i => i.name === endpoint);
            if (item) {
                // Remove old test script
                if (!item.event) item.event = [];
                item.event = item.event.filter(e => e.listen !== 'test');

                item.event.push({
                    listen: "test",
                    script: {
                        exec: [
                            "var jsonData = pm.response.json();",
                            "if (jsonData.status === 'success' || jsonData.data) {",
                            "    if (jsonData.data.token) {",
                            "        pm.environment.set(\"token\", jsonData.data.token);",
                            "        pm.globals.set(\"token\", jsonData.data.token);",
                            "    }",
                            "    if (jsonData.data.user) {",
                            "        pm.environment.set(\"userId\", jsonData.data.user.id);",
                            "        pm.globals.set(\"userId\", jsonData.data.user.id);",
                            "        pm.environment.set(\"username\", jsonData.data.user.username);",
                            "        pm.globals.set(\"username\", jsonData.data.user.username);",
                            "        console.log(\"Saved Auth Vars: \" + jsonData.data.user.id);",
                            "    }",
                            "}"
                        ],
                        type: "text/javascript"
                    }
                });
            }
        });
        console.log('Updated Auth scripts to save userId/username');
    }

    // 2. Fix User Service URLs
    const userService = collection.item.find(i => i.name === 'user-service');
    if (userService) {
        userService.item.forEach(reqItem => {
            let url = reqItem.request.url.raw;
            let changed = false;

            // Replace :userId -> {{userId}}
            if (url.includes(':userId')) {
                url = url.replace(/:userId/g, '{{userId}}');
                changed = true;
            }
            // Replace :username -> {{username}}
            if (url.includes(':username')) {
                url = url.replace(/:username/g, '{{username}}');
                changed = true;
            }
            // Replace :followerId -> {{userId}} (For basic testing)
            if (url.includes(':followerId')) {
                url = url.replace(/:followerId/g, '{{userId}}');
                changed = true;
            }
            // Replace :id depending on context
            if (url.includes(':id')) {
                // If endpoint seems to be about apps/tags, we can't easily guess, but let's default to userId for "settings/apps/:id" or similar to avoid 500
                // For :id in tags or apps, we might just leave it or replace with dummy.
                // However, leaving it crashes the 500. Let's replace with {{userId}} as a fallback or a specific variable
                url = url.replace(/:id/g, '{{userId}}'); // Fallback
                changed = true;
            }

            if (changed) {
                reqItem.request.url.raw = url;
                reqItem.request.url.path = reqItem.request.url.raw.replace('{{baseUrl}}/', '').split('/');

                // Update names
                reqItem.name = reqItem.name.replace(':userId', '{{userId}}')
                    .replace(':username', '{{username}}')
                    .replace(':followerId', '{{userId}}')
                    .replace(':id', '{{userId}}');
            }
        });
        console.log('Updated User Service URLs to use {{variables}}');
    }

    fs.writeFileSync(collectionPath, JSON.stringify(collection, null, 2));
    console.log('Postman collection updated successfully for User Service.');

} catch (e) {
    console.error('Error fixing users:', e);
}
