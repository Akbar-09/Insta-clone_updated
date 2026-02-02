import React, { useState, useEffect } from 'react';
import { AlertTriangle, Check, X, ExternalLink, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import * as adminApi from '../../api/adminApi';

const ReportModal = ({ reportId, onClose, onAction }) => {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (reportId) fetchDetails();
    }, [reportId]);

    const fetchDetails = async () => {
        try {
            setLoading(true);
            const res = await adminApi.getReportById(reportId);
            if (res.success) setReport(res.data);
        } catch (error) {
            console.error('Error fetching report details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!reportId) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                {loading ? (
                    <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-pink-500" size={40} /></div>
                ) : report ? (
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-gray-100 dark:bg-black/50 relative group">
                            {report.content?.mediaUrl ? (
                                <img
                                    src={report.content.mediaUrl.startsWith('http') ? report.content.mediaUrl : `http://localhost:5000/uploads/${report.content.mediaUrl}`}
                                    alt="Reported content"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">No Media</div>
                            )}
                            <div className="absolute top-2 right-2 flex gap-1">
                                <span className="bg-red-500/90 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-md lowercase first-letter:uppercase">
                                    {report.content_type}
                                </span>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 p-6 flex flex-col h-full">
                            <div className="flex-1">
                                <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                                    <X size={20} className="text-gray-500" />
                                </button>

                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                        <img
                                            src={report.reportedUser?.profilePicture
                                                ? (report.reportedUser.profilePicture.startsWith('http') ? report.reportedUser.profilePicture : `http://localhost:5000/uploads/${report.reportedUser.profilePicture}`)
                                                : `https://ui-avatars.com/api/?name=${report.reportedUser?.username || 'user'}&background=random`}
                                            alt="user" className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 dark:text-white">@{report.reportedUser?.username || 'Unknown'}</h4>
                                        <p className="text-xs text-gray-500">Reported User</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-500/10">
                                        <span className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">Reason</span>
                                        <p className="text-sm text-gray-800 dark:text-gray-200 mt-1">{report.reason}</p>
                                    </div>

                                    <div>
                                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</span>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 bg-gray-50 dark:bg-white/5 p-3 rounded-lg">
                                            {report.description || "No description provided."}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100 dark:border-white/5">
                                        <span>Report ID: {report.id.substring(0, 8)}...</span>
                                        <span>{new Date(report.created_at).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-3">
                                <button
                                    onClick={() => onAction('ignore', report.id)}
                                    className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-medium text-sm hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                                >
                                    Ignore
                                </button>
                                <button
                                    onClick={() => onAction('ban', report.id)}
                                    className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-medium text-sm hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all"
                                >
                                    Ban User
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-10 text-center text-gray-500">Failed to load content</div>
                )}
            </div>
        </div>
    );
};

const ReportItem = ({ report, onView, onAction }) => (
    <div className={`glass-panel p-4 rounded-xl flex flex-col md:flex-row md:items-center gap-4 transition-all hover:bg-black/5 dark:hover:bg-white/5 border-l-4 ${report.status === 'pending' ? 'border-l-red-500' : report.status === 'review' ? 'border-l-yellow-500' : 'border-l-green-500 opacity-60'}`}>
        <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs px-2 py-0.5 rounded-full border ${report.status === 'pending' ? 'bg-red-500/10 text-red-600 border-red-500/20' : 'bg-gray-500/10 text-gray-600 border-gray-500/20'}`}>
                    {report.reason}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">• {new Date(report.created_at).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-800 dark:text-white text-sm mb-1">Reported User: <span className="font-bold">@{report.reportedUsername}</span></p>
            <p className="text-gray-600 dark:text-gray-300 text-sm truncate max-w-md">"{report.description || 'No description'}"</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-2 md:mt-0">
            <button
                onClick={() => onView(report.id)}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-colors text-xs font-medium border border-gray-200 dark:border-white/10"
            >
                <ExternalLink size={14} /> View Content
            </button>
            {report.status !== 'resolved' && (
                <>
                    <button
                        onClick={() => onAction('ignore', report.id)}
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-300 transition-colors text-xs font-medium border border-green-500/20"
                    >
                        <Check size={14} /> Ignore
                    </button>
                    <button
                        onClick={() => onAction('ban', report.id)}
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-300 transition-colors text-xs font-medium border border-red-500/20"
                    >
                        <X size={14} /> Ban User
                    </button>
                </>
            )}
        </div>
    </div>
);

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [stats, setStats] = useState({ pending: 0, underReview: 0, resolvedToday: 0 });
    const [loading, setLoading] = useState(true);
    const [selectedReportId, setSelectedReportId] = useState(null);
    const [filter, setFilter] = useState('pending');
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });

    useEffect(() => {
        fetchStats();
    }, []);

    useEffect(() => {
        fetchReports();
    }, [filter, pagination.page]);

    const fetchStats = async () => {
        try {
            const res = await adminApi.getReportStats();
            if (res.success) setStats(res.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const fetchReports = async () => {
        try {
            setLoading(true);
            const res = await adminApi.listReports({
                status: filter,
                page: pagination.page,
                limit: pagination.limit
            });
            if (res.success) {
                setReports(res.data);
                setPagination(prev => ({
                    ...prev,
                    total: res.pagination?.total || 0,
                    totalPages: res.pagination?.totalPages || 1
                }));
            }
        } catch (error) {
            console.error('Error fetching reports:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (action, id) => {
        try {
            let res;
            if (action === 'ignore') res = await adminApi.ignoreReport(id);
            if (action === 'ban') res = await adminApi.banUserFromReport(id);

            if (res.success) {
                setSelectedReportId(null);
                fetchReports();
                fetchStats();
            }
        } catch (error) {
            alert('Action failed');
        }
    };

    return (
        <div className="space-y-6">
            <ReportModal
                reportId={selectedReportId}
                onClose={() => setSelectedReportId(null)}
                onAction={handleAction}
            />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Reports Center</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card p-6 rounded-xl border-l-4 border-l-red-500">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Pending Reports</h3>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{stats.pending}</p>
                </div>
                <div className="glass-card p-6 rounded-xl border-l-4 border-l-yellow-500">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Under Review</h3>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{stats.underReview}</p>
                </div>
                <div className="glass-card p-6 rounded-xl border-l-4 border-l-green-500">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Resolved Today</h3>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{stats.resolvedToday}</p>
                </div>
            </div>

            <div className="flex gap-2 mb-4">
                {['pending', 'review', 'resolved'].map(s => (
                    <button
                        key={s}
                        onClick={() => { setFilter(s); setPagination(p => ({ ...p, page: 1 })); }}
                        className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${filter === s ? 'bg-pink-500 text-white shadow-lg' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300'}`}
                    >
                        {s}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Latest Reports</h2>
                {loading ? (
                    <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-pink-500" /></div>
                ) : reports.length > 0 ? (
                    <>
                        {reports.map(report => (
                            <ReportItem
                                key={report.id}
                                report={report}
                                onView={setSelectedReportId}
                                onAction={handleAction}
                            />
                        ))}

                        {pagination.totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-8">
                                <button
                                    disabled={pagination.page === 1}
                                    onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                                    className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 disabled:opacity-50"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <span className="text-sm font-medium">
                                    Page {pagination.page} of {pagination.totalPages}
                                </span>
                                <button
                                    disabled={pagination.page >= pagination.totalPages}
                                    onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
                                    className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 disabled:opacity-50"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="p-10 text-center text-gray-500 bg-gray-50 dark:bg-white/5 rounded-2xl">
                        No reports found for this status.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reports;
