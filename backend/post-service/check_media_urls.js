const { Sequelize } = require('sequelize');
const fs = require('fs');

const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

async function main() {
    let output = '';
    try {
        const [posts] = await seq.query(`SELECT id, "mediaUrl", "mediaType" FROM "Posts" ORDER BY id DESC LIMIT 30`);
        output += '\n===== RECENT POSTS mediaUrl =====\n';
        posts.forEach(p => {
            output += `Post ${p.id} [${p.mediaType}]: ${p.mediaUrl}\n`;
        });

        const [summary] = await seq.query(`
            SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN "mediaUrl" LIKE 'api/%' THEN 1 ELSE 0 END) as api_count,
                SUM(CASE WHEN "mediaUrl" LIKE '/api/%' THEN 1 ELSE 0 END) as slash_api_count,
                SUM(CASE WHEN "mediaUrl" LIKE 'http%' THEN 1 ELSE 0 END) as http_count,
                SUM(CASE WHEN "mediaUrl" NOT LIKE 'http%' AND "mediaUrl" NOT LIKE '%api/%' THEN 1 ELSE 0 END) as other_count
            FROM "Posts"
        `);
        output += '\n===== URL TYPE SUMMARY =====\n';
        output += JSON.stringify(summary[0], null, 2) + '\n';

        const [oldUrls] = await seq.query(`
            SELECT id, "mediaUrl" FROM "Posts"
            WHERE "mediaUrl" NOT LIKE 'http%' AND "mediaUrl" NOT LIKE '%api/%'
            LIMIT 10
        `);
        if (oldUrls.length > 0) {
            output += '\n===== BARE/RELATIVE URLs =====\n';
            oldUrls.forEach(p => output += `Post ${p.id}: ${p.mediaUrl}\n`);
        }

    } catch (e) {
        output += 'Error: ' + e.message + '\n';
    } finally {
        await seq.close();
        fs.writeFileSync('media_url_report.txt', output);
        console.log('Written to media_url_report.txt');
        console.log(output);
    }
}

main();
