const axios = require('axios');
const { exec } = require('child_process');
const path = require('path');

async function syncService(servicePath, serviceName) {
    return new Promise((resolve, reject) => {
        console.log(`Syncing ${serviceName}...`);
        const syncScript = `
const sequelize = require('./config/database');
const Post = require('./models/Post');
const Report = require('./models/Report');
// Mock associations
if (Post && Report) {
    if (serviceName === 'Post Service') {
        Report.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
        Post.hasMany(Report, { foreignKey: 'postId', as: 'reports' });
    }
}
sequelize.sync({ alter: true })
    .then(() => {
        console.log('${serviceName} sync successful');
        process.exit(0);
    })
    .catch(err => {
        console.error('${serviceName} sync failed:', err);
        process.exit(1);
    });
`;
        const fs = require('fs');
        const tempPath = path.join(servicePath, 'temp_sync.js');
        // We can't easily write the script to the child dir and require local config
        // So let's just create a file there and run it.
        const scriptContent = `
const sequelize = require('./config/database');
const Post = require('./models/Post');
const Report = require('./models/Report');
const { Sequelize } = require('sequelize');

async function run() {
    try {
        console.log('Starting sync for ${serviceName}...');
        // Set associations for Post Service specifically
        if ('${serviceName}' === 'Post Service') {
            Report.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
            Post.hasMany(Report, { foreignKey: 'postId', as: 'reports' });
        }
        await sequelize.sync({ alter: true });
        console.log('${serviceName} sync successful');
    } catch (err) {
        console.error('${serviceName} sync failed:', err);
    } finally {
        await sequelize.close();
    }
}
run();
`;
        fs.writeFileSync(tempPath, scriptContent);

        exec(\`node temp_sync.js\`, { cwd: servicePath }, (error, stdout, stderr) => {
            console.log(stdout);
            if (stderr) console.error(stderr);
            fs.unlinkSync(tempPath);
            if (error) reject(error);
            else resolve();
        });
    });
}

async function main() {
    try {
        const baseDir = 'c:/Users/akbar/OneDrive/Desktop/instagram updated/Instagram/backend';
        await syncService(path.join(baseDir, 'post-service'), 'Post Service');
        await syncService(path.join(baseDir, 'user-service'), 'User Service');
        console.log('All services synced successfully.');
    } catch (err) {
        console.error('Master sync failed:', err);
    }
}

main();
