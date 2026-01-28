import React, { useState } from 'react';
import { AlertTriangle, Check, X, ExternalLink } from 'lucide-react';

const ReportModal = ({ report, onClose }) => {
    if (!report) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/10">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">Reported Content</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                <div className="flex flex-col md:flex-row">
                    {/* Mock Content Media */}
                    <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-gray-100 dark:bg-black/50 relative group">
                        <img
                            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80"
                            alt="Reported content"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                            <span className="bg-red-500/90 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-md">
                                Offensive
                            </span>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="w-full md:w-1/2 p-6 flex flex-col h-full">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                    <img src="https://ui-avatars.com/api/?name=bad+actor&background=random" alt="user" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-white">@bad_actor</h4>
                                    <p className="text-xs text-gray-500">Reported User</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-500/10">
                                    <span className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">Reason</span>
                                    <p className="text-sm text-gray-800 dark:text-gray-200 mt-1">Harassment & Bullying</p>
                                </div>

                                <div>
                                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</span>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 bg-gray-50 dark:bg-white/5 p-3 rounded-lg">
                                        "This user keeps sending abusive messages in DMs and commenting inappropriate things on my posts."
                                    </p>
                                </div>

                                <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100 dark:border-white/5">
                                    <span>Report ID: #98234</span>
                                    <span>2 hours ago</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-3">
                            <button className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-medium text-sm hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                                Ignore
                            </button>
                            <button className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-medium text-sm hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all">
                                Ban User
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ReportItem = ({ onView }) => (
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
            <button
                onClick={onView}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-colors text-xs font-medium border border-gray-200 dark:border-white/10"
            >
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
    const [selectedReport, setSelectedReport] = useState(null);

    return (
        <div className="space-y-6">
            <ReportModal report={selectedReport} onClose={() => setSelectedReport(null)} />
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
                {[1, 2, 3, 4, 5].map(item => <ReportItem key={item} onView={() => setSelectedReport(item)} />)}
            </div>
        </div>
    );
};

export default Reports;
