const sequelize = require('./config/database');
const AccountMetric = require('./models/AccountMetric');
const Impression = require('./models/Impression');
const Interaction = require('./models/Interaction');

const seed = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB');

        // Target User ID 1 (Akbar)
        const userId = 1;

        console.log('Cleaning old data...');
        try {
            await AccountMetric.destroy({ where: { userId } });
            await Impression.destroy({ where: { userId } });
            await Interaction.destroy({ where: { userId } });
        } catch (e) {
            console.log('Tables likely empty or not synced yet, continuing...');
        }

        // Sync models to ensure tables exist
        await sequelize.sync({ alter: true });

        const today = new Date();

        console.log('Seeding last 30 days...');
        const metrics = [];
        const allImpressions = [];
        const allInteractions = [];

        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            const reach = Math.floor(Math.random() * 500) + 100; // 100-600
            const engaged = Math.floor(Math.random() * 200) + 50; // 50-250
            const visits = Math.floor(Math.random() * 50) + 10;
            const newFollowers = Math.floor(Math.random() * 20);
            const lostFollowers = Math.floor(Math.random() * 5);

            metrics.push({
                userId,
                date: dateStr,
                totalReach: reach,
                totalEngaged: engaged,
                profileVisits: visits,
                newFollowers,
                lostFollowers,
                followersFromPosts: Math.floor(newFollowers * 0.8),
                followersFromAds: Math.floor(newFollowers * 0.2)
            });

            // Create dummy Impressions for this day
            // Only create if it's recent (to avoid huge inserts), or limit count
            // Controller counts distinct viewerId over range.
            // So we need sufficient distinct viewerIds.
            // I'll create 50 impressions/interactions per day just to show some data in aggregate queries
            // (Real reach number in chart comes from AccountMetric.totalReach, so match that)
            // But controller Step 32 queries Impression table for 'totalReach' aggregate.
            // Wait, controller uses AccountMetric for TimeSeries chart (Line 22, 59).
            // But uses Impression table for Summary Card (Line 31, 51).
            // So if I don't populate Impression table, the Summary Card "Accounts Reached" will be 0, but Chart will show data!
            // I MUST populate Impression table.

            // Optimization: Bulk create small batches
            const dailyImpressions = [];
            for (let j = 0; j < Math.min(reach, 50); j++) { // Cap at 50 to clear timeout/memory issues
                dailyImpressions.push({
                    userId,
                    viewerId: 1000 + (i * 100) + j, // Unique per day to boost total count
                    contentId: 1,
                    contentType: 'POST',
                    timestamp: date
                });
            }
            allImpressions.push(...dailyImpressions);

            const dailyInteractions = [];
            for (let j = 0; j < Math.min(engaged, 20); j++) {
                dailyInteractions.push({
                    userId,
                    actorId: 2000 + (i * 100) + j,
                    contentId: 1,
                    contentType: 'POST',
                    type: 'LIKE',
                    timestamp: date
                });
            }
            allInteractions.push(...dailyInteractions);
        }

        await AccountMetric.bulkCreate(metrics);
        // Chunking large inserts
        const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));

        for (const batch of chunk(allImpressions, 1000)) await Impression.bulkCreate(batch);
        for (const batch of chunk(allInteractions, 1000)) await Interaction.bulkCreate(batch);

        console.log('Seeding Complete!');
        process.exit();
    } catch (e) {
        console.error('Seeding Failed:', e);
        process.exit(1);
    }
};

seed();
