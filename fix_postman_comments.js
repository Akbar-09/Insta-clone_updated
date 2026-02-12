const fs = require('fs');
const path = require('path');

const collectionPath = path.join(__dirname, 'Jaadoe_Social_Network.postman_collection.json');

try {
    const content = fs.readFileSync(collectionPath, 'utf8');
    const collection = JSON.parse(content);

    // Helper to add test script to save variable
    const addSaveVariableScript = (item, varName, jsonPath) => {
        if (!item.event) item.event = [];
        // Remove existing test script
        item.event = item.event.filter(e => e.listen !== 'test');

        item.event.push({
            listen: "test",
            script: {
                exec: [
                    "var jsonData = pm.response.json();",
                    `if (jsonData.data && jsonData.data.id) {`,
                    `    pm.environment.set("${varName}", jsonData.data.id);`,
                    `    pm.globals.set("${varName}", jsonData.data.id);`,
                    `    console.log("Saved ${varName}: " + jsonData.data.id);`,
                    `}`
                ],
                type: "text/javascript"
            }
        });
    };

    // 1. Post Service - Save postId
    const postService = collection.item.find(i => i.name === 'post-service');
    if (postService) {
        const createPost = postService.item.find(i => i.name.includes('POST') && i.name.includes('/'));
        // It might be named "POST /" or "POST /api/v1/posts" depending on generator
        // Let's iterate to find the create endpoint
        const createItem = postService.item.find(i => i.request.method === 'POST' && !i.request.url.path.includes(':'));
        if (createItem) {
            addSaveVariableScript(createItem, 'postId', 'data.id');
            console.log('Added auto-save postId script to Post Service');
        }
    }

    // 2. Comment Service - Fixes
    const commentService = collection.item.find(i => i.name === 'comment-service');
    if (commentService) {

        // A. Create Comment: Needs postId in body + Save commentId
        const createComment = commentService.item.find(i => i.request.method === 'POST' && !i.request.url.path.includes('check') && !i.request.url.path.includes('like'));
        if (createComment) {
            // Update Body
            createComment.request.body = {
                mode: "raw",
                raw: JSON.stringify({
                    content: "This is a test comment from Postman",
                    postId: "{{postId}}", // Use variable
                    userId: "{{userId}}" // Assuming userId might be needed validation, but usually from token
                }, null, 2)
            };

            // Add script to save commentId
            addSaveVariableScript(createComment, 'commentId', 'data.id');
            console.log('Fixed Create Comment body and added auto-save script');
        }

        // B. Fix "check-comments" body
        const checkComments = commentService.item.find(i => i.name.includes('check-comments'));
        if (checkComments) {
            checkComments.request.body = {
                mode: "raw",
                raw: JSON.stringify({
                    content: "bad word here or normal text"
                }, null, 2)
            };
            console.log('Fixed POST /check-comments body');
        }

        // C. Fix URL Variables (Replace :id, :commentId, :postId with {{...}})
        commentService.item.forEach(reqItem => {
            let url = reqItem.request.url.raw;
            let changed = false;

            // Replace :commentId
            if (url.includes(':commentId')) {
                url = url.replace(/:commentId/g, '{{commentId}}');
                changed = true;
            }
            // Replace :postId
            if (url.includes(':postId')) {
                url = url.replace(/:postId/g, '{{postId}}');
                changed = true;
            }
            // Replace :id (generic)
            if (url.includes(':id')) {
                // Heuristic: if request is "like" or "delete", it's usually commentId in this service context
                url = url.replace(/:id/g, '{{commentId}}');
                changed = true;
            }

            if (changed) {
                reqItem.request.url.raw = url;
                // Also update the path array
                reqItem.request.url.path = reqItem.request.url.raw.replace('{{baseUrl}}/', '').split('/');

                // Also update the Request Name to be clearer
                if (reqItem.name.includes(':')) {
                    reqItem.name = reqItem.name.replace(':commentId', '{{commentId}}').replace(':id', '{{commentId}}').replace(':postId', '{{postId}}');
                }
            }
        });
        console.log('Updated URL path variables to Postman {{variable}} syntax for Comment Service');
    }

    fs.writeFileSync(collectionPath, JSON.stringify(collection, null, 2));
    console.log('Postman collection updated successfully for Comment Service.');

} catch (e) {
    console.error('Error fixing comments:', e);
}
