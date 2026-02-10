const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'insight-service/.env') });
const AccountMetric = require('./insight-service/models/AccountMetric');
const sequelize = require('./insight-service/config/database');

async function run() {
    try {
        await sequelize.authenticate();
        const metrics = await AccountMetric.findAll({ limit: 5 });
        console.log(`Total Metrics: ${await AccountMetric.count()}`);
        metrics.forEach(m => {
            console.log(`User: ${m.userId} | Date: ${m.date} | Reach: ${m.totalReach}`);
        });
    } catch (e) {
        console.error(e);
    } finally {
        process.exit();
    }
}
run();
