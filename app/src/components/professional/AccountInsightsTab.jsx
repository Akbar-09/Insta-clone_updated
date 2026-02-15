import React, { useState, useEffect } from 'react';
import { getAccountInsights } from '../../api/insightApi';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    AreaChart,
    Area
} from 'recharts';
import { Users, Eye, TrendingUp, MousePointer2, UserPlus } from 'lucide-react';

const InsightCard = ({ title, value, change, icon: Icon, color = "text-primary" }) => (
    <div className="bg-white dark:bg-[#121212] p-6 rounded-2xl border border-border shadow-sm">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-2xl font-bold">{value.toLocaleString()}</h3>
                <div className={`flex items-center gap-1 mt-2 text-xs font-bold ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    <span>{change >= 0 ? '+' : ''}{change}%</span>
                    <span className="text-gray-400 font-normal">vs last period</span>
                </div>
            </div>
            <div className={`p-3 rounded-xl bg-gray-50 dark:bg-white/5 ${color}`}>
                <Icon size={24} />
            </div>
        </div>
    </div>
);

const AccountInsightsTab = ({ range }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await getAccountInsights(range);
                if (res.data.status === 'success') {
                    setData(res.data.data);
                }
            } catch (e) {
                console.error('Insights fetch error', e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [range]);

    if (loading) return (
        <div className="space-y-6 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-gray-200 dark:bg-white/5 rounded-2xl"></div>)}
            </div>
            <div className="h-[400px] bg-gray-200 dark:bg-white/5 rounded-2xl"></div>
        </div>
    );

    if (!data) return <div className="text-center py-20 text-gray-500">No data available for this range.</div>;

    const chartData = data.timeSeries.map(m => ({
        date: new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        reach: m.totalReach,
        engaged: m.totalEngaged,
        visits: m.profileVisits
    }));

    return (
        <div className="space-y-6">
            {/* Overview Section */}
            <section>
                <h2 className="text-lg font-bold mb-4">Account Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <InsightCard
                        title="Accounts Reached"
                        value={data.accountsReached}
                        change={12}
                        icon={Eye}
                        color="text-[#5856D6]"
                    />
                    <InsightCard
                        title="Accounts Engaged"
                        value={data.accountsEngaged}
                        change={5}
                        icon={TrendingUp}
                        color="text-[#FF2D55]"
                    />
                    <InsightCard
                        title="Profile Visits"
                        value={data.profileVisits}
                        change={-2}
                        icon={MousePointer2}
                        color="text-[#007AFF]"
                    />
                    <InsightCard
                        title="New Followers"
                        value={data.followerGrowth.gained}
                        change={24}
                        icon={UserPlus}
                        color="text-[#FF9500]"
                    />
                </div>
            </section>

            {/* Reach Chart */}
            <section className="bg-white dark:bg-[#121212] p-6 rounded-2xl border border-border shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-lg font-bold">Reach</h2>
                        <p className="text-sm text-gray-400">Total accounts reached over time</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-primary"></span>
                            <span className="text-xs text-gray-400">Reach</span>
                        </div>
                    </div>
                </div>

                <div style={{ width: '100%', height: 300, minHeight: 300, minWidth: 0 }}>
                    <ResponsiveContainer width="100%" height={300} debounce={50}>
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0095f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#0095f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#888', fontSize: 12 }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#888', fontSize: 12 }}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#262626', border: 'none', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#0095f6' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="reach"
                                stroke="#0095f6"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorReach)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </section>

            {/* Follower Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section className="bg-white dark:bg-[#121212] p-6 rounded-2xl border border-border shadow-sm">
                    <h2 className="text-lg font-bold mb-4">Follower Breakdown</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Gained</span>
                            <span className="text-sm font-bold text-green-500">+{data.followerGrowth.gained}</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                            <div className="bg-green-500 h-full" style={{ width: '70%' }}></div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Unfollowed</span>
                            <span className="text-sm font-bold text-red-500">-{data.followerGrowth.lost}</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                            <div className="bg-red-500 h-full" style={{ width: '30%' }}></div>
                        </div>
                    </div>
                </section>

                <section className="bg-white dark:bg-[#121212] p-6 rounded-2xl border border-border shadow-sm flex flex-col items-center justify-center text-center">
                    <Users size={48} className="text-primary mb-4" />
                    <h2 className="text-xl font-bold mb-1">{data.followerGrowth.net >= 0 ? '+' : ''}{data.followerGrowth.net}</h2>
                    <p className="text-sm text-gray-400">Net follower growth</p>
                </section>
            </div>
        </div>
    );
};

export default AccountInsightsTab;
