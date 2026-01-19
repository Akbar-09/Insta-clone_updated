import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    FileText,
    Video,
    AlertTriangle,
    BarChart2,
    Settings,
    LogOut
} from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
        { name: 'Users', icon: <Users size={20} />, path: '/users' },
        { name: 'Posts', icon: <FileText size={20} />, path: '/posts' },
        { name: 'Reels', icon: <Video size={20} />, path: '/reels' },
        { name: 'Reports', icon: <AlertTriangle size={20} />, path: '/reports' },
        { name: 'Analytics', icon: <BarChart2 size={20} />, path: '/analytics' },
        { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
    ];

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 z-50 glass-sidebar flex flex-col transition-all duration-300">
            <div className="p-6 flex items-center justify-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                    Jaadoe Admin
                </h1>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto no-scrollbar">
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
            </nav>

            <div className="p-4 border-t border-gray-200/20 dark:border-white/10">
                <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
