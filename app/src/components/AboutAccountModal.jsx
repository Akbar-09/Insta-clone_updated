import { useState, useEffect } from 'react';
import { X, Calendar, MapPin, Clock } from 'lucide-react';
import { getUserProfile } from '../api/profileApi';

const AboutAccountModal = ({ userId, username, onClose }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const response = await getUserProfile(username);
                if (response.status === 'success') {
                    setProfile(response.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchInfo();
    }, [username]);

    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
    };

    if (showHistory) {
        return (
            <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <div className="bg-[#262626] text-white rounded-xl w-full max-w-sm overflow-hidden flex flex-col max-h-[80vh]">
                    <div className="flex items-center justify-between p-4 border-b border-gray-700">
                        <button onClick={() => setShowHistory(false)} className="text-white font-semibold transform rotate-180">
                            →
                        </button>
                        <h2 className="font-semibold text-base">Former usernames</h2>
                        <div className="w-6"></div>
                    </div>
                    <div className="p-6 text-center text-gray-300">
                        <p className="mb-4">No former usernames found.</p>
                        <p className="text-xs text-gray-500">
                            We show username changes to help keep our community authentic.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-[#262626] text-white rounded-xl w-full max-w-sm overflow-hidden flex flex-col max-h-[80vh]">
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <div className="w-6"></div>
                    <h2 className="font-semibold text-base">About this account</h2>
                    <button onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                {loading ? (
                    <div className="p-8 flex justify-center">
                        <div className="w-8 h-8 border-2 border-gray-500 border-t-white rounded-full animate-spin"></div>
                    </div>
                ) : profile ? (
                    <div className="p-0">
                        <div className="flex flex-col items-center p-6 border-b border-gray-700">
                            <img
                                src={profile.profilePicture || 'https://placehold.co/150'}
                                alt={profile.username}
                                className="w-20 h-20 rounded-full mb-4 object-cover"
                            />
                            <h3 className="font-semibold text-lg">{profile.username}</h3>
                        </div>

                        <div className="p-4 space-y-4">
                            <div className="flex items-center gap-3">
                                <Calendar size={24} className="text-gray-400" />
                                <div>
                                    <h4 className="font-semibold text-sm">Date joined</h4>
                                    <p className="text-xs text-gray-400">{formatDate(profile.createdAt)}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <MapPin size={24} className="text-gray-400" />
                                <div>
                                    <h4 className="font-semibold text-sm">Account based in</h4>
                                    <p className="text-xs text-gray-400">United States</p>
                                </div>
                            </div>

                            <div
                                className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg -mx-2 transition-colors"
                                onClick={() => setShowHistory(true)}
                            >
                                <Clock size={24} className="text-gray-400" />
                                <div className="flex-1">
                                    <h4 className="font-semibold text-sm">Former usernames</h4>
                                    <p className="text-xs text-gray-400">0</p>
                                </div>
                                <span className="text-gray-500 text-lg">›</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-4 text-center">User not found</div>
                )}
            </div>
        </div>
    );
};

export default AboutAccountModal;
