import React from 'react';
import { UsersRound, Check, X } from 'lucide-react';

const LiveGuestsPanel = ({ pendingRequests, activeGuests, handleAcceptRequest, handleRejectRequest, handleRemoveGuest, isHost }) => {
    return (
        <div className="flex flex-col h-full bg-black/40 backdrop-blur-xl">
            <div className="p-4 border-b border-white/10 shrink-0">
                <h2 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
                    <UsersRound size={18} className="text-blue-500" />
                    Guests
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-6">
                {/* Active Guests Section */}
                {activeGuests && activeGuests.length > 0 && (
                    <div>
                        <h3 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-3">Active Guests</h3>
                        <div className="space-y-3">
                            {activeGuests.map(guest => (
                                <div key={guest.userId} className="group flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-xs font-bold text-white shadow-lg border border-white/20">
                                            {guest.username ? guest.username[0].toUpperCase() : 'G'}
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-medium">{guest.username}</p>
                                            <p className="text-[10px] text-blue-400 uppercase font-bold tracking-widest">Co-host</p>
                                        </div>
                                    </div>
                                    {isHost && (
                                        <button
                                            onClick={() => handleRemoveGuest(guest.userId)}
                                            className="px-3 py-1.5 rounded-lg bg-white/5 text-white/50 hover:text-red-500 hover:bg-red-500/10 transition text-xs font-bold uppercase tracking-wider"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Pending Requests Section */}
                <div>
                    <h3 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-3">Requests</h3>
                    {pendingRequests && pendingRequests.length > 0 ? (
                        <div className="space-y-3">
                            {pendingRequests.map(req => (
                                <div key={req.userId} className="group flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-xs font-bold text-white shadow-xl border border-white/20">
                                            {req.username ? req.username[0].toUpperCase() : 'V'}
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-medium">{req.username}</p>
                                            <p className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest">Requests to join</p>
                                        </div>
                                    </div>
                                    {isHost && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleRejectRequest(req.userId)}
                                                className="p-2 rounded-lg bg-white/5 text-white/50 hover:text-red-500 hover:bg-red-500/10 transition"
                                            >
                                                <X size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleAcceptRequest(req.userId)}
                                                className="p-2 rounded-lg bg-pink-600 text-white shadow-lg shadow-pink-600/20 hover:bg-pink-500 transition"
                                            >
                                                <Check size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-white/5 rounded-xl border border-white/5">
                            <UsersRound size={32} className="mx-auto text-white/10 mb-2" />
                            <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold px-4">No guest requests yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LiveGuestsPanel;
