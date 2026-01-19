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

const SearchIndex = sequelize.define('SearchIndex', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: { type: DataTypes.ENUM('USER', 'POST', 'HASHTAG'), allowNull: false },
    referenceId: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    metadata: { type: DataTypes.JSONB, defaultValue: {} },
});

async function verify() {
    console.log('Starting verification...');
    try {
        // 2. Connect and Seed Data
        await sequelize.authenticate();
        await sequelize.sync();

        const mockItem = await SearchIndex.create({
            type: 'USER',
            referenceId: 101,
            content: 'search_test_user',
            metadata: { avatar: 'url' }
        });
        console.log('Seeded Search Item:', mockItem.content);

        // 3. Call API
        const options = {
            hostname: 'localhost',
            port: 5009,
            path: '/?q=test', // Should match 'search_test_user'
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
                        const found = json.data.find(i => i.id === mockItem.id);
                        if (found) {
                            console.log('SUCCESS: Seeded item returned by search.');
                        } else {
                            console.log('FAILURE: API data does not contain seeded item.');
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
