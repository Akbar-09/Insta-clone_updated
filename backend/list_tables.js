const fs = require('fs');
const readline = require('readline');

async function listTables() {
    const fileStream = fs.createReadStream('../database_dump.sql');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const tables = new Set();
    for await (const line of rl) {
        const match = line.match(/CREATE TABLE public\."?(\w+)"?/);
        if (match) {
            tables.add(match[1]);
        }
    }
    const sortedTables = Array.from(tables).sort();
    console.log("Found " + sortedTables.length + " tables:");
    sortedTables.forEach(t => console.log("- " + t));
}

listTables();
