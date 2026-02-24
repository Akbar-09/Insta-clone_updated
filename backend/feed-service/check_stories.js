const { Sequelize } = require('sequelize');

async function checkStories(port) {
    const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
        host: 'localhost', port, dialect: 'postgres', logging: false
    });
    try {
        await seq.authenticate();
        const rows = await seq.query(
            `SELECT id, "userId", "mediaUrl" FROM "Stories" ORDER BY id DESC LIMIT 50`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log(`\nStories on port ${port}: ${rows.length} total`);
        rows.forEach(r => {
            const url = (r.mediaUrl || '');
            const isBroken = url.includes('/uploads/') || (!url.startsWith('/api/') && !url.startsWith('http') && url.length > 0);
            if (isBroken || url.includes('/uploads/')) {
                console.log(`  BROKEN Story ${r.id} user=${r.userId} active=${r.isActive}: ${url}`);
            }
        });
        const broken = rows.filter(r => {
            const url = r.mediaUrl || '';
            return url.includes('/uploads/') || (!url.startsWith('/api/') && !url.startsWith('http') && url.length > 0);
        });
        console.log(`  Broken: ${broken.length}, OK: ${rows.length - broken.length}`);
        await seq.close();
    } catch (e) {
        console.log(`Port ${port}: ${e.message.substring(0, 100)}`);
        await seq.close().catch(() => { });
    }
}

checkStories(5432).then(() => checkStories(5433)).then(() => console.log('Done'));
