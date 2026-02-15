const fs = require('fs');
const path = require('path');

const collectionPath = path.join(__dirname, 'Jaadoe_Social_Network.postman_collection.json');

try {
    const content = fs.readFileSync(collectionPath, 'utf8');
    const collection = JSON.parse(content);

    const authService = collection.item.find(item => item.name === 'auth-service');
    if (authService) {

        // 1. Fix GET /check-username
        const checkUsername = authService.item.find(item => item.name === 'GET /check-username');
        if (checkUsername) {
            // Update URL to include query param
            checkUsername.request.url.query = [
                {
                    key: "username",
                    value: "test_user_123",
                    description: "Username to check availability for"
                }
            ];
            // Update Raw URL to match
            const raw = checkUsername.request.url.raw.split('?')[0];
            checkUsername.request.url.raw = `${raw}?username=test_user_123`;
            console.log('Fixed GET /check-username query params');
        }

        // 2. Fix GET /check-email
        const checkEmail = authService.item.find(item => item.name === 'GET /check-email');
        if (checkEmail) {
            checkEmail.request.url.query = [
                {
                    key: "email",
                    value: "test_user_123@example.com",
                    description: "Email to check availability for"
                }
            ];
            const raw = checkEmail.request.url.raw.split('?')[0];
            checkEmail.request.url.raw = `${raw}?email=test_user_123@example.com`;
            console.log('Fixed GET /check-email query params');
        }

        // 3. Fix POST /register (ensure body matches signup)
        const register = authService.item.find(item => item.name === 'POST /register');
        if (register) {
            register.request.body = {
                mode: "raw",
                raw: JSON.stringify({
                    username: "new_user_register",
                    email: "new_user_register@example.com",
                    password: "Password123!",
                    fullName: "New Register User"
                }, null, 2)
            };
            console.log('Fixed POST /register request body');
        }

        // 4. Update POST /signup body to avoid immediate collision
        const signup = authService.item.find(item => item.name === 'POST /signup');
        if (signup) {
            // Give it a random component in the example so user doesn't hit 400 immediately
            // Although Postman static file won't be dynamic, let's at least provide a valid structure
            signup.request.body = {
                mode: "raw",
                raw: JSON.stringify({
                    username: "test_user_unique",
                    email: "test_user_unique@example.com",
                    password: "Password123!",
                    fullName: "Test User Unique"
                }, null, 2)
            };
            console.log('Updated POST /signup body example');
        }

    }

    fs.writeFileSync(collectionPath, JSON.stringify(collection, null, 2));
    console.log('Postman collection updated with auth fixes.');

} catch (e) {
    console.error('Error fixing collection:', e);
}
