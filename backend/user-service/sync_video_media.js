const { Sequelize } = require('sequelize');
const crypto = require('crypto');

const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

async function syncMedia() {
    try {
        await seq.authenticate();
        console.log('Connected to database.');

        // 1. Get all video URLs from Posts and Reels
        const [posts] = await seq.query('SELECT "mediaUrl" as url FROM "Posts" WHERE "mediaType" = \'VIDEO\'');
        const [reels] = await seq.query('SELECT "videoUrl" as url FROM "Reels"');

        const urls = new Set([...posts.map(p => p.url), ...reels.map(r => r.url)]);
        console.log(`Unique video URLs to check: ${urls.size}`);

        let count = 0;
        for (const url of urls) {
            if (!url) continue;

            // Extract filename and key
            let key = url;
            if (url.includes('/media/files/')) {
                key = url.split('/media/files/')[1];
            } else if (url.startsWith('/uploads/')) {
                key = url.replace('/uploads/', 'Jaadoe/posts/videos/'); // Best guess for old uploads
            }

            const filename = key.split('/').pop();

            // Check if already in Media table
            const [existing] = await seq.query('SELECT id FROM "Media" WHERE "r2Key" = :key OR "tempKey" = :filename', {
                replacements: { key, filename }
            });

            if (existing.length === 0) {
                await seq.query(
                    'INSERT INTO "Media" (id, url, "r2Key", "tempKey", filename, type, "uploadStatus", "createdAt", "updatedAt") VALUES (:id, :url, :r2Key, :tempKey, :filename, \'video\', \'completed\', NOW(), NOW())',
                    {
                        replacements: {
                            id: crypto.randomUUID(),
                            url: url.startsWith('/') ? url : `/api/v1/media/files/${url}`,
                            r2Key: key,
                            tempKey: filename,
                            filename: filename
                        }
                    }
                );
                count++;
            }
        }

        console.log(`✅ Synced ${count} video records to Media table.`);

    } catch (err) {
        console.error('Sync Error:', err.message);
    } finally {
        await seq.close();
    }
}

syncMedia();
