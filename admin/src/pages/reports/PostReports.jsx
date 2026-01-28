import React, { useState } from 'react';
import { Trash2, Eye } from 'lucide-react';

const PostReportList = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const [reports, setReports] = useState([
        { id: 1, createdDate: 'January 15, 2026', createdTime: '03:45 pm', reportedPost: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400', reportedUser: 'johnbrook', reportedEmail: 'john@admin.com', reason: 'Spam or misleading', reportedBy: 'sarahwilson', reporterEmail: 'sarah@admin.com', accountStatus: 'active' },
        { id: 2, createdDate: 'January 14, 2026', createdTime: '11:20 am', reportedPost: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=400', reportedUser: 'mikejohnson', reportedEmail: 'mike@admin.com', reason: 'Inappropriate content', reportedBy: 'emilydavis', reporterEmail: 'emily@admin.com', accountStatus: 'active' },
        { id: 3, createdDate: 'January 13, 2026', createdTime: '09:15 am', reportedPost: 'https://images.unsplash.com/photo-1682687221038-404cb8830901?w=400', reportedUser: 'alexbrown', reportedEmail: 'alex@admin.com', reason: 'Violence or dangerous', reportedBy: 'jamesdeep', reporterEmail: 'james@admin.com', accountStatus: 'active' },
        { id: 4, createdDate: 'January 12, 2026', createdTime: '02:30 pm', reportedPost: 'https://images.unsplash.com/photo-1682687220067-dced9a881b56?w=400', reportedUser: 'lisawhite', reportedEmail: 'lisa@admin.com', reason: 'Hate speech', reportedBy: 'davidlee', reporterEmail: 'david@admin.com', accountStatus: 'active' },
    ]);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this report?')) {
            setReports(reports.filter(report => report.id !== id));
        }
    };

    const filteredReports = reports.filter(report =>
        report.reportedUser.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Post Report List</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Dashboard • Report List</p>
                </div>

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search by reported username..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                />
            </div>

            {/* Table */}
            <div className="glass-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">S.L</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">CREATED DATE/TIME</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">POST IMAGE</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">REPORTED USER</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">REASON</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">REPORTED BY</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">ACCOUNT STATUS</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                            {filteredReports.map((report, index) => (
                                <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-gray-800 dark:text-white">{index + 1}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-800 dark:text-white">{report.createdDate}</p>
                                            <p className="text-xs text-gray-500">{report.createdTime}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <img
                                            src={report.reportedPost}
                                            alt="Reported post"
                                            className="w-12 h-12 rounded-lg object-cover"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold text-xs">
                                                {report.reportedUser[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm text-gray-800 dark:text-white">{report.reportedUser}</p>
                                                <p className="text-xs text-gray-500">{report.reportedEmail}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600 dark:text-gray-300">{report.reason}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
                                                {report.reportedBy[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm text-gray-800 dark:text-white">{report.reportedBy}</p>
                                                <p className="text-xs text-gray-500">{report.reporterEmail}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                                            {report.accountStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 transition-colors"
                                                title="View Post"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(report.id)}
                                                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {filteredReports.length === 0 && (
                <div className="glass-card p-12 rounded-2xl text-center">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">No Reports Found</h3>
                    <p className="text-sm text-gray-500">There are no post reports matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default PostReportList;
