import React, { useState } from 'react';
import { X, ExternalLink, Calendar, MapPin, Flag, Ban, Slash } from 'lucide-react';

const ProfileOptionsModal = ({ onClose, user, onBlock, onRestrict, onReport }) => {
    const [showAbout, setShowAbout] = useState(false);

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Profile URL copied to clipboard');
        onClose();
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown';
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (showAbout) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fade-in" onClick={onClose}>
                <div onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-[#262626] rounded-xl w-[400px] max-w-full overflow-hidden shadow-xl animate-scale-in">
                    <div className="flex items-center justify-center p-4 border-b border-gray-200 dark:border-[#363636] relative">
                        <h3 className="font-bold text-lg dark:text-white">About this account</h3>
                        <button onClick={() => setShowAbout(false)} className="absolute left-4 top-1/2 -translate-y-1/2">
                            <X className="dark:text-white" />
                        </button>
                    </div>
                    <div className="p-4 flex flex-col gap-6 items-center text-center">
                        <img
                            src={user.profilePicture || "https://ui-avatars.com/api/?name=" + user.username}
                            alt={user.username}
                            className="w-20 h-20 rounded-full object-cover border dark:border-[#363636]"
                        />
                        <div className="space-y-1">
                            <h2 className="font-bold text-xl dark:text-white">{user.username}</h2>
                            {user.fullName && <p className="text-gray-500 text-sm">{user.fullName}</p>}
                        </div>

                        <div className="w-full space-y-4">
                            <div className="flex items-center gap-3 text-left w-full px-4">
                                <Calendar className="w-6 h-6 dark:text-white" />
                                <div>
                                    <p className="font-semibold text-sm dark:text-white">Date joined</p>
                                    <p className="text-gray-500 text-xs">{formatDate(user.createdAt)}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-left w-full px-4">
                                <MapPin className="w-6 h-6 dark:text-white" />
                                <div>
                                    <p className="font-semibold text-sm dark:text-white">Account based in</p>
                                    <p className="text-gray-500 text-xs">{user.country || 'Unknown'}</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowAbout(false)}
                            className="w-full bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold py-2 rounded-lg transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fade-in" onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-[#262626] rounded-xl w-[400px] max-w-full overflow-hidden shadow-xl animate-scale-in flex flex-col divide-y divide-gray-200 dark:divide-[#363636]">
                <button onClick={onBlock} className="w-full py-3.5 text-center text-[#ED4956] font-bold text-sm hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors">
                    Block
                </button>
                <button onClick={onRestrict} className="w-full py-3.5 text-center text-[#ED4956] font-bold text-sm hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors">
                    Restrict
                </button>
                <button
                    onClick={() => {
                        onReport();
                    }}
                    className="w-full py-3.5 text-center text-[#ED4956] font-bold text-sm hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors"
                >
                    Report
                </button>
                <button onClick={() => setShowAbout(true)} className="w-full py-3.5 text-center dark:text-white font-normal text-sm hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors">
                    About this account
                </button>
                <button onClick={handleCopyUrl} className="w-full py-3.5 text-center dark:text-white font-normal text-sm hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors">
                    Copy profile URL
                </button>
                <button onClick={onClose} className="w-full py-3.5 text-center dark:text-white font-normal text-sm hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors">
                    Cancel
                </button>
            </div>
        </div>
    );
};


export default ProfileOptionsModal;
