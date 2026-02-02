import React, { useState, useEffect } from 'react';
import { Search, Shield, Eye, AlertTriangle, X, MessageSquare, Loader2, CheckCircle } from 'lucide-react';
import * as adminApi from '../../api/adminApi';

const DMOversight = () => {
    const [conversations, setConversations] = useState([]);
    const [stats, setStats] = useState({ highRisk: 0, underInvestigation: 0, safeCleared: 0 });
    const [loading, setLoading] = useState(true);
    const [statsLoading, setStatsLoading] = useState(true);
    const [selectedTranscript, setSelectedTranscript] = useState(null);
    const [transcriptLoading, setTranscriptLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [filter, setFilter] = useState({ risk: 'all', status: 'flagged' });
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    useEffect(() => {
        fetchConversations();
    }, [filter]);

    const showMessage = (msg, type = 'success') => {
        setMessage({ text: msg, type });
        setTimeout(() => setMessage(null), 3000);
    };

    const fetchStats = async () => {
        try {
            setStatsLoading(true);
            const res = await adminApi.getDMOversightStats();
            if (res.success) setStats(res.data);
        } catch (error) {
            console.error('Error fetching DM stats:', error);
        } finally {
            setStatsLoading(false);
        }
    };

    const fetchConversations = async () => {
        try {
            setLoading(true);
            const res = await adminApi.getDMFlaggedConversations(filter);
            if (res.success) setConversations(res.data);
        } catch (error) {
            console.error('Error fetching DM conversations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReviewTranscript = async (conversationId) => {
        try {
            setTranscriptLoading(true);
            const res = await adminApi.getDMTranscript(conversationId);
            if (res.success) {
                // Fetch user data for transcript if needed (partly done by backend enrichment)
                // But transcript messages also need user labels. 
                // We'll use the enriched userA/userB from the list if available.
                const convo = conversations.find(c => c.conversationId === conversationId);
                setSelectedTranscript({ ...res.data, userA: convo?.userA, userB: convo?.userB });
            }
        } catch (error) {
            showMessage('Failed to load transcript', 'error');
        } finally {
            setTranscriptLoading(false);
        }
    };

    const handleMarkSafe = async (id) => {
        try {
            setActionLoading(true);
            const res = await adminApi.markDMConversationSafe(id);
            if (res.success) {
                showMessage('Conversation marked safe');
                setSelectedTranscript(null);
                fetchStats();
                fetchConversations();
            }
        } catch (error) {
            showMessage('Action failed', 'error');
        } finally {
            setActionLoading(false);
        }
    };

    const handleBanUsers = async (id) => {
        if (!confirm('Are you sure you want to ban BOTH users in this conversation?')) return;
        try {
            setActionLoading(true);
            const res = await adminApi.banDMConversationUsers(id);
            if (res.success) {
                showMessage('Users banned and conversation closed');
                setSelectedTranscript(null);
                fetchStats();
                fetchConversations();
            }
        } catch (error) {
            showMessage('Failed to ban users', 'error');
        } finally {
            setActionLoading(false);
        }
    };

    const getRiskBadge = (level) => {
        const colors = {
            high: 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400',
            medium: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400',
            low: 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400'
        };
        return (
            <span className={`px-2 py-0.5 rounded-full ${colors[level] || 'bg-gray-100'} text-xs font-bold flex items-center gap-1`}>
                <AlertTriangle size={10} /> {level?.toUpperCase() || 'LOW'} Risk
            </span>
        );
    };

    return (
        <div className="space-y-6 relative">
            {/* Message Toast */}
            {message && (
                <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-2xl transition-all animate-in fade-in slide-in-from-top-4 ${message.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                    {message.text}
                </div>
            )}

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
                    <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
                        {statsLoading ? '...' : stats.highRisk}
                    </p>
                </div>
                <div className="glass-card p-6 rounded-xl border-l-4 border-l-yellow-500">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Under Investigation</h3>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
                        {statsLoading ? '...' : stats.underInvestigation}
                    </p>
                </div>
                <div className="glass-card p-6 rounded-xl border-l-4 border-l-green-500">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Safe (AI Cleared)</h3>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
                        {statsLoading ? '...' : stats.safeCleared.toLocaleString()}
                    </p>
                </div>
            </div>

            <div className="glass-panel rounded-2xl overflow-hidden p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Flagged Conversations</h3>
                    <div className="flex gap-2">
                        <select
                            value={filter.risk}
                            onChange={(e) => setFilter({ ...filter, risk: e.target.value })}
                            className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-300"
                        >
                            <option value="all">All Risk</option>
                            <option value="high">High Risk</option>
                            <option value="medium">Medium Risk</option>
                            <option value="low">Low Risk</option>
                        </select>
                        <select
                            value={filter.status}
                            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                            className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-300"
                        >
                            <option value="all">All Status</option>
                            <option value="flagged">Flagged</option>
                            <option value="investigating">Investigating</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-4">
                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center text-gray-500 gap-3">
                            <Loader2 className="animate-spin text-violet-500" size={32} />
                            <span>Loading conversations...</span>
                        </div>
                    ) : conversations.length > 0 ? (
                        conversations.map((convo) => (
                            <div key={convo.conversationId} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5 hover:border-violet-500/30 transition-all">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="flex -space-x-2">
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${convo.userA?.username || 'A'}&background=random`}
                                                className="w-8 h-8 rounded-full border-2 border-white dark:border-black"
                                                alt="User A"
                                            />
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${convo.userB?.username || 'B'}&background=random`}
                                                className="w-8 h-8 rounded-full border-2 border-white dark:border-black"
                                                alt="User B"
                                            />
                                        </div>
                                        <span className="font-semibold text-sm text-gray-800 dark:text-white">
                                            @{convo.userA?.username} & @{convo.userB?.username}
                                        </span>
                                        {getRiskBadge(convo.riskLevel)}
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">"{convo.lastMessagePreview || 'No messages yet'}"</p>
                                </div>

                                <div className="flex flex-col items-end gap-2 mt-4 md:mt-0 min-w-[140px]">
                                    <div className="text-right">
                                        <span className="text-xs text-gray-400">Risk Score</span>
                                        <div className="w-32 bg-gray-200 dark:bg-white/10 rounded-full h-2 mt-1">
                                            <div
                                                className={`h-2 rounded-full ${convo.riskScore > 80 ? 'bg-red-500' : convo.riskScore > 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                                style={{ width: `${convo.riskScore}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleReviewTranscript(convo.conversationId)}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-xs font-bold hover:bg-violet-200 dark:hover:bg-violet-900/40 transition-colors"
                                    >
                                        <Eye size={14} /> Review Transcript
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-12 text-center text-gray-500">
                            No high-risk conversations found.
                        </div>
                    )}
                </div>
            </div>

            {/* Transcript Modal */}
            {selectedTranscript && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
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

                        <div className="p-6 bg-gray-50 dark:bg-black/20 max-h-[60vh] overflow-y-auto space-y-4 scrollbar-hide">
                            <div className="text-center text-xs text-gray-500 mb-4">
                                Risk Score: {selectedTranscript.riskScore} • {selectedTranscript.aiFlags.length} Flags
                            </div>

                            {selectedTranscript.messages.map((msg, i) => {
                                const isSenderA = msg.senderId === selectedTranscript.userA?.userId;
                                return (
                                    <div key={i} className={`flex flex-col ${isSenderA ? 'items-start' : 'items-end'}`}>
                                        <span className="text-[10px] text-gray-400 mb-1 px-2">
                                            {isSenderA ? selectedTranscript.userA?.username : selectedTranscript.userB?.username}
                                        </span>
                                        <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${isSenderA
                                                ? 'bg-white dark:bg-white/10 border border-gray-200 dark:border-white/5 text-gray-700 dark:text-gray-200 rounded-tl-none'
                                                : 'bg-violet-500 text-white rounded-tr-none shadow-md shadow-violet-500/10'
                                            } ${msg.flagged ? 'border-2 border-red-500' : ''}`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                );
                            })}

                            {selectedTranscript.aiFlags.length > 0 && (
                                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-500/20 rounded-lg">
                                    <p className="text-xs text-red-600 dark:text-red-400 font-semibold mb-1 flex items-center gap-1.5">
                                        <AlertTriangle size={12} /> AI Content Flags:
                                    </p>
                                    <ul className="text-[11px] text-red-500 list-disc list-inside">
                                        {selectedTranscript.aiFlags.map((flag, idx) => <li key={idx}>{flag}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-gray-100 dark:border-white/10 flex gap-3">
                            <button
                                onClick={() => handleMarkSafe(selectedTranscript.conversationId)}
                                disabled={actionLoading}
                                className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                            >
                                {actionLoading ? <Loader2 className="animate-spin" size={16} /> : <><CheckCircle size={16} /> Mark Safe</>}
                            </button>
                            <button
                                onClick={() => handleBanUsers(selectedTranscript.conversationId)}
                                disabled={actionLoading}
                                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all flex items-center justify-center gap-2"
                            >
                                {actionLoading ? <Loader2 className="animate-spin" size={16} /> : <><X size={16} /> Ban Users</>}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DMOversight;
