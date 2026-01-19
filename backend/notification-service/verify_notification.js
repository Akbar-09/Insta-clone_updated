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

const Notification = sequelize.define('Notification', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    fromUserId: { type: DataTypes.INTEGER, allowNull: false },
    fromUsername: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM('LIKE', 'COMMENT', 'FOLLOW'), allowNull: false },
    resourceId: { type: DataTypes.INTEGER, defaultValue: 0 },
    isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

async function verify() {
    console.log('Starting verification...');
    try {
        // 2. Connect and Seed Data
        await sequelize.authenticate();
        await sequelize.sync(); // Create table if not exists

        const mockNotification = await Notification.create({
            userId: 1,
            fromUserId: 99,
            fromUsername: 'testuser',
            type: 'LIKE',
            resourceId: 101,
            isRead: false
        });
        console.log('Seeded Notification ID:', mockNotification.id);

        // 3. Call API
        const options = {
            hostname: 'localhost',
            port: 5008,
            path: '/?userId=1',
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
                    if (json.status === 'success' && Array.isArray(json.data)) {
                        const found = json.data.find(n => n.id === mockNotification.id);
                        if (found) {
                            console.log('SUCCESS: Seeded notification returned by API.');
                        } else {
                            console.log('FAILURE: API data does not contain seeded ID.');
                        }
                    } else {
                        console.log('FAILURE: Unexpected response structure.');
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
