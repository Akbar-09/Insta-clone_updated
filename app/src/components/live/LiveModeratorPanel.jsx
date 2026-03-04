import React, { useState } from 'react';
import { Shield, MicOff, Ban, MessageSquareOff, MoreVertical } from 'lucide-react';
import { useParticipants } from '@livekit/components-react';
import axios from 'axios';

const LiveModeratorPanel = ({ streamId, socket }) => {
    const participants = useParticipants();
    const [selectedUser, setSelectedUser] = useState(null);
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

    // Filter out the current user (host/moderator) from the list
    const viewers = participants.filter(p => p.identity !== String(currentUser.id));

    const handleAction = async (userId, username, action) => {
        console.log(`Mod action ${action} on user ${userId}`);
        setSelectedUser(null);

        try {
            const token = localStorage.getItem('token');
            const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

            if (action === 'mute') {
                await axios.post(`${API_URL}/live/${streamId}/mute/${userId}`, {
                    username,
                    duration_minutes: 60 // Default 60 mins mute
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert(`Muted user ${username}`);
            } else if (action === 'ban') {
                await axios.post(`${API_URL}/live/${streamId}/block/${userId}`, {
                    username
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert(`Banned user ${username} from live`);
            } else if (action === 'remove_comment') {
                // Implement remove comments action if backend supports it or just alert for now
                alert('Remove comments clicked! Ensure backend support is added if needed.');
            }
        } catch (error) {
            console.error('Failed to perform moderation action', error);
            alert('Failed to perform action');
        }
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
                    {viewers.length === 0 ? (
                        <div className="text-white/40 text-xs text-center p-4">No viewers currently connected</div>
                    ) : (
                        viewers.map(participant => {
                            // Identity is userId, name is username
                            const userId = participant.identity;
                            const username = participant.name || 'Unknown';

                            return (
                                <div key={userId} className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-[10px] font-bold">
                                            {username ? username[0].toUpperCase() : 'V'}
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-medium">{username}</p>
                                            <p className="text-[10px] text-white/40 uppercase font-black">VIEWER</p>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <button
                                            onClick={() => setSelectedUser(selectedUser === userId ? null : userId)}
                                            className="p-2 text-white/40 hover:text-white transition-colors"
                                        >
                                            <MoreVertical size={16} />
                                        </button>

                                        {selectedUser === userId && (
                                            <div className="absolute right-0 top-10 w-48 glass-premium border-white/10 z-50 p-2 rounded-2xl animate-fade-in shadow-2xl">
                                                <button onClick={() => handleAction(userId, username, 'mute')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-white text-xs">
                                                    <MicOff size={14} className="text-yellow-500" />
                                                    Mute User
                                                </button>
                                                <button onClick={() => handleAction(userId, username, 'ban')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-white text-xs">
                                                    <Ban size={14} className="text-red-500" />
                                                    Ban from Live
                                                </button>
                                                <button onClick={() => handleAction(userId, username, 'remove_comment')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-white text-xs">
                                                    <MessageSquareOff size={14} className="text-white/40" />
                                                    Remove Comments
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
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
