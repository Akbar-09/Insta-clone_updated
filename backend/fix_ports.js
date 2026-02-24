const fs = require('fs');
const path = require('path');

const backendDir = 'c:\\Users\\ASPIRE 10\\Desktop\\jaadoe\\Insta-clone_updated\\backend';

function getAllFiles(dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
            }
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

const allFiles = getAllFiles(backendDir);

// 1. Update .env files
allFiles.filter(f => f.endsWith('.env')).forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    if (content.includes('DB_HOST')) {
        if (!content.includes('DB_PORT')) {
            content += '\nDB_PORT=5433';
            fs.writeFileSync(f, content);
            console.log('Updated .env:', f);
        } else {
            content = content.replace(/DB_PORT=\d+/, 'DB_PORT=5433');
            fs.writeFileSync(f, content);
            console.log('Fixed .env:', f);
        }
    }
});

// 2. Update database config files
allFiles.filter(f => f.includes('config') && (f.endsWith('database.js') || f.endsWith('db.js'))).forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    if (content.includes('new Sequelize') && !content.includes('process.env.DB_PORT')) {
        // Use regex to insert port into options object
        content = content.replace(
            /(dialect:\s*['"]postgres['"])/,
            '$1,\n        port: process.env.DB_PORT || 5432'
        );
        fs.writeFileSync(f, content);
        console.log('Updated config:', f);
    }
});
