import React from 'react';
import { AlertTriangle, Check, X, ExternalLink } from 'lucide-react';

const ReportItem = () => (
    <div className="glass-panel p-4 rounded-xl flex flex-col md:flex-row md:items-center gap-4 transition-all hover:bg-black/5 dark:hover:bg-white/5 border-l-4 border-l-red-500">
        <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
                <span className="bg-red-500/10 text-red-600 dark:text-red-300 text-xs px-2 py-0.5 rounded-full border border-red-500/20">Harassment</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">• 2 hrs ago</span>
            </div>
            <p className="text-gray-800 dark:text-white text-sm mb-1">Reported User: <span className="font-bold">@bad_actor</span></p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">"This user keeps sending abusive messages in DMs..."</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-2 md:mt-0">
            <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-colors text-xs font-medium border border-gray-200 dark:border-white/10">
                <ExternalLink size={14} /> View Content
            </button>
            <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-300 transition-colors text-xs font-medium border border-green-500/20">
                <Check size={14} /> Ignore
            </button>
            <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-300 transition-colors text-xs font-medium border border-red-500/20">
                <X size={14} /> Ban User
            </button>
        </div>
    </div>
);

const Reports = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Reports Center</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card p-6 rounded-xl border-l-4 border-l-red-500">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Pending Reports</h3>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">42</p>
                </div>
                <div className="glass-card p-6 rounded-xl border-l-4 border-l-yellow-500">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Under Review</h3>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">15</p>
                </div>
                <div className="glass-card p-6 rounded-xl border-l-4 border-l-green-500">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Resolved Today</h3>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">128</p>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Latest Reports</h2>
                {[1, 2, 3, 4, 5].map(item => <ReportItem key={item} />)}
            </div>
        </div>
    );
};

export default Reports;
