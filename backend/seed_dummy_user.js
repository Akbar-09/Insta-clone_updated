const GATEWAY_URL = 'http://127.0.0.1:8000/api/v1';

async function seedUser() {
    const timestamp = Date.now();
    const userData = {
        username: `demo_user_${timestamp}`,
        email: `demo_${timestamp}@example.com`,
        password: 'password123',
        fullName: 'Demo User'
    };

    try {
        console.log('Attempting to create user...');
        const response = await fetch(`${GATEWAY_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok && data.status === 'success') {
            console.log('\nSUCCESS! User created.');
            console.log('------------------------------------------------');
            console.log(`Username: ${userData.username}`);
            console.log(`Email:    ${userData.email}`);
            console.log(`Password: ${userData.password}`);
            console.log('------------------------------------------------');
        } else {
            console.error('Failed to create user:', data);
        }
    } catch (error) {
        console.error('Error creating user:', error.message);
        if (error.cause) console.error('Cause:', error.cause);
    }
}

seedUser();
