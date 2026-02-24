const { Sequelize } = require('sequelize');

async function checkReelsFull(port, dbName) {
    const seq = new Sequelize(dbName, 'postgres', 'aspire123', {
        host: 'localhost', port, dialect: 'postgres', logging: false
    });
    try {
        await seq.authenticate();
        const rows = await seq.query(
            `SELECT id, "videoUrl", "isHidden" FROM "Reels" ORDER BY id DESC`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log(`\n=== DB: ${dbName} on port ${port} (${rows.length} reels) ===`);
        rows.forEach(r => {
            console.log(`  Reel ${r.id}: isHidden=${r.isHidden}`);
            console.log(`    videoUrl: ${r.videoUrl}`);
        });
        await seq.close();
    } catch (e) {
        console.log(`  Error (${dbName}:${port}): ${e.message.substring(0, 80)}`);
        await seq.close().catch(() => { });
    }
}

checkReelsFull(5432, 'instagram')
    .then(() => checkReelsFull(5433, 'instagram'))
    .then(() => checkReelsFull(5434, 'instagram'));
