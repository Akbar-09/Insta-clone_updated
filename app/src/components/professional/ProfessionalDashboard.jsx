import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    BarChart3,
    Megaphone,
    Settings,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
    Users,
    Eye,
    TrendingUp,
    Calendar,
    ChevronDown,
    Filter
} from 'lucide-react';
import AccountInsightsTab from './AccountInsightsTab';
import ContentInsightsTab from './ContentInsightsTab';
import AdToolsTab from './AdToolsTab';

const ProfessionalDashboard = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isInsightsOpen, setIsInsightsOpen] = useState(false);

    // UI State
    const activeTab = searchParams.get('tab') || 'insights';
    const subTab = searchParams.get('sub') || 'account';
    const timeRange = searchParams.get('range') || '7';

    const handleTabChange = (tab, sub = null) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('tab', tab);
        if (sub) newParams.set('sub', sub);
        else newParams.delete('sub');
        setSearchParams(newParams);
        setIsInsightsOpen(false); // Close dropdown on selection
    };

    const handleRangeChange = (range) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('range', range);
        setSearchParams(newParams);
    };

    return (
        <div className="flex flex-col flex-1 bg-transparent min-h-screen text-black dark:text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-transparent px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <LayoutDashboard size={24} className="text-primary" />
                    <h1 className="text-xl font-bold">Professional Dashboard</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-white/40 dark:bg-black/40 backdrop-blur-sm text-sm hover:bg-white/60 transition-colors">
                            <Calendar size={16} />
                            <span>Last {timeRange} days</span>
                            <ChevronDown size={14} />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#262626] border border-border rounded-xl shadow-xl hidden group-hover:block overflow-hidden z-20">
                            {[7, 14, 30, 90].map(days => (
                                <button
                                    key={days}
                                    onClick={() => handleRangeChange(days.toString())}
                                    className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-white/10 transition-colors border-b border-border last:border-0"
                                >
                                    Last {days} days
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <nav className="bg-transparent px-6 py-4 flex gap-2 relative z-20">
                <div className="relative">
                    <button
                        onClick={() => setIsInsightsOpen(!isInsightsOpen)}
                        className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${activeTab === 'insights' ? 'bg-black text-white dark:bg-white dark:text-black border-transparent' : 'bg-transparent text-black dark:text-white border-gray-300 dark:border-gray-700'}`}
                    >
                        Insights
                        <ChevronDown size={14} className={`transition-transform duration-200 ${isInsightsOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Insights Dropdown */}
                    {isInsightsOpen && (
                        <div className="absolute top-full left-0 mt-2 w-40 bg-white dark:bg-[#262626] rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200">
                            <button
                                onClick={() => handleTabChange('insights', 'account')}
                                className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${subTab === 'account' && activeTab === 'insights' ? 'font-bold text-black dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
                            >
                                Account
                            </button>
                            <button
                                onClick={() => handleTabChange('insights', 'content')}
                                className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${subTab === 'content' && activeTab === 'insights' ? 'font-bold text-black dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
                            >
                                Content
                            </button>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => handleTabChange('ad-tools')}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${activeTab === 'ad-tools' ? 'bg-black text-white dark:bg-white dark:text-black border-transparent' : 'bg-transparent text-black dark:text-white border-gray-300 dark:border-gray-700'}`}
                >
                    Ad tools
                </button>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Click outside listener to close dropdown */}
                    {isInsightsOpen && (
                        <div className="fixed inset-0 z-10 bg-transparent" onClick={() => setIsInsightsOpen(false)} />
                    )}

                    {activeTab === 'insights' && subTab === 'account' && <AccountInsightsTab range={timeRange} />}
                    {activeTab === 'insights' && subTab === 'content' && <ContentInsightsTab range={timeRange} />}
                    {activeTab === 'ad-tools' && <AdToolsTab />}
                </div>
            </main>
        </div>
    );
};

export default ProfessionalDashboard;
