import React from 'react';
import { Search, Bell, Sun, Moon, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="h-16 fixed top-0 right-0 left-64 z-40 glass-navbar flex items-center justify-between px-8 transition-all duration-300">
            {/* Global Search */}
            <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Search users, posts, or reports..."
                    className="w-full bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all font-light text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400"
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <button className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-300">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-black"></span>
                </button>

                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-300"
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-white/10">
                    <div className="flex flex-col text-right hidden sm:block">
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">Admin User</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Super Admin</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 p-[2px]">
                        <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 border-2 border-transparent overflow-hidden flex items-center justify-center">
                            <User size={20} className="text-gray-500" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
