const { Sequelize } = require('sequelize');

const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

async function sync() {
    try {
        await seq.authenticate();
        console.log('Connected to database.');

        // 1. Get all video posts that are NOT already in Reels table
        // We'll use mediaUrl comparison to detect duplicates
        const [videoPosts] = await seq.query(`
            SELECT * FROM "Posts" 
            WHERE "mediaType" = 'VIDEO' 
            AND "isHidden" = false
        `);
        console.log(`Found ${videoPosts.length} video posts in Posts table.`);

        const [existingReels] = await seq.query('SELECT "videoUrl" FROM "Reels"');
        const reelUrls = new Set(existingReels.map(r => r.videoUrl));

        let createdCount = 0;
        for (const post of videoPosts) {
            if (!reelUrls.has(post.mediaUrl)) {
                await seq.query(`
                    INSERT INTO "Reels" (
                        "userId", 
                        username, 
                        caption, 
                        "videoUrl", 
                        "likesCount", 
                        "commentsCount", 
                        "viewsCount", 
                        "isHidden", 
                        "createdAt", 
                        "updatedAt"
                    ) VALUES (
                        :userId, 
                        :username, 
                        :caption, 
                        :videoUrl, 
                        :likesCount, 
                        :commentsCount, 
                        :viewsCount, 
                        false, 
                        :createdAt, 
                        NOW()
                    )
                `, {
                    replacements: {
                        userId: post.userId,
                        username: post.username,
                        caption: post.caption,
                        videoUrl: post.mediaUrl,
                        likesCount: post.likesCount,
                        commentsCount: post.commentsCount,
                        viewsCount: post.viewsCount,
                        createdAt: post.createdAt
                    }
                });
                createdCount++;
            }
        }

        console.log(`Successfully migrated ${createdCount} video posts to Reels table.`);

    } catch (err) {
        console.error('Sync Error:', err);
    } finally {
        await seq.close();
    }
}

sync();
