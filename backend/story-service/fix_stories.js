// Fix Stories with /uploads/ or broken mediaUrls
// Strategy: Mark them as expired/hidden so they don't show in feed
const { Sequelize } = require('sequelize');

async function fixStoriesOnPort(port) {
    const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
        host: 'localhost', port, dialect: 'postgres', logging: false
    });
    try {
        await seq.authenticate();

        // First: get all stories with their columns
        const cols = await seq.query(
            `SELECT column_name FROM information_schema.columns 
             WHERE table_schema='public' AND table_name='Stories'`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        const colNames = cols.map(c => c.column_name);
        console.log(`\nPort ${port} - Stories columns: ${colNames.join(', ')}`);

        const rows = await seq.query(
            `SELECT id, "userId", "mediaUrl" FROM "Stories" ORDER BY id DESC`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        console.log(`  Total stories: ${rows.length}`);

        let fixed = 0, hidden = 0;
        for (const story of rows) {
            const url = story.mediaUrl || '';
            const isBroken = url.includes('/uploads/') ||
                (!url.startsWith('/api/') && !url.startsWith('http') && url.length > 0);

            if (isBroken) {
                console.log(`  BROKEN Story ${story.id}: ${url}`);

                // Try: prefix with /api/v1/media/files/ if it's a bare filename
                if (!url.includes('/') || url.startsWith('/uploads/')) {
                    const filename = url.replace('/uploads/', '');
                    // Try to update to API path - the serveFile handler will look in R2
                    const newUrl = `/api/v1/media/files/${filename}`;

                    // Check if 'expiresAt' column exists (to expire story)
                    if (colNames.includes('expiresAt')) {
                        // Mark as expired (past date) so it won't appear in current stories
                        await seq.query(
                            `UPDATE "Stories" SET "expiresAt" = '2020-01-01', "mediaUrl" = :newUrl WHERE id = :id`,
                            { replacements: { newUrl, id: story.id }, type: Sequelize.QueryTypes.UPDATE }
                        );
                        console.log(`    → Expired and updated URL to: ${newUrl}`);
                    } else {
                        // Just update the mediaUrl
                        await seq.query(
                            `UPDATE "Stories" SET "mediaUrl" = :newUrl WHERE id = :id`,
                            { replacements: { newUrl, id: story.id }, type: Sequelize.QueryTypes.UPDATE }
                        );
                        console.log(`    → Updated URL to: ${newUrl}`);
                    }
                    fixed++;
                }
            }
        }

        console.log(`  Fixed: ${fixed} stories`);
        await seq.close();
    } catch (e) {
        console.log(`Port ${port} error: ${e.message.substring(0, 120)}`);
        await seq.close().catch(() => { });
    }
}

fixStoriesOnPort(5432)
    .then(() => fixStoriesOnPort(5433))
    .then(() => console.log('\nDone'));
