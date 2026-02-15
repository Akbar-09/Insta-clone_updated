const axios = require('axios');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// 1. Check DB Directly
const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

const Language = sequelize.define('Language', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    code: { type: DataTypes.STRING },
    isActive: { type: DataTypes.BOOLEAN },
    isDefault: { type: DataTypes.BOOLEAN }
}, { tableName: 'languages', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' });

async function check() {
    try {
        await sequelize.authenticate();
        console.log('DB Connection: OK');

        const count = await Language.count();
        console.log(`Languages in DB: ${count}`);

        if (count === 0) {
            console.log('Seeding languages manually...');
            // ... (rest commented out for brevity if needed, but logic is fine)
        } else {
            // console.log(JSON.stringify(langs, null, 2)); // Too verbose
            console.log('DB has languages');
        }

        // 2. Check API via Gateway
        // Login first
        try {
            const loginRes = await axios.post('http://localhost:5000/api/v1/admin/auth/login', {
                email: 'admin@jaadoe.com',
                password: 'adminpassword123'
            });

            if (loginRes.data.success) {
                console.log('Admin Login: Success');
                const token = loginRes.data.data.token;

                // Fetch Languages
                const langRes = await axios.get('http://localhost:5000/api/v1/admin/languages', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('Fetch Languages API: Success', langRes.data.data.stats);
            } else {
                console.error('Admin Login Failed');
            }

        } catch (e) {
            console.error('API Check Failed', e.message);
            if (e.response) console.error(e.response.data);
        }

    } catch (e) {
        console.error('DB Check Failed', e);
    } finally {
        await sequelize.close();
    }
}

check();
