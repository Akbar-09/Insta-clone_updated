import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Heart, MessageCircle, ArrowLeft } from 'lucide-react';
import * as adminApi from '../../api/adminApi';
import ProfileListModal from '../../components/ProfileListModal';

const UserProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fetchingDetails, setFetchingDetails] = useState(false);
    const [activeTab, setActiveTab] = useState('posts');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('followers');
    const [modalTitle, setModalTitle] = useState('');

    // Tab Content State
    const [tabContent, setTabContent] = useState([]);
    const [tabLoading, setTabLoading] = useState(false);

    useEffect(() => {
        if (userId) {
            fetchUserDetails(userId);
        }
    }, [userId]);

    useEffect(() => {
        if (selectedUser) {
            fetchTabContent();
        }
    }, [activeTab, selectedUser?.userId]);

    const fetchUserDetails = async (id) => {
        try {
            setLoading(true);
            const res = await adminApi.getUserDetails(id);
            if (res.success) {
                setSelectedUser(res.data);
            } else {
                alert('User not found');
                navigate('/user-list');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
            alert('Failed to load user details');
            navigate('/user-list');
        } finally {
            setLoading(false);
        }
    };

    const fetchTabContent = async () => {
        if (!selectedUser) return;
        try {
            setTabLoading(true);
            let res;
            if (activeTab === 'posts') {
                res = await adminApi.getUserPosts(selectedUser.userId);
            } else if (activeTab === 'reels') {
                res = await adminApi.getUserReels(selectedUser.userId);
            } else {
                res = { success: true, data: [] }; // Tag or others
            }
            if (res.success) {
                setTabContent(res.data || []);
            }
        } catch (error) {
            console.error('Error fetching tab content:', error);
        } finally {
            setTabLoading(false);
        }
    };

    const openModal = (type, title) => {
        setModalType(type);
        setModalTitle(title);
        setIsModalOpen(true);
    };

    const getMediaUrl = (url) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        const baseUrl = window.location.origin;
        let cleanPath = url;

        // Handle double uploads or missing uploads prefix
        if (url.includes('uploads/')) {
            cleanPath = url.startsWith('/') ? url : '/' + url;
        } else {
            cleanPath = url.startsWith('/') ? `/uploads${url}` : `/uploads/${url}`;
        }

        // Sanitize double slashes but keep http://
        return `${baseUrl}${cleanPath}`.replace(/([^:]\/)\/+/g, "$1");
    };

    const tabDisplayName = (tab) => {
        return tab.charAt(0).toUpperCase() + tab.slice(1);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!selectedUser) return null;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Header Section */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/user-list')}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors text-gray-500"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">User Profile</h1>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 ml-12">
                    <span className="cursor-pointer hover:text-purple-600 transition-colors" onClick={() => navigate('/dashboard')}>Dashboard</span>
                    <span>-</span>
                    <span className="cursor-pointer hover:text-purple-600 transition-colors" onClick={() => navigate('/user-list')}>User List</span>
                    <span>-</span>
                    <span className="text-gray-400 font-medium">{selectedUser.username}</span>
                </div>
            </div>

            {/* Profile Card */}
            <div className="bg-white dark:bg-[#1e293b] rounded-[32px] overflow-hidden shadow-sm border border-gray-100 dark:border-white/5 pb-12">
                {/* Subtle Banner */}
                <div className="h-40 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-white/5 dark:to-white/[0.02]"></div>

                <div className="px-12">
                    {/* Profile Info */}
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-8 -mt-20">
                        <div className="w-40 h-40 rounded-full border-[6px] border-white dark:border-[#1e293b] shadow-xl overflow-hidden bg-purple-700 flex items-center justify-center text-white text-5xl font-bold">
                            {selectedUser.profilePicture ? (
                                <img src={getMediaUrl(selectedUser.profilePicture)} alt={selectedUser.username} className="w-full h-full object-cover" />
                            ) : (
                                selectedUser.username.substring(0, 2).toUpperCase()
                            )}
                        </div>
                        <div className="flex-1 text-center md:text-left pb-4">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{selectedUser.fullName || selectedUser.username}</h2>
                            <div className="flex items-center justify-center md:justify-start gap-6 text-sm">
                                <span
                                    className="flex items-center gap-1.5 cursor-pointer hover:text-purple-600 transition-colors"
                                    onClick={() => openModal('followers', 'Followers')}
                                >
                                    <strong className="text-gray-900 dark:text-white font-bold">{selectedUser.stats?.followers || 0}</strong>
                                    <span className="text-gray-500">Followers</span>
                                </span>
                                <span
                                    className="flex items-center gap-1.5 cursor-pointer hover:text-purple-600 transition-colors"
                                    onClick={() => openModal('following', 'Following')}
                                >
                                    <strong className="text-gray-900 dark:text-white font-bold">{selectedUser.stats?.following || 0}</strong>
                                    <span className="text-gray-500">Following</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Tabs - Pill Button Style */}
                    <div className="flex items-center gap-4 mt-12 mb-8 justify-center md:justify-start">
                        {['posts', 'reels', 'tag'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-2.5 rounded-xl text-sm font-semibold transition-all border ${activeTab === tab
                                    ? 'bg-white border-purple-600 text-purple-600 shadow-sm'
                                    : 'bg-transparent border-transparent text-gray-500 hover:text-gray-800'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)} ({tab === 'posts' ? selectedUser.stats?.posts : tab === 'reels' ? selectedUser.stats?.reels : 0})
                            </button>
                        ))}
                    </div>

                    {/* Tab Content - Grid */}
                    <div className="py-8">
                        {tabLoading ? (
                            <div className="flex justify-center py-20">
                                <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : tabContent.length === 0 ? (
                            <div className="py-24 flex flex-col items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-purple-50 dark:bg-purple-900/10 flex items-center justify-center mb-6">
                                    <Search size={32} className="text-purple-300" />
                                </div>
                                <p className="text-xl font-medium text-gray-400">No {tabDisplayName(activeTab)}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500">
                                {tabContent.map(item => (
                                    <div key={item.id} className="aspect-square rounded-[24px] overflow-hidden bg-gray-100 dark:bg-white/5 relative group cursor-pointer shadow-sm border border-gray-100 dark:border-white/5">
                                        {(item.mediaUrl && item.mediaType !== 'VIDEO') ? (
                                            <img
                                                src={getMediaUrl(item.mediaUrl)}
                                                alt="content"
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <video
                                                src={getMediaUrl(item.mediaUrl || item.videoUrl)}
                                                className="w-full h-full object-cover"
                                                muted
                                                onMouseOver={e => e.target.play()}
                                                onMouseOut={e => { e.target.pause(); e.target.currentTime = 0; }}
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold">
                                            <span className="flex items-center gap-2"><Heart size={20} fill="white" /> {item.likesCount || 0}</span>
                                            <span className="flex items-center gap-2"><MessageCircle size={20} fill="white" /> {item.commentsCount || 0}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ProfileListModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                userId={selectedUser.userId}
                type={modalType}
                title={modalTitle}
                onViewProfile={(id) => navigate(`/user-list/user-profile/${id}`)}
            />
        </div>
    );
};

export default UserProfile;
