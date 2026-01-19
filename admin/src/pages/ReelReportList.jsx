import React, { useState } from 'react';
import { Trash2, Eye } from 'lucide-react';

const ReelReportList = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const [reports, setReports] = useState([
        { id: 1, createdDate: 'January 16, 2026', createdTime: '05:30 pm', reportedReel: 'https://images.unsplash.com/photo-1682687221073-6a0f49d6f9bb?w=400', reportedUser: 'oliviagreen', reportedEmail: 'olivia@admin.com', reason: 'Dangerous acts', reportedBy: 'tomharris', reporterEmail: 'tom@admin.com', accountStatus: 'active' },
        { id: 2, createdDate: 'January 15, 2026', createdTime: '01:15 pm', reportedReel: 'https://images.unsplash.com/photo-1682687220923-c58b9a4592ae?w=400', reportedUser: 'danielking', reportedEmail: 'daniel@admin.com', reason: 'Bullying or harassment', reportedBy: 'rachelsmith', reporterEmail: 'rachel@admin.com', accountStatus: 'active' },
        { id: 3, createdDate: 'January 14, 2026', createdTime: '10:45 am', reportedReel: 'https://images.unsplash.com/photo-1682687220801-eef408f95d71?w=400', reportedUser: 'sophiamiller', reportedEmail: 'sophia@admin.com', reason: 'False information', reportedBy: 'chriswilson', reporterEmail: 'chris@admin.com', accountStatus: 'active' },
        { id: 4, createdDate: 'January 13, 2026', createdTime: '08:20 am', reportedReel: 'https://images.unsplash.com/photo-1682687220199-d0124f48f95b?w=400', reportedUser: 'noahdavis', reportedEmail: 'noah@admin.com', reason: 'Nudity or sexual activity', reportedBy: 'emmajones', reporterEmail: 'emma@admin.com', accountStatus: 'active' },
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
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Reel Report List</h1>
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
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">REEL THUMBNAIL</th>
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
                                            src={report.reportedReel}
                                            alt="Reported reel"
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
                                                title="View Reel"
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
                    <p className="text-sm text-gray-500">There are no reel reports matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default ReelReportList;
