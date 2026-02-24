const { Sequelize } = require('sequelize');
const fs = require('fs');

const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost', port: 5433, dialect: 'postgres', logging: false
});

async function main() {
    let out = '';
    try {
        const tables = [
            { table: 'Posts', cols: ['"mediaUrl"', '"thumbnailUrl"'] },
            { table: 'UserProfiles', cols: ['"profilePicture"'] },
        ];

        for (const { table, cols } of tables) {
            for (const col of cols) {
                try {
                    const [rows] = await seq.query(`
                        SELECT id, ${col} FROM "${table}"
                        WHERE ${col} IS NOT NULL AND ${col} != ''
                          AND ${col} NOT LIKE 'http%'
                          AND ${col} NOT LIKE '/api/v1/media%'
                        LIMIT 20
                    `);
                    if (rows.length > 0) {
                        out += `\n[BROKEN] ${table}.${col} — ${rows.length} rows:\n`;
                        rows.forEach(r => {
                            const val = r[col.replace(/"/g, '')];
                            out += `  id=${r.id}: "${val}"\n`;
                        });
                    } else {
                        out += `[OK] ${table}.${col}\n`;
                    }
                } catch (e) {
                    out += `[SKIP] ${table}.${col}: ${e.message.slice(0, 80)}\n`;
                }
            }
        }

        try {
            const [rows] = await seq.query(`
                SELECT id, "videoUrl" FROM "Reels"
                WHERE "videoUrl" IS NOT NULL AND "videoUrl" != ''
                  AND "videoUrl" NOT LIKE 'http%'
                  AND "videoUrl" NOT LIKE '/api/v1/media%'
                LIMIT 10
            `);
            if (rows.length > 0) {
                out += `\n[BROKEN] Reels.videoUrl — ${rows.length} rows:\n`;
                rows.forEach(r => out += `  id=${r.id}: "${r.videoUrl}"\n`);
            } else {
                out += `[OK] Reels.videoUrl\n`;
            }
        } catch (e) { out += `[SKIP] Reels: ${e.message.slice(0, 80)}\n`; }

        const [[{ cnt }]] = await seq.query(`SELECT COUNT(*) as cnt FROM "Posts" WHERE "isHidden" = true`);
        out += `\n[STATS] Hidden posts (no valid media): ${cnt}\n`;

        const [[{ broken }]] = await seq.query(`
            SELECT COUNT(*) as broken FROM "Posts"
            WHERE "isHidden" = false
              AND "mediaUrl" NOT LIKE 'http%'
              AND "mediaUrl" NOT LIKE '/api/v1/media%'
        `);
        out += `[STATS] Remaining broken active posts: ${broken}\n`;

        const [[{ good }]] = await seq.query(`
            SELECT COUNT(*) as good FROM "Posts"
            WHERE "isHidden" = false
              AND ("mediaUrl" LIKE '/api/v1/media%' OR "mediaUrl" LIKE 'http%')
        `);
        out += `[STATS] Posts with valid media URLs: ${good}\n`;

    } catch (e) {
        out += `Error: ${e.message}\n`;
    } finally {
        await seq.close();
        fs.writeFileSync('final_check.txt', out);
        console.log(out);
    }
}
main();
