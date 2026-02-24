const fs = require('fs');
const readline = require('readline');

async function countData() {
    const fileStream = fs.createReadStream('../database_dump.sql');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let currentTable = null;
    let counts = {};

    for await (const line of rl) {
        const copyMatch = line.match(/^COPY public\."?(\w+)"? .* FROM stdin;/);
        if (copyMatch) {
            currentTable = copyMatch[1];
            counts[currentTable] = 0;
            continue;
        }

        if (line === '\\.' && currentTable) {
            currentTable = null;
            continue;
        }

        if (currentTable) {
            counts[currentTable]++;
        }
    }
    console.log("Users:", counts["Users"]);
    console.log("UserProfiles:", counts["UserProfiles"]);
    console.log("Posts:", counts["Posts"]);
    console.log("Reels:", counts["Reels"]);
    console.log("Follows:", counts["follows"]);
}

countData();
