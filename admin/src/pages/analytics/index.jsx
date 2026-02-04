import React, { useState, useEffect } from 'react';
import { BarChart2, TrendingUp, Users, Eye, Loader2, ArrowUp, ArrowDown } from 'lucide-react';
import * as adminApi from '../../api/adminApi';

const Analytics = () => {
    const [summary, setSummary] = useState(null);
    const [acquisition, setAcquisition] = useState([]);
    const [engagement, setEngagement] = useState([]);
    const [topContent, setTopContent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const [sumRes, acqRes, engRes, topRes] = await Promise.all([
                adminApi.getAnalyticsSummary(),
                adminApi.getUserAcquisition('monthly'),
                adminApi.getEngagementTrends('monthly'),
                adminApi.getTopContent(10)
            ]);

            if (sumRes.success) setSummary(sumRes.data);
            if (acqRes.success) setAcquisition(acqRes.data);
            if (engRes.success) setEngagement(engRes.data);
            if (topRes.success) setTopContent(topRes.data);
        } catch (error) {
            console.error('Failed to load analytics', error);
        } finally {
            setLoading(false);
        }
    };

    const normalizeData = (data, key) => {
        if (!data || data.length === 0) return [];
        const max = Math.max(...data.map(d => d[key]));
        return data.map(d => ({ ...d, height: max > 0 ? (d[key] / max) * 100 : 0 }));
    };

    const acquisitionChartData = normalizeData(acquisition, 'users');
    const engagementChartData = normalizeData(engagement, 'engagementRate');

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-pink-500" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Platform Analytics</h1>

            {/* Overview Cards */}
            {summary && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
                        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">New Users (MoM)</span>
                        <div className="mt-2 text-2xl font-bold text-gray-800 dark:text-white flex items-end gap-2">
                            +{summary.newUsers.toLocaleString()}
                            <span className={`text-sm font-normal mb-1 flex items-center ${summary.newUsersChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {summary.newUsersChange >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                                {Math.abs(summary.newUsersChange)}%
                            </span>
                        </div>
                    </div>
                    <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
                        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Avg. Engagement</span>
                        <div className="mt-2 text-2xl font-bold text-gray-800 dark:text-white flex items-end gap-2">
                            {summary.avgEngagementRate}%
                            <span className={`text-sm font-normal mb-1 flex items-center ${summary.engagementChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {summary.engagementChange >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                                {Math.abs(summary.engagementChange)}%
                            </span>
                        </div>
                    </div>
                    <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
                        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Ad Revenue</span>
                        <div className="mt-2 text-2xl font-bold text-gray-800 dark:text-white flex items-end gap-2">
                            ${(summary.adRevenue / 1000).toFixed(1)}K
                            <span className={`text-sm font-normal mb-1 flex items-center ${summary.revenueChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {summary.revenueChange >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                                {Math.abs(summary.revenueChange)}%
                            </span>
                        </div>
                    </div>
                    <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
                        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Server Load</span>
                        <div className="mt-2 text-2xl font-bold text-gray-800 dark:text-white flex items-end gap-2">
                            {summary.serverLoad}%
                            <span className={`text-sm font-normal mb-1 ${summary.serverStatus === 'stable' ? 'text-green-500' : 'text-orange-500'}`}>
                                {summary.serverStatus.charAt(0).toUpperCase() + summary.serverStatus.slice(1)}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                        <Users size={18} className="text-pink-500" /> User Acquisition
                    </h3>
                    <div className="w-full h-64 flex items-end gap-2 p-4">
                        {acquisitionChartData.map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end group relative h-full">
                                <div
                                    className="w-full bg-gradient-to-t from-pink-500 to-violet-500 rounded-t-sm transition-all hover:opacity-100 opacity-60 relative"
                                    style={{ height: `${d.height}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        {d.users} users
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-gray-500 dark:text-gray-400 px-2 overflow-hidden">
                        {acquisition.filter((_, i) => i % 2 === 0).map((d, i) => (
                            <span key={i}>{d.month}</span>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                        <TrendingUp size={18} className="text-blue-500" /> Engagement Trends
                    </h3>
                    <div className="w-full h-64 flex items-end gap-2 p-4">
                        {engagementChartData.map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end group relative h-full">
                                <div
                                    className="w-full bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t-sm transition-all hover:opacity-100 opacity-60 relative"
                                    style={{ height: `${d.height}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        {d.engagementRate}% rate
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-gray-500 dark:text-gray-400 px-2 overflow-hidden">
                        {engagement.filter((_, i) => i % 2 === 0).map((d, i) => (
                            <span key={i}>{d.month}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Content Table */}
            <div className="glass-panel rounded-2xl overflow-hidden p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Top Performing Content</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                        <thead className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-white/10">
                            <tr>
                                <th className="pb-3 font-medium">Content ID</th>
                                <th className="pb-3 font-medium">Creator</th>
                                <th className="pb-3 font-medium">Views</th>
                                <th className="pb-3 font-medium">Likes</th>
                                <th className="pb-3 font-medium">Engagement Rate</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                            {topContent.length > 0 ? topContent.map((content) => (
                                <tr key={content.contentId} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                    <td className="py-3 font-mono text-xs">#{content.contentId}</td>
                                    <td className="py-3">@{content.creatorUsername}</td>
                                    <td className="py-3">{content.views.toLocaleString()}</td>
                                    <td className="py-3">{content.likes.toLocaleString()}</td>
                                    <td className="py-3 font-bold text-green-500 dark:text-green-400">{content.engagementRate}%</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="py-8 text-center text-gray-400">No content data available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
