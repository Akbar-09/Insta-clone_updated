import React from 'react';
import { Users, FileText, Video, AlertTriangle, TrendingUp, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <div className="bg-white/40 backdrop-blur-xl border border-white/50 shadow-xl dark:bg-gray-900/40 dark:backdrop-blur-xl dark:shadow-2xl dark:border-white/10 p-6 rounded-2xl flex flex-col justify-between h-32 relative overflow-hidden group transition-all hover:scale-[1.02] hover:bg-white/50 dark:hover:bg-gray-900/60">
        <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform">
            <Icon size={64} className="text-gray-900 dark:text-white" />
        </div>

        <div className="flex items-start justify-between z-10">
            <div className="p-2 bg-white/50 dark:bg-white/5 rounded-lg border border-white/40 dark:border-white/5 shadow-sm">
                <Icon size={20} className="text-pink-600 dark:text-pink-400" />
            </div>
            {trend === 'up' ? (
                <div className="flex items-center text-green-700 dark:text-green-400 text-xs font-bold bg-green-400/20 dark:bg-green-500/10 px-2 py-1 rounded-full border border-green-400/30 dark:border-green-500/20">
                    <ArrowUpRight size={14} className="mr-1" /> {change}
                </div>
            ) : (
                <div className="flex items-center text-red-700 dark:text-red-400 text-xs font-bold bg-red-400/20 dark:bg-red-500/10 px-2 py-1 rounded-full border border-red-400/30 dark:border-red-500/20">
                    <ArrowDownRight size={14} className="mr-1" /> {change}
                </div>
            )}
        </div>

        <div className="z-10 mt-2">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight drop-shadow-sm">{value}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{title}</p>
        </div>
    </div>
);

const ActivityItem = ({ user, action, time, avatar }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-200/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 p-2 rounded-lg transition-colors">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 p-[2px]">
                <img src={avatar || `https://ui-avatars.com/api/?name=${user}&background=random`} alt={user} className="w-full h-full rounded-full border-2 border-white dark:border-black object-cover" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">{user}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{action}</p>
            </div>
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500">{time}</span>
    </div>
);

const SimpleLineChart = () => (
    <div className="relative h-48 mt-6 select-none">
        {/* Background Grid */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-30">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="w-full h-px bg-gray-300 dark:bg-white/10 dashed"></div>
            ))}
        </div>

        {/* Bars */}
        <div className="flex items-end justify-between h-full gap-2 sm:gap-4 px-2 relative z-10 pt-2">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                <div
                    key={i}
                    className="w-full bg-gradient-to-t from-pink-200 to-violet-200 dark:from-pink-500/20 dark:to-violet-500/20 rounded-t-xl relative group cursor-pointer transition-all duration-300 hover:scale-[1.05] hover:from-pink-500 hover:to-violet-500 dark:hover:from-pink-500 dark:hover:to-violet-500 shadow-sm hover:shadow-lg hover:shadow-pink-500/20"
                    style={{ height: `${h}%` }}
                >
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-xs font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-xl transform translate-y-2 group-hover:translate-y-0 pointer-events-none whitespace-nowrap border border-gray-100 dark:border-white/10 z-20">
                        {h * 125} Users
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-gray-800 rotate-45 border-r border-b border-gray-100 dark:border-white/10"></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const Dashboard = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h1>
                <button className="glass-panel px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-white hover:bg-white/10 transition-colors">
                    Download Report
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Users" value="24.5K" change="+12%" icon={Users} trend="up" />
                <StatCard title="Total Posts" value="1.2M" change="+5.4%" icon={FileText} trend="up" />
                <StatCard title="Active Reels" value="850K" change="+28%" icon={Video} trend="up" />
                <StatCard title="Pending Reports" value="142" change="-3%" icon={AlertTriangle} trend="down" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart Section */}
                <div className="bg-white/30 backdrop-blur-xl border border-white/40 shadow-xl dark:bg-gray-900/40 dark:backdrop-blur-xl dark:shadow-2xl dark:border-white/10 p-6 rounded-2xl lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white drop-shadow-sm">User Growth Analytics</h2>
                        <button className="p-2 hover:bg-white/20 dark:hover:bg-white/10 rounded-full text-gray-600 dark:text-gray-300 transition-colors"><MoreHorizontal size={20} /></button>
                    </div>
                    <div className="h-64 flex flex-col justify-end">
                        {/* Mock Chart */}
                        <SimpleLineChart />
                        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-500 mt-2 px-1 font-medium">
                            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/30 backdrop-blur-xl border border-white/40 shadow-xl dark:bg-gray-900/40 dark:backdrop-blur-xl dark:shadow-2xl dark:border-white/10 p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white drop-shadow-sm">Recent Activity</h2>
                        <button className="text-xs text-pink-700 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300 font-bold transition-colors">View All</button>
                    </div>
                    <div className="space-y-1">
                        <ActivityItem user="Sarah Wilson" action="Reported a post for spam" time="2m ago" />
                        <ActivityItem user="Mike Johnson" action="New user registration" time="15m ago" />
                        <ActivityItem user="Alex Chen" action="Posted a new reel" time="1h ago" />
                        <ActivityItem user="Emily Davis" action="Updated profile picture" time="2h ago" />
                        <ActivityItem user="Tom Smith" action="Comment reported" time="3h ago" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
