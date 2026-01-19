const http = require('http');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// 1. Setup DB Connection for Seeding
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false
    }
);

const UserProfile = sequelize.define('UserProfile', {
    userId: { type: DataTypes.INTEGER, unique: true, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    fullName: { type: DataTypes.STRING, allowNull: true },
    bio: { type: DataTypes.TEXT, allowNull: true },
    profilePicture: { type: DataTypes.STRING, defaultValue: '' },
    followersCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    followingCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    postCount: { type: DataTypes.INTEGER, defaultValue: 0 },
});

async function verify() {
    console.log('Starting verification...');
    try {
        // 2. Connect and Seed Data
        await sequelize.authenticate();
        await sequelize.sync();

        // Check if user exists, if not create
        const [user, created] = await UserProfile.findOrCreate({
            where: { username: 'testuser_profile' },
            defaults: {
                userId: 999,
                fullName: 'Test User Profile',
                bio: 'Just a test user'
            }
        });
        console.log('Seeded User Profile:', user.username);

        // 3. Call API
        const options = {
            hostname: 'localhost',
            port: 5002,
            path: '/testuser_profile',
            method: 'GET'
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', async () => {
                console.log('API Status:', res.statusCode);
                console.log('API Response:', data);

                // 4. Verification logic
                try {
                    const json = JSON.parse(data);
                    if (json && json.username === 'testuser_profile') {
                        console.log('SUCCESS: Seeded profile returned by API.');
                    } else {
                        console.log('FAILURE: API data does not match seeded profile.');
                    }
                } catch (e) {
                    console.log('FAILURE: Parsing response error', e);
                }

                await sequelize.close();
                process.exit(0);
            });
        });

        req.on('error', async (e) => {
            console.error('API Request Error:', e);
            await sequelize.close();
            process.exit(1);
        });
        req.end();

    } catch (error) {
        console.error('Verification failed:', error);
        await sequelize.close();
        process.exit(1);
    }
}

verify();
