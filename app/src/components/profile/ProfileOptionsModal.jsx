import React, { useState } from 'react';
import { X, ExternalLink, Calendar, MapPin, Flag, Ban, Slash } from 'lucide-react';

const ProfileOptionsModal = ({ onClose, user, onBlock, onRestrict, onReport }) => {
    const [showAbout, setShowAbout] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [reportReason, setReportReason] = useState('');

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Profile URL copied to clipboard');
        onClose();
    };

    const handleReportSubmit = () => {
        onReport(reportReason || 'Spam or abuse');
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

    if (showReport) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fade-in" onClick={onClose}>
                <div onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-[#262626] rounded-xl w-[400px] max-w-full overflow-hidden shadow-xl animate-scale-in">
                    <div className="flex items-center justify-center p-4 border-b border-gray-200 dark:border-[#363636] relative">
                        <h3 className="font-bold text-lg dark:text-white">Report</h3>
                        <button onClick={() => setShowReport(false)} className="absolute left-4 top-1/2 -translate-y-1/2">
                            <X className="dark:text-white" />
                        </button>
                    </div>
                    <div className="p-4 space-y-4">
                        <p className="font-semibold text-sm dark:text-white">Why are you reporting this account?</p>
                        <div className="space-y-0 text-sm">
                            {['It\'s spam', 'I just don\'t like it', 'Suicide, self-injury or eating disorders', 'Sale of illegal or regulated goods', 'Nudity or sexual activity', 'Hate speech or symbols', 'Violence or dangerous organizations', 'Bullying or harassment', 'False information', 'Scam or fraud'].map((reason) => (
                                <button
                                    key={reason}
                                    onClick={() => { setReportReason(reason); handleReportSubmit(); }}
                                    className="w-full text-left py-3 px-2 hover:bg-gray-100 dark:hover:bg-[#363636] rounded transition-colors dark:text-white flex justify-between items-center group"
                                >
                                    {reason}
                                    <span className="text-gray-400 group-hover:text-black dark:group-hover:text-white">&rsaquo;</span>
                                </button>
                            ))}
                        </div>
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
                <button onClick={() => setShowReport(true)} className="w-full py-3.5 text-center text-[#ED4956] font-bold text-sm hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors">
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
