import React, { useState, useRef, useEffect } from 'react';
import { Bell, Sun, Moon, User, Settings, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import GlobalSearch from './GlobalSearch';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const notificationRef = useRef(null);
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotificationsOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="h-16 fixed top-0 right-0 left-64 z-40 glass-navbar flex items-center justify-between px-8 transition-all duration-300">
            {/* Global Search */}
            <GlobalSearch />

            {/* Right Actions */}
            <div className="flex items-center gap-4 relative" ref={notificationRef}>
                <button
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-300"
                >
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-black"></span>
                </button>

                {/* Notification Dropdown */}
                {isNotificationsOpen && (
                    <div className="absolute top-full right-0 mt-2 w-80 bg-white/90 dark:bg-black/90 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                        <div className="p-4 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
                            <h3 className="font-semibold text-gray-800 dark:text-white">Notifications</h3>
                            <button className="text-xs text-pink-500 hover:text-pink-600 font-medium">Mark all read</button>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                            {[
                                { id: 1, title: 'New Report', desc: '@bad_actor reported for harassment', time: '2m ago', color: 'bg-red-500/10 text-red-500' },
                                { id: 2, title: 'System Update', desc: 'Maintenance scheduled for tonight', time: '1h ago', color: 'bg-blue-500/10 text-blue-500' },
                                { id: 3, title: 'New User', desc: 'Welcome @sarah_design to the platform', time: '3h ago', color: 'bg-green-500/10 text-green-500' },
                                { id: 4, title: 'High Traffic', desc: 'Server load reached 85%', time: '5h ago', color: 'bg-yellow-500/10 text-yellow-500' },
                            ].map((notif) => (
                                <div key={notif.id} className="p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer border-b last:border-0 border-gray-100 dark:border-white/5">
                                    <div className="flex gap-3">
                                        <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${notif.color.split(' ')[1].replace('text', 'bg')}`}></div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800 dark:text-white">{notif.title}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{notif.desc}</p>
                                            <p className="text-[10px] text-gray-400 mt-1">{notif.time}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-white/5 text-center border-t border-gray-200 dark:border-white/10">
                            <button className="text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors">
                                View Previous Notifications
                            </button>
                        </div>
                    </div>
                )}

                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-300"
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <div className="relative pl-4 border-l border-gray-200 dark:border-white/10" ref={profileRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 hover:bg-black/5 dark:hover:bg-white/5 p-1 rounded-lg transition-colors text-left"
                    >
                        <div className="flex flex-col text-right hidden sm:block">
                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">Admin User</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Super Admin</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 p-[2px]">
                            <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 border-2 border-transparent overflow-hidden flex items-center justify-center">
                                <User size={20} className="text-gray-500" />
                            </div>
                        </div>
                    </button>

                    {/* Profile Dropdown */}
                    {isProfileOpen && (
                        <div className="absolute top-full right-0 mt-2 w-56 bg-white/90 dark:bg-black/90 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                            <div className="p-4 border-b border-gray-200 dark:border-white/10">
                                <p className="font-semibold text-gray-800 dark:text-white">Admin User</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">admin@instagram.com</p>
                            </div>
                            <div className="p-2">
                                <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                                    <User size={16} />
                                    <span>My Profile</span>
                                </button>
                                <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                                    <Settings size={16} />
                                    <span>Settings</span>
                                </button>
                                <hr className="my-2 border-gray-100 dark:border-white/5" />
                                <button
                                    onClick={() => window.location.href = '/login'}
                                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                >
                                    <LogOut size={16} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
