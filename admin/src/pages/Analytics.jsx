import React from 'react';
import { BarChart2, TrendingUp, Users, Eye } from 'lucide-react';

const ChartPlaceholder = ({ height = "h-64", color = "bg-pink-500" }) => (
    <div className={`w-full ${height} flex items-end gap-2 p-4`}>
        {[30, 50, 45, 70, 60, 85, 95, 80, 65, 70, 55, 90].map((h, i) => (
            <div
                key={i}
                className={`flex-1 rounded-t-sm transition-all hover:opacity-80 ${color}`}
                style={{ height: `${h}%`, opacity: 0.2 + (i / 20) }}
            ></div>
        ))}
    </div>
);

const Analytics = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Platform Analytics</h1>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">New Users (MoM)</span>
                    <div className="mt-2 text-2xl font-bold text-gray-800 dark:text-white flex items-end gap-2">
                        +2,450
                        <span className="text-green-500 dark:text-green-400 text-sm font-normal mb-1">+12%</span>
                    </div>
                </div>
                <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Avg. Engagement</span>
                    <div className="mt-2 text-2xl font-bold text-gray-800 dark:text-white flex items-end gap-2">
                        4.8%
                        <span className="text-green-500 dark:text-green-400 text-sm font-normal mb-1">+0.5%</span>
                    </div>
                </div>
                <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Ad Revenue</span>
                    <div className="mt-2 text-2xl font-bold text-gray-800 dark:text-white flex items-end gap-2">
                        $45.2K
                        <span className="text-red-500 dark:text-red-400 text-sm font-normal mb-1">-2%</span>
                    </div>
                </div>
                <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Server Load</span>
                    <div className="mt-2 text-2xl font-bold text-gray-800 dark:text-white flex items-end gap-2">
                        34%
                        <span className="text-green-500 dark:text-green-400 text-sm font-normal mb-1">Stable</span>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                        <Users size={18} className="text-pink-500" /> User Acquisition
                    </h3>
                    <ChartPlaceholder height="h-64" color="bg-gradient-to-t from-pink-500 to-violet-500" />
                    <div className="flex justify-between mt-4 text-xs text-gray-500 dark:text-gray-400 px-2">
                        <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
                    </div>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                        <TrendingUp size={18} className="text-blue-500" /> Engagement Trends
                    </h3>
                    <ChartPlaceholder height="h-64" color="bg-gradient-to-t from-blue-500 to-cyan-500" />
                    <div className="flex justify-between mt-4 text-xs text-gray-500 dark:text-gray-400 px-2">
                        <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
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
                            {[1, 2, 3, 4, 5].map(i => (
                                <tr key={i} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                    <td className="py-3 font-mono text-xs">#9823{i}</td>
                                    <td className="py-3">@influencer_{i}</td>
                                    <td className="py-3">{120 + i}K</td>
                                    <td className="py-3">{45 + i}.2K</td>
                                    <td className="py-3 font-bold text-green-500 dark:text-green-400">{8.5 + (i * 0.2)}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
