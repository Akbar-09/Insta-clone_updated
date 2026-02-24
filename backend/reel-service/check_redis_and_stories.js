const { createClient } = require('redis');
const { Sequelize } = require('sequelize');

async function checkRedis() {
    const client = createClient({ url: 'redis://localhost:6379' });
    try {
        await client.connect();
        const feed = await client.lRange('global_feed', 0, -1);
        console.log(`\n=== Redis global_feed: ${feed.length} items ===`);
        feed.forEach((item, i) => {
            try {
                const p = JSON.parse(item);
                const url = p.mediaUrl || '';
                if (url.includes('/uploads/') || (!url.includes('/api/') && !url.includes('http') && url)) {
                    console.log(`  [${i}] Post ${p.id}: BROKEN URL = ${url}`);
                }
            } catch (e) { }
        });
        if (feed.length === 0) console.log('  (empty cache)');
        await client.quit();
    } catch (e) {
        console.log('Redis error:', e.message.substring(0, 80));
        await client.quit().catch(() => { });
    }
}

async function checkStories(port) {
    const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
        host: 'localhost', port, dialect: 'postgres', logging: false
    });
    try {
        await seq.authenticate();
        const rows = await seq.query(
            `SELECT id, "userId", "mediaUrl", "mediaType" FROM "Stories" ORDER BY id DESC LIMIT 30`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log(`\n=== Stories on port ${port}: ${rows.length} total ===`);
        rows.forEach(r => {
            const url = (r.mediaUrl || '').substring(0, 90);
            const isBroken = url.includes('/uploads/') || (!url.includes('/api/') && !url.includes('http') && url);
            if (isBroken) {
                console.log(`  Story ${r.id} (user ${r.userId}): BROKEN = ${url}`);
            }
        });
        const broken = rows.filter(r => {
            const url = r.mediaUrl || '';
            return url.includes('/uploads/') || (!url.includes('/api/') && !url.includes('http') && url);
        });
        if (broken.length === 0) console.log('  All story URLs look OK');
        await seq.close();
    } catch (e) {
        console.log(`  Stories port ${port}: ${e.message.substring(0, 80)}`);
        await seq.close().catch(() => { });
    }
}

checkRedis()
    .then(() => checkStories(5432))
    .then(() => checkStories(5433))
    .then(() => console.log('\nDone'));
