import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
    Bell,
    FileEdit,
    Ban,
    UserCheck,
    Settings,
    LogOut,
    Shield,
    MessageSquare,
    Compass,
    Lock,
    Activity,
    Layers
} from 'lucide-react';

import jaadoeLogo from '../assets/jaadoe_logo.svg';

const Sidebar = () => {
    const location = useLocation();

    // Grouping structure for the sidebar
    const menuGroups = [
        {
            title: 'Overview',
            items: [
                { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' }
            ]
        },
        {
            title: 'User Management',
            key: 'users',
            items: [
                { name: 'User List', icon: <Users size={20} />, path: '/users' },
                { name: 'Block List', icon: <Ban size={20} />, path: '/users/blocklist' }
            ]
        },
        {
            title: 'Content & Media',
            key: 'content',
            items: [
                { name: 'Posts', icon: <FileText size={20} />, path: '/content/posts' },
                { name: 'Reels', icon: <Video size={20} />, path: '/content/reels' },
                { name: 'Stories', icon: <Image size={20} />, path: '/stories' },
                { name: 'Avatars', icon: <UserCheck size={20} />, path: '/avatars' }
            ]
        },
        {
            title: 'Moderation & Safety',
            key: 'reports',
            items: [
                { name: 'Reports Center', icon: <AlertTriangle size={20} />, path: '/reports' },
                { name: 'Comments', icon: <MessageSquare size={20} />, path: '/moderation/comments' },
                { name: 'DM Oversight', icon: <Shield size={20} />, path: '/messages' }
            ]
        },
        {
            title: 'Discovery & Trends',
            items: [
                { name: 'Hashtags', icon: <Hash size={20} />, path: '/hashtags' },
                { name: 'Explore Control', icon: <Compass size={20} />, path: '/explore' }
            ]
        },
        {
            title: 'Analytics',
            key: 'analytics',
            items: [
                { name: 'Performance', icon: <BarChart2 size={20} />, path: '/analytics' },
                { name: 'Geo Growth', icon: <Globe size={20} />, path: '/analytics/geo' }
            ]
        },
        {
            title: 'System & Config',
            key: 'settings',
            items: [
                { name: 'CMS & Pages', icon: <FileEdit size={20} />, path: '/cms' },
                { name: 'Notifications', icon: <Bell size={20} />, path: '/notifications' },
                { name: 'Languages', icon: <Globe size={20} />, path: '/languages' },
                { name: 'Platform Settings', icon: <Settings size={20} />, path: '/settings' },
                { name: 'Roles & Perms', icon: <Lock size={20} />, path: '/roles' },
                { name: 'Audit Logs', icon: <Activity size={20} />, path: '/logs' }
            ]
        }
    ];

    const NavItem = ({ item }) => (
        <NavLink
            to={item.path}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group mb-1 ${isActive
                    ? 'bg-gradient-to-r from-pink-500/90 to-violet-600/90 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
                }`
            }
        >
            <span className="transition-transform duration-200 group-hover:scale-110">
                {item.icon}
            </span>
            <span className="font-medium text-sm">{item.name}</span>
        </NavLink>
    );

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 z-50 glass-sidebar flex flex-col border-r border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#0f172a]/90 backdrop-blur-xl">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-violet-600 bg-clip-text text-transparent flex items-center gap-2">
                    <img src={jaadoeLogo} alt="Jaadoe Logo" className="h-8 w-auto" />
                    <span className="text-xs font-normal text-gray-500 uppercase tracking-widest mt-1">Admin</span>
                </h1>
            </div>

            <nav className="flex-1 px-4 py-2 overflow-y-auto custom-scrollbar space-y-6 pb-20">
                {menuGroups.map((group, idx) => (
                    <div key={idx}>
                        {group.title && (
                            <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-2">
                                {group.title}
                            </h3>
                        )}
                        <div className="space-y-0.5">
                            {group.items.map(item => (
                                <NavItem key={item.path} item={item} />
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-black/20">
                <button
                    onClick={() => window.location.href = '/login'}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all font-medium text-sm"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
