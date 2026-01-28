import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, Trash2, MessageSquare, AlertTriangle, Filter } from 'lucide-react';

const CommentModeration = () => {
    const [filter, setFilter] = useState('pending'); // pending, all, flagged

    // Mock Data for Comments
    const comments = [
        { id: 1, user: '@john_doe', content: 'This is a spam comment! Click here for free money.', post: '#98214 - Summer Vibes', date: '2 mins ago', status: 'flagged', sentiment: 'negative' },
        { id: 2, user: '@sarah_smith', content: 'You look amazing! ❤️', post: '#98215 - Selfie', date: '5 mins ago', status: 'pending', sentiment: 'positive' },
        { id: 3, user: '@bot_user_99', content: 'Follow for follow? I unfloow fast.', post: '#98214 - Summer Vibes', date: '12 mins ago', status: 'flagged', sentiment: 'neutral' },
        { id: 4, user: '@mike_tyson', content: 'I disagree with this opinion, but nice photo.', post: '#98216 - Politics', date: '15 mins ago', status: 'pending', sentiment: 'neutral' },
        { id: 5, user: '@hater_101', content: 'This is the worst content I have ever seen.', post: '#98215 - Selfie', date: '21 mins ago', status: 'flagged', sentiment: 'negative' },
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case 'flagged':
                return <span className="px-2 py-1 bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-md text-xs font-semibold flex items-center gap-1"><AlertTriangle size={12} /> Flagged</span>;
            case 'pending':
                return <span className="px-2 py-1 bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400 rounded-md text-xs font-semibold">Pending</span>;
            default:
                return <span className="px-2 py-1 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 rounded-md text-xs font-semibold">Neutral</span>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Comment Moderation</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Review and action reported comments</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="glass-panel p-1 rounded-xl flex gap-1 bg-gray-200/50 dark:bg-white/5">
                        {['pending', 'flagged', 'all'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${filter === f ? 'bg-white dark:bg-white/20 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider w-1/4">User & Post</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider w-1/3">Comment Content</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                            {comments.filter(c => filter === 'all' || c.status === filter).map((comment) => (
                                <tr key={comment.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm text-gray-800 dark:text-white">{comment.user}</span>
                                            <span className="text-xs text-blue-500 hover:underline cursor-pointer">{comment.post}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-black/20 p-2 rounded-lg border border-gray-100 dark:border-white/5">
                                            "{comment.content}"
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(comment.status)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {comment.date}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button title="Approve" className="p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400 transition-colors">
                                                <CheckCircle size={18} />
                                            </button>
                                            <button title="Reject & Remove" className="p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 text-orange-600 dark:text-orange-400 transition-colors">
                                                <XCircle size={18} />
                                            </button>
                                            <button title="Ban User" className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CommentModeration;
