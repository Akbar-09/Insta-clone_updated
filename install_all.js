const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const directories = [
    'app',
    'admin',
    'help-centre',
    ...fs.readdirSync('backend', { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => `backend/${dirent.name}`)
];

function runNpmInstall(dir) {
    return new Promise((resolve, reject) => {
        const fullPath = path.join(__dirname, dir);
        if (!fs.existsSync(path.join(fullPath, 'package.json'))) {
            return resolve(); // Skip if no package.json
        }

        console.log(`Installing dependencies in: ${dir}`);
        const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
        const child = spawn(npmCmd, ['install'], {
            cwd: fullPath,
            stdio: 'inherit',
            shell: true
        });

        child.on('close', code => {
            if (code === 0) {
                console.log(`✅ Completed: ${dir}\n`);
                resolve();
            } else {
                console.error(`❌ Failed in: ${dir}\n`);
                reject(new Error(`npm install failed in ${dir}`));
            }
        });
    });
}

async function installAll() {
    console.log("Starting installation of all dependencies...\n");
    for (const dir of directories) {
        if (fs.existsSync(path.join(__dirname, dir))) {
            await runNpmInstall(dir);
        }
    }
    console.log("🎉 All dependencies have been successfully installed.");
}

installAll().catch(console.error);
