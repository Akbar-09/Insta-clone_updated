const cron = require('node-cron');
const UserProfile = require('../models/UserProfile');
const AccountAnalytics = require('../models/AccountAnalytics');
const { Op } = require('sequelize');

// Run every day at midnight
const startAnalyticsJob = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log('[AnalyticsJob] Running daily account analytics job...');
        try {
            // Find all creator and business accounts
            const profiles = await UserProfile.findAll({
                where: {
                    accountType: {
                        [Op.in]: ['creator', 'business']
                    }
                }
            });

            console.log(`[AnalyticsJob] Found ${profiles.length} professional accounts to process.`);

            for (const profile of profiles) {
                // In a real application, calculate actual metrics representing daily growth.
                // For demonstration, inserting mock data representing 1 day of delta.
                const randomGrowth = Math.floor(Math.random() * 10);
                const isPositive = Math.random() > 0.3; // 70% chance positive

                await AccountAnalytics.create({
                    userId: profile.userId,
                    profile_views: Math.floor(Math.random() * 50) + 5,
                    post_reach: Math.floor(Math.random() * 200) + 10,
                    engagement: Math.floor(Math.random() * 15) + 1,
                    followers_growth: isPositive ? randomGrowth : -randomGrowth,
                    recordedAt: new Date()
                });
            }

            console.log('[AnalyticsJob] Finished populating daily analytics.');
        } catch (error) {
            console.error('[AnalyticsJob] Error running cron job:', error);
        }
    });
};

module.exports = startAnalyticsJob;
