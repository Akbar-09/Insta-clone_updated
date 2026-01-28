import React, { useState } from 'react';
import { Search, Shield, Eye, AlertTriangle, X, MessageSquare } from 'lucide-react';

const DMOversight = () => {
    // Mock Data for DMs
    const conversations = [
        { id: 1, users: ['@alice_wonder', '@crypto_king'], lastMsg: 'Send me your wallet details for 500% returns.', riskScore: 92, status: 'high_risk', date: '10 mins ago', transcript: ['Hey', 'Hi', 'Send me your wallet details for 500% returns.', 'Is this safe?', 'Yes, totally safe.'] },
        { id: 2, users: ['@teen_user1', '@stranger_danger'], lastMsg: 'Where do you go to school?', riskScore: 85, status: 'high_risk', date: '25 mins ago', transcript: ['Hello', 'Hi there', 'How old are you?', '15', 'Where do you go to school?'] },
        { id: 3, users: ['@seller_123', '@buyer_abc'], lastMsg: 'I accept payment outside the platform only.', riskScore: 65, status: 'needs_review', date: '1 hour ago', transcript: ['How much?', '$50', 'I accept payment outside the platform only.', 'Okay'] },
        { id: 4, users: ['@john_doe', '@jane_doe'], lastMsg: 'Hey, are you coming to the party tonight?', riskScore: 12, status: 'safe', date: '2 hours ago', transcript: ['Hey, are you coming to the party tonight?', 'Yeah, see you there!', 'Cool.'] },
    ];

    const [selectedTranscript, setSelectedTranscript] = useState(null);

    return (
        <div className="space-y-6 relative">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>Moderation</span>
                    <span>•</span>
                    <span className="text-gray-700 dark:text-gray-200">DM Oversight</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <Shield className="text-violet-500" /> Direct Message Oversight
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Monitor high-risk conversations flagged by AI for user safety.
                </p>
            </div>

            {/* Risk Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 rounded-xl border-l-4 border-l-red-500">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">High Risk Threads</h3>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">12</p>
                </div>
                <div className="glass-card p-6 rounded-xl border-l-4 border-l-yellow-500">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Under Investigation</h3>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">45</p>
                </div>
                <div className="glass-card p-6 rounded-xl border-l-4 border-l-green-500">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Safe (AI Cleared)</h3>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">1,204</p>
                </div>
            </div>

            <div className="glass-panel rounded-2xl overflow-hidden p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Flagged Conversations</h3>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {conversations.map((convo) => (
                        <div key={convo.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5 hover:border-violet-500/30 transition-all">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="flex -space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xs font-bold ring-2 ring-white dark:ring-black">A</div>
                                        <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-xs font-bold ring-2 ring-white dark:ring-black">B</div>
                                    </div>
                                    <span className="font-semibold text-sm text-gray-800 dark:text-white">
                                        {convo.users.join(' & ')}
                                    </span>
                                    {convo.status === 'high_risk' && (
                                        <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400 text-xs font-bold flex items-center gap-1">
                                            <AlertTriangle size={10} /> High Risk
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 italic">"{convo.lastMsg}"</p>
                            </div>

                            <div className="flex flex-col items-end gap-2 mt-4 md:mt-0 min-w-[140px]">
                                <div className="text-right">
                                    <span className="text-xs text-gray-400">Risk Score</span>
                                    <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-2 w-32 mt-1">
                                        <div
                                            className={`h-2 rounded-full ${convo.riskScore > 80 ? 'bg-red-500' : convo.riskScore > 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                            style={{ width: `${convo.riskScore}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedTranscript(convo)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-xs font-bold hover:bg-violet-200 dark:hover:bg-violet-900/40 transition-colors"
                                >
                                    <Eye size={14} /> Review Transcript
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Transcript Modal */}
            {selectedTranscript && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedTranscript(null)}></div>
                    <div className="relative bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/10">
                            <h3 className="font-bold text-lg text-gray-800 dark:text-white flex items-center gap-2">
                                <MessageSquare size={18} /> Transcript Review
                            </h3>
                            <button onClick={() => setSelectedTranscript(null)} className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6 bg-gray-50 dark:bg-black/20 max-h-[60vh] overflow-y-auto space-y-4">
                            <div className="text-center text-xs text-gray-500 mb-4">
                                Chat started {selectedTranscript.date} • Risk Score: {selectedTranscript.riskScore}
                            </div>

                            {selectedTranscript.transcript.map((msg, i) => (
                                <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${i % 2 === 0
                                            ? 'bg-white dark:bg-white/10 border border-gray-200 dark:border-white/5 text-gray-700 dark:text-gray-200 rounded-tl-sm'
                                            : 'bg-violet-500 text-white rounded-tr-sm'
                                        }`}>
                                        {msg}
                                    </div>
                                </div>
                            ))}

                            {selectedTranscript.status === 'high_risk' && (
                                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-500/20 rounded-lg">
                                    <p className="text-xs text-red-600 dark:text-red-400 font-semibold flex items-center gap-1.5">
                                        <AlertTriangle size={12} /> AI Flag: High financial risk detected.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-gray-100 dark:border-white/10 flex gap-3">
                            <button className="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                                Mark Safe
                            </button>
                            <button className="flex-1 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all">
                                Ban Users
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DMOversight;
