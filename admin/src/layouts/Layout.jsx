import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useTheme } from '../context/ThemeContext';

const Layout = () => {
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen font-sans bg-gray-50 dark:bg-slate-900 transition-colors duration-300`}>
            {/* Background Overlay for better text contrast if needed */}
            <div className="fixed inset-0 pointer-events-none bg-white/30 dark:bg-black/30 z-0"></div>

            <Sidebar />
            <Navbar />

            <main className="ml-64 pt-20 p-8 relative z-10 min-h-screen">
                <div className="max-w-7xl mx-auto animate-fade-in">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
