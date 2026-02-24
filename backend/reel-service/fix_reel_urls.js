// Fix Reels across ALL DB ports
require('dotenv').config();
const { Sequelize } = require('sequelize');

async function fixReelsOnPort(port) {
    const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
        host: 'localhost', port, dialect: 'postgres', logging: false
    });
    try {
        await seq.authenticate();
        const rows = await seq.query(
            `SELECT id, "videoUrl", "isHidden" FROM "Reels" ORDER BY id DESC`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        if (rows.length === 0) {
            console.log(`Port ${port}: No reels found`);
            await seq.close();
            return;
        }
        console.log(`\n=== Port ${port}: ${rows.length} reel(s) ===`);
        let fixed = 0, hidden = 0, skipped = 0;

        for (const reel of rows) {
            const url = reel.videoUrl || '';
            console.log(`  Reel ${reel.id}: isHidden=${reel.isHidden} | ${url}`);

            // Case 1: /uploads/ → mark hidden
            if (url.includes('/uploads/')) {
                await seq.query(
                    `UPDATE "Reels" SET "isHidden" = true WHERE id = :id`,
                    { replacements: { id: reel.id }, type: Sequelize.QueryTypes.UPDATE }
                );
                console.log(`    → Marked hidden`);
                hidden++;
                continue;
            }

            // Case 2: Bare filename /api/v1/media/files/FILENAME.mp4 (no subfolder)
            const bareMatch = url.match(/^\/api\/v1\/media\/files\/([^\/]+\.(mp4|webm|mov|avi))$/i);
            if (bareMatch) {
                const filename = bareMatch[1];
                const newUrl = `/api/v1/media/files/Jaadoe/posts/videos/${filename}`;
                await seq.query(
                    `UPDATE "Reels" SET "videoUrl" = :newUrl WHERE id = :id`,
                    { replacements: { newUrl, id: reel.id }, type: Sequelize.QueryTypes.UPDATE }
                );
                console.log(`    → Fixed: ${newUrl}`);
                fixed++;
                continue;
            }

            // Case 3: Already correct
            if (url.includes('/Jaadoe/')) {
                console.log(`    → OK (already correct)`);
                skipped++;
                continue;
            }

            console.log(`    → Unknown pattern - skipping`);
        }

        console.log(`  Summary: ${fixed} fixed, ${hidden} hidden, ${skipped} skipped`);
        await seq.close();
    } catch (e) {
        console.log(`  Port ${port} error: ${e.message.substring(0, 100)}`);
        await seq.close().catch(() => { });
    }
}

async function run() {
    await fixReelsOnPort(5432);
    await fixReelsOnPort(5433);
    await fixReelsOnPort(5434);
}

run();
