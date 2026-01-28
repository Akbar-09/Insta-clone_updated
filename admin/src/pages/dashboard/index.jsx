import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, Video, Image, TrendingUp, TrendingDown, Globe, Hash, AlertTriangle } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedYear, setSelectedYear] = useState(2026);

    // Mock Data
    const overviewStats = [
        { title: 'Total Users', count: '45,231', change: '+12.5%', isPositive: true, icon: Users, color: 'blue' },
        { title: 'Total Posts', count: '128,456', change: '+8.2%', isPositive: true, icon: FileText, color: 'green' },
        { title: 'Pending Reports', count: '142', change: '+5.4%', isPositive: false, icon: AlertTriangle, color: 'orange' },
        { title: 'Active Reels', count: '32,891', change: '+15.7%', isPositive: true, icon: Video, color: 'purple' },
    ];

    const userGrowthData = [
        { month: 'Jan', users: 3200 },
        { month: 'Feb', users: 4100 },
        { month: 'Mar', users: 5300 },
        { month: 'Apr', users: 6800 },
        { month: 'May', users: 8200 },
        { month: 'Jun', users: 9500 },
        { month: 'Jul', users: 11200 },
        { month: 'Aug', users: 13100 },
        { month: 'Sep', users: 15400 },
        { month: 'Oct', users: 17800 },
        { month: 'Nov', users: 20300 },
        { month: 'Dec', users: 23100 },
    ];

    const mediaAnalyticsData = [
        { name: 'Posts', value: 45, color: '#10b981' },
        { name: 'Reels', value: 30, color: '#8b5cf6' },
        { name: 'Stories', value: 25, color: '#ec4899' },
    ];

    const loginTypeData = [
        { type: 'Email', count: 18500 },
        { type: 'Mobile', count: 12300 },
        { type: 'Gmail', count: 9800 },
        { type: 'Apple', count: 4600 },
    ];

    const latestUsers = [
        { username: '@john_doe', email: 'john@example.com', loginType: 'Email', platform: 'Website', status: 'Active', reports: 0, created: '2 hours ago' },
        { username: '@jane_smith', email: 'jane@example.com', loginType: 'Gmail', platform: 'Mobile', status: 'Active', reports: 1, created: '5 hours ago' },
        { username: '@mike_wilson', email: 'mike@example.com', loginType: 'Apple', platform: 'Website', status: 'Blocked', reports: 3, created: '1 day ago' },
        { username: '@sarah_jones', email: 'sarah@example.com', loginType: 'Mobile', platform: 'Mobile', status: 'Active', reports: 0, created: '2 days ago' },
    ];

    const usersByCountry = [
        { country: 'United States', users: 12500, flag: '🇺🇸' },
        { country: 'India', users: 9800, flag: '🇮🇳' },
        { country: 'United Kingdom', users: 6700, flag: '🇬🇧' },
        { country: 'Canada', users: 4200, flag: '🇨🇦' },
        { country: 'Australia', users: 3100, flag: '🇦🇺' },
    ];

    const postSummary = [
        { image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', username: '@emma_watson', likes: 2341, comments: 156, posted: '3h ago' },
        { image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', username: '@chris_evans', likes: 1892, comments: 98, posted: '5h ago' },
        { image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', username: '@olivia_brown', likes: 3456, comments: 234, posted: '8h ago' },
        { image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', username: '@noah_davis', likes: 1567, comments: 87, posted: '12h ago' },
    ];

    const popularHashtags = [
        { tag: '#travel', posts: 12500, reels: 3400 },
        { tag: '#food', posts: 9800, reels: 2100 },
        { tag: '#fitness', posts: 8700, reels: 4500 },
        { tag: '#fashion', posts: 7600, reels: 1800 },
        { tag: '#photography', posts: 6500, reels: 900 },
    ];

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
                        <LineChart data={userGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
                            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                            <Line type="monotone" dataKey="users" stroke="#ec4899" strokeWidth={3} dot={{ fill: '#ec4899', r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Media Analytics */}
                <div className="glass-card p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Media Analytics</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={mediaAnalyticsData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {mediaAnalyticsData.map((entry, index) => (
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
                    <BarChart data={loginTypeData}>
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
                        <button onClick={() => navigate('/users')} className="text-sm text-pink-600 hover:text-pink-700 font-medium">View All</button>
                    </div>
                    <div className="space-y-3">
                        {latestUsers.map((user, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                        {user.username[1].toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm text-gray-800 dark:text-white">{user.username}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`text-xs px-2 py-1 rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {user.status}
                                    </span>
                                    <p className="text-xs text-gray-400 mt-1">{user.created}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Users by Countries */}
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Users by Countries</h3>
                        <button onClick={() => navigate('/country-wise-users')} className="text-sm text-pink-600 hover:text-pink-700 font-medium">View All</button>
                    </div>
                    <div className="space-y-3">
                        {usersByCountry.map((country, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{country.flag}</span>
                                    <p className="font-medium text-sm text-gray-800 dark:text-white">{country.country}</p>
                                </div>
                                <p className="font-bold text-gray-800 dark:text-white">{country.users.toLocaleString()}</p>
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
                        <button onClick={() => navigate('/posts')} className="text-sm text-pink-600 hover:text-pink-700 font-medium">View All</button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {postSummary.map((post, idx) => (
                            <div key={idx} className="relative group cursor-pointer rounded-xl overflow-hidden">
                                <img src={post.image} alt={post.username} className="w-full aspect-square object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                                        <p className="font-semibold text-sm">{post.username}</p>
                                        <div className="flex gap-3 text-xs mt-1">
                                            <span>❤️ {post.likes}</span>
                                            <span>💬 {post.comments}</span>
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
                        {popularHashtags.map((hashtag, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                        <Hash className="text-white" size={20} />
                                    </div>
                                    <p className="font-semibold text-sm text-gray-800 dark:text-white">{hashtag.tag}</p>
                                </div>
                                <div className="text-right text-xs text-gray-500">
                                    <p>{hashtag.posts} posts</p>
                                    <p>{hashtag.reels} reels</p>
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
