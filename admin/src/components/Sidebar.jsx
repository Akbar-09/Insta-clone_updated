import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    FileText,
    Video,
    Image,
    AlertTriangle,
    BarChart2,
    Hash,
    Globe,
    Globe2,
    Bell,
    FileEdit,
    Ban,
    UserCheck,
    Settings,
    LogOut,
    ChevronDown,
    ChevronRight
} from 'lucide-react';

const Sidebar = () => {
    const [isReportListOpen, setIsReportListOpen] = useState(false);
    const [isUserListOpen, setIsUserListOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
        { name: 'Posts', icon: <FileText size={20} />, path: '/posts' },
        { name: 'Reels', icon: <Video size={20} />, path: '/reels' },
        { name: 'Stories', icon: <Image size={20} />, path: '/stories' },
    ];

    const userSubItems = [
        { name: 'User List', path: '/users' },
        { name: 'Countrywise Users', path: '/country-wise-users' },
    ];

    const reportSubItems = [
        { name: 'User Report List', path: '/user-reports' },
        { name: 'Post Report List', path: '/post-reports' },
        { name: 'Reel Report List', path: '/reel-reports' },
    ];

    const otherNavItems = [
        { name: 'Analytics', icon: <BarChart2 size={20} />, path: '/analytics' },
        { name: 'Hashtags', icon: <Hash size={20} />, path: '/hashtags' },
        { name: 'Languages', icon: <Globe size={20} />, path: '/languages' },
        { name: 'Notifications', icon: <Bell size={20} />, path: '/notifications' },
        { name: 'CMS Pages', icon: <FileEdit size={20} />, path: '/cms' },
        { name: 'Block List', icon: <Ban size={20} />, path: '/blocklist' },
        { name: 'Avatars', icon: <UserCheck size={20} />, path: '/avatars' },
        { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
    ];

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 z-50 glass-sidebar flex flex-col transition-all duration-300">
            <div className="p-6 flex items-center justify-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                    Snapta Admin
                </h1>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto no-scrollbar">
                {/* Regular nav items */}
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-gradient-to-r from-pink-500/80 to-violet-500/80 text-white shadow-lg shadow-pink-500/20'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/10'
                            }`
                        }
                    >
                        <span className="transition-transform duration-200 group-hover:scale-110">
                            {item.icon}
                        </span>
                        <span className="font-medium">{item.name}</span>
                    </NavLink>
                ))}

                {/* User List with submenu */}
                <div>
                    <button
                        onClick={() => setIsUserListOpen(!isUserListOpen)}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/10"
                    >
                        <div className="flex items-center gap-3">
                            <Users size={20} />
                            <span className="font-medium">User List</span>
                        </div>
                        {isUserListOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>

                    {/* Submenu */}
                    {isUserListOpen && (
                        <div className="ml-4 mt-2 space-y-1">
                            {userSubItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${isActive
                                            ? 'bg-pink-500/20 text-pink-600 dark:text-pink-400 font-semibold'
                                            : 'text-gray-500 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-white/5'
                                        }`
                                    }
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                    <span>{item.name}</span>
                                </NavLink>
                            ))}
                        </div>
                    )}
                </div>

                {/* Report List with submenu */}
                <div>
                    <button
                        onClick={() => setIsReportListOpen(!isReportListOpen)}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/10"
                    >
                        <div className="flex items-center gap-3">
                            <AlertTriangle size={20} />
                            <span className="font-medium">Report List</span>
                        </div>
                        {isReportListOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>

                    {/* Submenu */}
                    {isReportListOpen && (
                        <div className="ml-4 mt-2 space-y-1">
                            {reportSubItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${isActive
                                            ? 'bg-pink-500/20 text-pink-600 dark:text-pink-400 font-semibold'
                                            : 'text-gray-500 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-white/5'
                                        }`
                                    }
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                    <span>{item.name}</span>
                                </NavLink>
                            ))}
                        </div>
                    )}
                </div>

                {/* Other nav items */}
                {otherNavItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-gradient-to-r from-pink-500/80 to-violet-500/80 text-white shadow-lg shadow-pink-500/20'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/10'
                            }`
                        }
                    >
                        <span className="transition-transform duration-200 group-hover:scale-110">
                            {item.icon}
                        </span>
                        <span className="font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-200/20 dark:border-white/10">
                <button
                    onClick={() => window.location.href = '/login'}
                    className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
