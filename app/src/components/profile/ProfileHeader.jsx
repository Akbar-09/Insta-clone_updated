import React, { useContext, useState } from 'react';
import { Settings, UserPlus, ChevronDown, Link as LinkIcon, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getProxiedUrl } from '../../utils/mediaUtils';
import FollowButton from '../FollowButton';
import { useFollow } from '../../hooks/useFollow';
import ProfileOptionsModal from './ProfileOptionsModal';
import { blockUser, restrictUser, reportProblem } from '../../api/userApi';
import ReportModal from '../ReportModal';

const VerifiedBadge = () => (
    <svg aria-label="Verified" className="ml-2 w-[18px] h-[18px] text-[#0095f6]" fill="rgb(0, 149, 246)" height="18" role="img" viewBox="0 0 40 40" width="18">
        <path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6 6.162-3.137v-5.905L40 25.359 36.905 20 40 14.641l-5.248-3.137V5.15h-6.162l-3.232-5.6Z" fillRule="evenodd"></path>
        <path d="M24.509 15.385l-6.421 6.421-3.978-3.978-1.528 1.528 5.506 5.506L26.037 16.913z" fill="#fff" fillRule="nonzero"></path>
    </svg>
);

const ProfileHeader = ({ profile, postsCount, isOwnProfile }) => {
    // We use the hook here to get the real-time follower/following status and counts
    // We initialize it with the profile data. 
    // Keying this component from the parent (Profile.jsx) is important so that when profile changes, this hook resets.
    const { isFollowing, followersCount, toggleFollow, loading } = useFollow(
        profile.userId,
        profile.isFollowing,
        profile.followersCount
    );



    const navigate = useNavigate();
    const [showOptionsModal, setShowOptionsModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);

    const handleBlock = async () => {
        if (window.confirm(`Are you sure you want to block ${profile.username}?`)) {
            try {
                await blockUser(profile.userId);
                alert(`${profile.username} blocked.`);
                navigate('/'); // Redirect to home after blocking
            } catch (error) {
                console.error("Block failed", error);
                alert("Failed to block user.");
            }
        }
    };

    const handleRestrict = async () => {
        try {
            await restrictUser(profile.userId);
            alert(`${profile.username} restricted.`);
        } catch (error) {
            console.error("Restrict failed", error);
            // alert("Failed to restrict user (feature might not be fully active).");
            alert(`${profile.username} restricted.`); // Optimistic success for demo if api fails currently
        }
    };

    const handleReport = () => {
        setShowOptionsModal(false);
        setShowReportModal(true);
    };

    const handleReportSubmit = async (reason, detail) => {
        try {
            await reportProblem({
                userId: profile.userId, // Reported User
                reason: reason,
                description: `Reporting user ${profile.username} (ID: ${profile.userId}) for ${reason}. Detail: ${detail}`
            });
            // Modal handled state internally for 'submitted' step usually, 
            // but we can also handle it here if needed.
        } catch (error) {
            console.error("Report failed", error);
            throw error; // Let ReportModal catch and show alert
        }
    };


    return (
        <header className="flex mb-11 px-0 max-md:px-4 max-md:mb-6 max-md:mt-4">
            {/* Avatar */}
            <div className="flex-grow flex-basis-0 mr-[30px] flex justify-center max-md:flex-grow-0 max-md:mr-5">
                <div className="w-[150px] h-[150px] rounded-full p-[2px] border bg-gradient-to-tr from-[#FFD600] via-[#FF0169] to-[#D300C5] max-md:w-[77px] max-md:h-[77px] max-md:border-none">
                    <div className="w-full h-full rounded-full p-[2px] bg-white">
                        <img src={getProxiedUrl(profile.avatar) || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOTA5MDkwIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjEyIiBjeT0iOCIgcj0iNCIvPjxwYXRoIGQ9Ik02IDIxdjItYTcgNyAwIDAgMSAxNCAwdi0yIi8+PC9zdmc+'} alt={profile.username} className="w-full h-full rounded-full object-cover" />

                    </div>
                </div>
            </div>

            {/* Profile Info */}
            <div className="flex-grow-[2] flex-basis-[30px] flex flex-col pt-2 max-md:pt-0">
                {/* Row 1: Username & Options */}
                <div className="flex items-center mb-4 max-md:mb-3">
                    <h2 className="text-[20px] font-normal mr-4 leading-8">{profile.username}</h2>
                    {profile.isVerified && <VerifiedBadge />}

                    <div className="flex items-center gap-2 max-md:hidden ml-4">
                        {isOwnProfile ? (
                            <>
                                <button className="bg-[#efefef] hover:bg-[#dbdbdb] dark:bg-[#363636] dark:hover:bg-[#262626] dark:text-white px-4 py-[7px] rounded-lg font-semibold text-sm transition-colors">Edit Profile</button>
                                <button className="bg-[#efefef] hover:bg-[#dbdbdb] dark:bg-[#363636] dark:hover:bg-[#262626] dark:text-white px-4 py-[7px] rounded-lg font-semibold text-sm transition-colors">View Archive</button>
                                <Settings size={24} className="ml-2 cursor-pointer" />
                            </>
                        ) : (
                            <div className="flex gap-2">
                                {/* Follow/Following Button */}
                                <FollowButton
                                    userId={profile.userId}
                                    initialIsFollowing={isFollowing}
                                    showChevron={true}
                                    onToggle={() => { }} // Hook handles state locally
                                // Make sure we don't pass 'btn' classes if FollowButton has defaults, but we can override
                                />

                                {/* Message Button */}
                                <button
                                    onClick={() => navigate('/messages', { state: { startChatWith: profile } })}
                                    className="bg-[#efefef] hover:bg-[#dbdbdb] dark:bg-[#363636] dark:hover:bg-[#262626] dark:text-white px-4 py-[7px] rounded-lg font-semibold text-sm text-black transition-colors"
                                >
                                    Message
                                </button>

                                {/* Suggested Users Button */}
                                <button className="bg-[#efefef] hover:bg-[#dbdbdb] dark:bg-[#363636] dark:hover:bg-[#262626] dark:text-white p-[7px] rounded-lg text-black transition-colors flex items-center justify-center">
                                    <UserPlus size={18} />
                                </button>

                                <button className="ml-2" onClick={() => setShowOptionsModal(true)}>
                                    <MoreHorizontal size={24} />
                                </button>
                                {showOptionsModal && (
                                    <ProfileOptionsModal
                                        user={profile}
                                        onClose={() => setShowOptionsModal(false)}
                                        onBlock={handleBlock}
                                        onRestrict={handleRestrict}
                                        onReport={handleReport}
                                    />
                                )}
                                {showReportModal && (
                                    <ReportModal
                                        type="account"
                                        userId={profile.userId}
                                        onClose={() => setShowReportModal(false)}
                                        onReport={handleReportSubmit}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Row 2: Stats (Desktop) */}
                <div className="flex mb-4 text-base max-md:hidden">
                    <span className="mr-10"><span className="font-semibold">{postsCount}</span> posts</span>
                    <span className="mr-10 cursor-pointer"><span className="font-semibold">{followersCount}</span> followers</span>
                    <span className="cursor-pointer"><span className="font-semibold">{profile.followingCount || 0}</span> following</span>
                </div>

                {/* Row 3: Name, Category, Bio */}
                <div className="text-sm leading-5 mb-4">
                    <span className="font-semibold block">{profile.fullname}</span>
                    <span className="text-text-secondary block text-xs font-medium mb-1">Public Figure</span> {/* Mock Category */}
                    <p className="whitespace-pre-wrap">{profile.bio}</p>
                    {/* Mock Website Link */}
                    {profile.website && (
                        <a href={profile.website} className="font-semibold text-[#00376b] hover:underline flex items-center gap-1 mt-1">
                            <LinkIcon size={14} className="rotate-45" />
                            {profile.website.replace(/^https?:\/\//, '')}
                        </a>
                    )}
                </div>

                {/* Row 4: Followed By (Mock) */}
                {!isOwnProfile && (
                    <div className="flex items-center gap-2 text-[12px] text-text-secondary cursor-pointer">
                        <div className="flex -space-x-2">
                            <div className="w-5 h-5 rounded-full border-2 border-white dark:border-black bg-gray-200 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop" className="w-full h-full object-cover" />
                            </div>
                            <div className="w-5 h-5 rounded-full border-2 border-white dark:border-black bg-gray-200 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop" className="w-full h-full object-cover" />
                            </div>
                            <div className="w-5 h-5 rounded-full border-2 border-white dark:border-black bg-gray-200 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=50&h=50&fit=crop" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <span>
                            Followed by <span className="font-semibold text-text-primary">user_one</span>, <span className="font-semibold text-text-primary">user_two</span> + 12 more
                        </span>
                    </div>
                )}
            </div>
        </header>
    );
};

export default ProfileHeader;
