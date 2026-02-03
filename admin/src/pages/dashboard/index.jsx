import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, Video, Image, TrendingUp, TrendingDown, Globe, Hash, AlertTriangle, Loader2 } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as adminApi from '../../api/adminApi';

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedYear, setSelectedYear] = useState(2026);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        kpis: null,
        growth: [],
        media: [],
        loginMethods: [],
        recentUsers: [],
        recentPosts: [],
        trendingHashtags: [],
        countries: []
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const [kpis, growth, media, login, users, posts, tags, countries] = await Promise.all([
                    adminApi.getKPIs(),
                    adminApi.getUserGrowth(),
                    adminApi.getMediaDistribution(),
                    adminApi.getLoginMethods(),
                    adminApi.getRecentUsers(),
                    adminApi.getRecentPosts(),
                    adminApi.getTrendingHashtags(),
                    adminApi.getCountryDistribution()
                ]);

                setData({
                    kpis: kpis.data,
                    growth: growth.data,
                    media: [
                        { name: 'Posts', value: media.data.posts, color: '#10b981' },
                        { name: 'Reels', value: media.data.reels, color: '#8b5cf6' },
                        { name: 'Stories', value: media.data.stories, color: '#ec4899' }
                    ],
                    loginMethods: login.data.map(m => ({ type: m.method, count: m.count })),
                    recentUsers: users.data.slice(0, 5),
                    recentPosts: posts.data.slice(0, 4),
                    trendingHashtags: tags.data.slice(0, 5),
                    countries: countries.data.slice(0, 5)
                });
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [selectedYear]);

    if (loading) {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center text-gray-500">
                <Loader2 className="w-12 h-12 animate-spin text-pink-500 mb-4" />
                <p className="font-medium">Loading Dashboard Analytics...</p>
            </div>
        );
    }

    const overviewStats = data.kpis ? [
        { title: 'Total Users', count: data.kpis.totalUsers?.toLocaleString(), change: `+${data.kpis.growthRates.users}%`, isPositive: true, icon: Users, color: 'blue' },
        { title: 'Total Posts', count: data.kpis.totalPosts?.toLocaleString(), change: `+${data.kpis.growthRates.posts}%`, isPositive: true, icon: FileText, color: 'green' },
        { title: 'Pending Reports', count: data.kpis.pendingReports, change: '', isPositive: false, icon: AlertTriangle, color: 'orange' },
        { title: 'Active Reels', count: data.kpis.activeReels?.toLocaleString(), change: `+${data.kpis.growthRates.reels}%`, isPositive: true, icon: Video, color: 'purple' },
    ] : [];

    const StatCard = ({ title, count, change, isPositive, icon: Icon, color }) => (
        <div className="glass-card p-6 rounded-2xl border-l-4" style={{ borderLeftColor: `var(--${color}-500, #3b82f6)` }}>
            <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-${color}-500/10 flex items-center justify-center`}>
                    <Icon className={`text-${color}-500`} size={24} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {change}
                </div>
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
            <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{count}</p>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h1>
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                >
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                    <option value={2026}>2026</option>
                </select>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {overviewStats.map((stat, idx) => (
                    <StatCard key={idx} {...stat} />
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Growth Chart */}
                <div className="glass-card p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">User Growth Summary ({selectedYear})</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data.growth}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
                            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                            <Line type="monotone" dataKey="count" name="Users" stroke="#ec4899" strokeWidth={3} dot={{ fill: '#ec4899', r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Media Analytics */}
                <div className="glass-card p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Media Analytics</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={data.media}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.media.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Login Type Analytics */}
            <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">User Login Type Analytics</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.loginMethods}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="type" stroke="#6b7280" style={{ fontSize: '12px' }} />
                        <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                        <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                        <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Widgets Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Latest Users */}
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Latest Users</h3>
                        <button onClick={() => navigate('/user-list')} className="text-sm text-pink-600 hover:text-pink-700 font-medium">View All</button>
                    </div>
                    <div className="space-y-3">
                        {data.recentUsers.map((user, idx) => (
                            <div key={user.id || idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm overflow-hidden">
                                        {user.profilePicture ? (
                                            <img src={user.profilePicture} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            (user.username?.[0] || 'U').toUpperCase()
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm text-gray-800 dark:text-white">@{user.username}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`text-xs px-2 py-1 rounded-full ${user.isBanned ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                        {user.isBanned ? 'Banned' : 'Active'}
                                    </span>
                                    <p className="text-xs text-gray-400 mt-1">{new Date(user.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Users by Countries */}
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Users by Countries</h3>
                        <button onClick={() => navigate('/analytics/geo')} className="text-sm text-pink-600 hover:text-pink-700 font-medium">View All</button>
                    </div>
                    <div className="space-y-3">
                        {data.countries.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                                <div className="flex items-center gap-3">
                                    <Globe className="text-gray-400" size={20} />
                                    <p className="font-medium text-sm text-gray-800 dark:text-white">{item.name || item.country || 'Unknown'}</p>
                                </div>
                                <p className="font-bold text-gray-800 dark:text-white">{(item.count || item.users || 0).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Post Summary & Hashtags */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Post Summary */}
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Post Summary</h3>
                        <button onClick={() => navigate('/content/posts')} className="text-sm text-pink-600 hover:text-pink-700 font-medium">View All</button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {data.recentPosts.map((post, idx) => (
                            <div key={post.id || idx} className="relative group cursor-pointer rounded-xl overflow-hidden shadow-sm">
                                <img src={post.mediaUrl || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400'} alt="" className="w-full aspect-square object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                                        <p className="font-semibold text-sm">@{post.user?.username}</p>
                                        <div className="flex gap-3 text-xs mt-1">
                                            <span>❤️ {post.likesCount || 0}</span>
                                            <span>💬 {post.commentsCount || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Popular Hashtags */}
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Popular Hashtags</h3>
                        <button onClick={() => navigate('/hashtags')} className="text-sm text-pink-600 hover:text-pink-700 font-medium">View All</button>
                    </div>
                    <div className="space-y-3">
                        {data.trendingHashtags.map((hashtag, idx) => (
                            <div key={hashtag.id || idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                        <Hash className="text-white" size={20} />
                                    </div>
                                    <p className="font-semibold text-sm text-gray-800 dark:text-white">#{hashtag.name || hashtag.tag?.replace('#', '')}</p>
                                </div>
                                <div className="text-right text-xs text-gray-500">
                                    <p>{(hashtag.usageCount || hashtag.count || 0).toLocaleString()} uses</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
