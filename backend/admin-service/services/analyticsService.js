const internalApi = require('./internalApi');

exports.getAnalyticsSummary = async () => {
    try {
        // Fetch data in parallel
        const [userStats, engagementStats] = await Promise.allSettled([
            internalApi.getUserGrowthStats(),
            internalApi.getEngagementStats()
        ]);

        const totalUsers = userStats.status === 'fulfilled' ? userStats.value.data.data.total : 0;
        const newUsersChange = userStats.status === 'fulfilled' ? userStats.value.data.data.growth : 0;

        const avgEngagementRate = engagementStats.status === 'fulfilled' && engagementStats.value.data.data
            ? parseFloat(engagementStats.value.data.data.rate)
            : 0;

        // Mock Ad Revenue & Server Load (or implement specialized services later)
        const adRevenue = 45200; // Simulated
        const revenueChange = -2; // Simulated
        const serverLoad = Math.floor(Math.random() * 20) + 20; // Simulated 20-40%

        return {
            newUsers: totalUsers, // Using total for now or calculate monthly from growth
            newUsersChange,
            avgEngagementRate,
            engagementChange: 0.5, // Mocked diff
            adRevenue,
            revenueChange,
            serverLoad,
            serverStatus: serverLoad > 80 ? 'critical' : serverLoad > 60 ? 'high' : 'stable'
        };
    } catch (error) {
        console.error('Analytics Aggregation Error:', error);
        throw error;
    }
};

exports.getUserAcquisition = async (range) => {
    try {
        const response = await internalApi.getUserMonthlyGrowth();
        // Transform { month: 'Jan', count: 10 } to array
        const rawdata = response.data.data || [];

        // Ensure all months are present or just return what we have
        // Mapping simple array for chart
        return rawdata.map(d => ({ month: d.month, users: parseInt(d.count) }));
    } catch (error) {
        console.error('User Acquisition Error:', error);
        return [];
    }
};

exports.getEngagementTrends = async (range) => {
    try {
        const response = await internalApi.getEngagementTrends();
        return response.data.data;
    } catch (error) {
        console.error('Engagement Trends Error:', error);
        return [];
    }
};

exports.getTopContent = async (limit) => {
    try {
        const response = await internalApi.getTopContent(limit);
        return response.data.data;
    } catch (error) {
        console.error('Top Content Error:', error);
        return [];
    }
};
