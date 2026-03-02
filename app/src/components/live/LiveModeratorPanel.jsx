import React, { useState, useEffect } from 'react';
import { Shield, X, MicOff, VideoOff, MessageSquareOff, Ban, MoreVertical } from 'lucide-react';

const LiveModeratorPanel = ({ streamId, socket }) => {
    const [viewers, setViewers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    // Mock viewers for UI preview
    useEffect(() => {
        setViewers([
            { id: '1', username: 'alex_knight', role: 'viewer' },
            { id: '2', username: 'sarah_vlog', role: 'moderator' },
            { id: '3', username: 'jason_tech', role: 'viewer' },
        ]);
    }, []);

    const handleAction = (userId, action) => {
        console.log(`Mod action ${action} on user ${userId}`);
        // socket.emit('moderator_action', { streamId, userId, action });
        setSelectedUser(null);
    };

    return (
        <div className="flex flex-col h-full bg-black/40 backdrop-blur-xl">
            <div className="p-4 border-b border-white/10">
                <h2 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
                    <Shield size={18} className="text-blue-500" />
                    Moderation
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                <div className="space-y-1">
                    {viewers.map(user => (
                        <div key={user.id} className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-[10px] font-bold">
                                    {user.username[0].toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-white text-sm font-medium">{user.username}</p>
                                    <p className="text-[10px] text-white/40 uppercase font-black">{user.role}</p>
                                </div>
                            </div>

                            <div className="relative">
                                <button
                                    onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                                    className="p-2 text-white/40 hover:text-white transition-colors"
                                >
                                    <MoreVertical size={16} />
                                </button>

                                {selectedUser === user.id && (
                                    <div className="absolute right-0 top-10 w-48 glass-premium border-white/10 z-50 p-2 rounded-2xl animate-fade-in shadow-2xl">
                                        <button onClick={() => handleAction(user.id, 'mute')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-white text-xs">
                                            <MicOff size={14} className="text-yellow-500" />
                                            Mute User
                                        </button>
                                        <button onClick={() => handleAction(user.id, 'ban')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-white text-xs">
                                            <Ban size={14} className="text-red-500" />
                                            Ban from Live
                                        </button>
                                        <button onClick={() => handleAction(user.id, 'remove_comment')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-white text-xs">
                                            <MessageSquareOff size={14} className="text-white/40" />
                                            Remove Comments
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4 border-t border-white/10">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest leading-loose">
                        Moderator Tip:
                    </p>
                    <p className="text-[10px] text-white/60 leading-relaxed">
                        Banned users are removed instantly and cannot rejoin this session.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LiveModeratorPanel;
