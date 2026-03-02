import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronRight, ArrowLeft, Mic, MessageSquareOff, Shield, UsersRound, Ban, Trash2, Plus, Volume2, VolumeX } from 'lucide-react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const LiveSettingsPanel = ({ isOpen, onClose, streamId }) => {
    const [page, setPage] = useState('main'); // main, comments, moderators, muted, blocked
    const [settings, setSettings] = useState({ comments_enabled: true, filter_spam: false });
    const [keywords, setKeywords] = useState([]);
    const [moderators, setModerators] = useState([]);
    const [muted, setMuted] = useState([]);
    const [blocked, setBlocked] = useState([]);
    const [newKeyword, setNewKeyword] = useState('');
    const [hearVoice, setHearVoice] = useState(false);

    const audioContextRef = useRef(null);
    const mediaStreamRef = useRef(null);
    const audioSourceRef = useRef(null);
    const audioDestinationRef = useRef(null);

    useEffect(() => {
        if (!isOpen) {
            setPage('main');
            return;
        }
        fetchSettings();
    }, [isOpen]);

    // Handle "Hear Your Voice"
    useEffect(() => {
        const toggleLoopback = async () => {
            if (hearVoice) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    mediaStreamRef.current = stream;
                    const ctx = new (window.AudioContext || window.webkitAudioContext)();
                    audioContextRef.current = ctx;

                    audioSourceRef.current = ctx.createMediaStreamSource(stream);
                    audioDestinationRef.current = ctx.destination;
                    audioSourceRef.current.connect(audioDestinationRef.current);
                } catch (err) {
                    console.error("Failed to start loopback", err);
                    setHearVoice(false);
                }
            } else {
                if (mediaStreamRef.current) {
                    mediaStreamRef.current.getTracks().forEach(t => t.stop());
                }
                if (audioContextRef.current) {
                    audioContextRef.current.close();
                }
                mediaStreamRef.current = null;
                audioContextRef.current = null;
            }
        };
        toggleLoopback();

        return () => {
            if (mediaStreamRef.current) mediaStreamRef.current.getTracks().forEach(t => t.stop());
            if (audioContextRef.current) audioContextRef.current.close();
        };
    }, [hearVoice]);

    const getHeaders = () => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        return {
            headers: {
                Authorization: `Bearer ${token}`,
                'x-user-id': user?.id,
                'x-user-username': user?.username
            }
        };
    };

    const fetchSettings = async () => {
        try {
            const res = await axios.get(`${API_BASE}/live/${streamId}/settings`, getHeaders());
            const data = res.data.data;
            if (data.settings) setSettings(data.settings);
            if (data.keywords) setKeywords(data.keywords);
            if (data.moderators) setModerators(data.moderators);
            if (data.muted) setMuted(data.muted);
            if (data.blocked) setBlocked(data.blocked);
        } catch (error) {
            console.error("Failed to fetch live settings", error);
        }
    };

    const updateSetting = async (key, value) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        try {
            await axios.patch(`${API_BASE}/live/${streamId}/settings`, { [key]: value }, getHeaders());
        } catch (error) {
            console.error(error);
            // Revert on fail
            setSettings(settings);
        }
    };

    const addKeyword = async (e) => {
        e.preventDefault();
        if (!newKeyword.trim()) return;
        try {
            const res = await axios.post(`${API_BASE}/live/${streamId}/keyword`, { keyword: newKeyword }, getHeaders());
            setKeywords([...keywords, res.data.data]);
            setNewKeyword('');
        } catch (error) {
            console.error(error);
        }
    };

    const removeKeyword = async (id) => {
        try {
            await axios.delete(`${API_BASE}/live/${streamId}/keyword/${id}`, getHeaders());
            setKeywords(keywords.filter(k => k.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // ----- PAGES -----
    const renderMainPage = () => (
        <div className="space-y-2 animate-in slide-in-from-right-4 duration-300">
            <h3 className="text-white/40 text-[10px] uppercase font-black tracking-widest px-4 pt-4 pb-2">Audio</h3>
            <div className="bg-gray-800/40 border border-white/5 rounded-2xl mx-4 overflow-hidden">
                <div className="flex items-center justify-between p-4 bg-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                            {hearVoice ? <Volume2 size={16} /> : <VolumeX size={16} />}
                        </div>
                        <div>
                            <p className="text-white text-sm font-bold">Hear Your Voice</p>
                            <p className="text-gray-400 text-[10px]">Monitor your microphone audio</p>
                        </div>
                    </div>
                    {/* Toggle Switch */}
                    <button
                        onClick={() => setHearVoice(!hearVoice)}
                        className={`w-10 h-6 rounded-full transition-colors relative ${hearVoice ? 'bg-pink-600' : 'bg-gray-600'}`}
                    >
                        <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${hearVoice ? 'left-5' : 'left-1'}`} />
                    </button>
                </div>
            </div>

            <h3 className="text-white/40 text-[10px] uppercase font-black tracking-widest px-4 pt-6 pb-2">Moderation</h3>
            <div className="bg-gray-800/40 border border-white/5 rounded-2xl mx-4 overflow-hidden divide-y divide-white/5">
                {[
                    { id: 'comments', icon: MessageSquareOff, label: 'Comment Settings', color: 'text-emerald-500', bg: 'bg-emerald-500/20' },
                    { id: 'muterules', icon: Shield, label: 'Mute rules', color: 'text-pink-500', bg: 'bg-pink-500/20' },
                    { id: 'moderators', icon: Shield, label: 'Moderators', color: 'text-violet-500', bg: 'bg-violet-500/20', count: moderators.length },
                    { id: 'muted', icon: UsersRound, label: 'Muted Accounts', color: 'text-orange-500', bg: 'bg-orange-500/20', count: muted.length },
                    { id: 'blocked', icon: Ban, label: 'Blocked Accounts', color: 'text-red-500', bg: 'bg-red-500/20', count: blocked.length }
                ].map(item => (
                    <button
                        key={item.id}
                        onClick={() => setPage(item.id)}
                        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors group"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center ${item.color}`}>
                                <item.icon size={16} />
                            </div>
                            <span className="text-white text-sm font-bold">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {item.count !== undefined && (
                                <span className="text-white/40 text-xs font-bold">{item.count}</span>
                            )}
                            <ChevronRight size={16} className="text-white/20 group-hover:text-white/60 transition" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderCommentsPage = () => (
        <div className="space-y-4 animate-in slide-in-from-right-4 duration-300 p-4">
            <div className="bg-gray-800/40 border border-white/5 rounded-2xl overflow-hidden p-4 flex items-center justify-between">
                <div>
                    <p className="text-white text-sm font-bold">Allow Comments</p>
                    <p className="text-gray-400 text-[10px]">Viewers can comment during live</p>
                </div>
                <button
                    onClick={() => updateSetting('comments_enabled', !settings.comments_enabled)}
                    className={`w-10 h-6 rounded-full transition-colors relative ${settings.comments_enabled ? 'bg-pink-600' : 'bg-gray-600'}`}
                >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${settings.comments_enabled ? 'left-5' : 'left-1'}`} />
                </button>
            </div>

            <div className="bg-gray-800/40 border border-white/5 rounded-2xl overflow-hidden pt-4 opacity-70">
                <div className="px-4 mb-2">
                    <p className="text-white text-sm font-bold">Filter Comments</p>
                    <p className="text-gray-400 text-[10px]">Automatically hide offensive comments</p>
                </div>
                <div className="divide-y divide-white/5 border-t border-white/5 mt-4">
                    <div className="flex justify-between items-center p-4">
                        <span className="text-white text-sm">Spam</span>
                        <button onClick={() => updateSetting('filter_spam', !settings.filter_spam)} className={`w-8 h-5 rounded-full relative ${settings.filter_spam ? 'bg-blue-500' : 'bg-gray-600'}`}>
                            <div className={`w-3 h-3 rounded-full bg-white absolute top-1 transition-transform ${settings.filter_spam ? 'left-4' : 'left-1'}`} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-gray-800/40 border border-white/5 rounded-2xl overflow-hidden p-4 flex flex-col gap-4">
                <div>
                    <p className="text-white text-sm font-bold">Blocked Keywords</p>
                    <p className="text-gray-400 text-[10px] mb-3">Hide comments containing these exact words</p>
                </div>
                <form onSubmit={addKeyword} className="flex gap-2">
                    <input
                        type="text"
                        value={newKeyword}
                        onChange={e => setNewKeyword(e.target.value)}
                        placeholder="Add word..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-pink-500/50"
                    />
                    <button type="submit" className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition">
                        <Plus size={18} />
                    </button>
                </form>

                <div className="flex flex-wrap gap-2 mt-2">
                    {keywords.length === 0 && <p className="text-gray-500 text-xs italic">No blocked keywords.</p>}
                    {keywords.map(kw => (
                        <div key={kw.id} className="bg-white/10 rounded-lg pl-3 pr-1 py-1 flex items-center gap-2 text-xs text-white">
                            <span>{kw.keyword}</span>
                            <button onClick={() => removeKeyword(kw.id)} className="p-1 hover:bg-white/20 rounded-md text-gray-400 hover:text-white transition">
                                <X size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderMuteRulesPage = () => (
        <div className="flex flex-col items-center p-8 h-full animate-in slide-in-from-right-4 duration-300 text-center mt-10">
            <Shield size={64} className="text-white/10 mb-6" strokeWidth={1.5} />
            <h3 className="text-white text-lg font-bold mb-2 tracking-tight">No mute rules yet</h3>
            <p className="text-[#a8a8a8] text-sm mb-10 mx-2">Automatically mute viewers who comment specific words, phrases, or emojis.</p>
            <button className="w-full bg-[#E11A86] hover:bg-[#c91778] text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <Plus size={20} />
                Add mute rule
            </button>
        </div>
    );

    const renderList = (data, emptyMessage) => (
        <div className="p-4 space-y-2 animate-in slide-in-from-right-4 duration-300">
            {data.length === 0 ? (
                <div className="text-center py-20 text-gray-500 text-sm">
                    {emptyMessage}
                </div>
            ) : (
                data.map(item => (
                    <div key={item.id} className="flex justify-between items-center bg-gray-800/40 border border-white/5 p-3 rounded-xl">
                        <div>
                            <p className="text-white font-bold text-sm">{item.username}</p>
                            <p className="text-gray-500 text-[10px]">User ID: {item.userId}</p>
                        </div>
                        <button className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))
            )}
        </div>
    );

    const getPageTitle = () => {
        switch (page) {
            case 'main': return 'Settings';
            case 'comments': return 'Comment Settings';
            case 'muterules': return 'Mute rules';
            case 'moderators': return 'Moderators';
            case 'muted': return 'Muted Accounts';
            case 'blocked': return 'Blocked Accounts';
            default: return 'Settings';
        }
    };

    return (
        <div className="absolute inset-0 z-[99999] pointer-events-none flex justify-end">
            {/* Overlay backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto transition-opacity"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="w-full md:w-[400px] h-full bg-gray-950 border-l border-white/10 pointer-events-auto flex flex-col shadow-2xl relative animate-in slide-in-from-right duration-300">

                {/* Header */}
                <div className="flex items-center p-4 border-b border-white/10 bg-gray-900/50 shrink-0">
                    <button
                        onClick={() => page === 'main' ? onClose() : setPage('main')}
                        className="p-2 -ml-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10 flex items-center justify-center"
                    >
                        {page === 'main' ? <X size={20} /> : <ArrowLeft size={20} />}
                    </button>
                    <h2 className="flex-1 text-center font-bold text-white tracking-wide pr-6">
                        {getPageTitle()}
                    </h2>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {page === 'main' && renderMainPage()}
                    {page === 'comments' && renderCommentsPage()}
                    {page === 'muterules' && renderMuteRulesPage()}
                    {page === 'moderators' && renderList(moderators, "No moderators added.")}
                    {page === 'muted' && renderList(muted, "No muted accounts.")}
                    {page === 'blocked' && renderList(blocked, "No blocked accounts.")}
                </div>
            </div>
        </div>
    );
};

export default LiveSettingsPanel;
