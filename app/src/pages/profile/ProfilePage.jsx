import { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getUserProfile, getMyProfile, getUserPosts, followUser, unfollowUser } from '../../api/profileApi';
import ProfileHeader from './ProfileHeader';
import HighlightsRow from './HighlightsRow';
import ProfileTabs from './ProfileTabs';
import ProfileGrid from './ProfileGrid';
import SavedPosts from './SavedPosts';

const ProfilePage = () => {
    const { id } = useParams();
    const { user: currentUser, updateUser } = useContext(AuthContext);

    // ... (keep existing lines if matching context, but here I'm replacing the block)

    const handleProfileUpdate = (updatedProfile) => {
        setProfile(prev => ({
            ...prev,
            ...updatedProfile
        }));

        // Update global user state if it's the current user
        if (currentUser && (
            currentUser.id === updatedProfile.userId ||
            currentUser.userId === updatedProfile.userId
        )) {
            updateUser(updatedProfile);
        }
    };
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const initialTab = searchParams.get('tab') || 'posts';

    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(initialTab);
    const [isFollowing, setIsFollowing] = useState(false);

    // Update activeTab if URL changes
    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab) setActiveTab(tab);
    }, [location.search]);

    useEffect(() => {
        if (currentUser) {
            fetchProfile();
        }
    }, [id, currentUser]);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            let profileData;

            // Determine if viewing own profile or another user's
            const isOwnProfile = id === 'me' || id === currentUser?.username || id === currentUser?.id?.toString();

            if (isOwnProfile) {
                // Get own profile with accurate counts
                const response = await getMyProfile();
                if (response.status === 'success') {
                    profileData = response.data;
                }
            } else {
                // Get other user's profile
                const response = await getUserProfile(id);
                if (response.status === 'success') {
                    profileData = response.data;
                    setIsFollowing(response.data.isFollowing || false);
                }
            }

            if (profileData) {
                setProfile(profileData);

                // Fetch posts
                const postsResponse = await getUserPosts(profileData.userId);
                if (postsResponse.status === 'success') {
                    setPosts(postsResponse.data);
                }
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFollowToggle = async () => {
        if (!profile) return;

        try {
            if (isFollowing) {
                await unfollowUser(profile.userId);
                setIsFollowing(false);
                setProfile(prev => ({
                    ...prev,
                    followersCount: Math.max(0, (prev.followersCount || 0) - 1)
                }));
            } else {
                await followUser(profile.userId);
                setIsFollowing(true);
                setProfile(prev => ({
                    ...prev,
                    followersCount: (prev.followersCount || 0) + 1
                }));
            }
        } catch (error) {
            console.error('Follow toggle error:', error);
            alert('Failed to update follow status');
        }
    };



    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-text-primary">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    <span>Loading profile...</span>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex justify-center items-center h-screen text-text-primary">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">User not found</h2>
                    <p className="text-gray-500">This account doesn't exist or has been deleted.</p>
                </div>
            </div>
        );
    }

    const isOwnProfile = currentUser?.id === profile.userId ||
        currentUser?.userId === profile.userId ||
        id === 'me' ||
        currentUser?.username === profile.username;

    return (
        <div className="min-h-screen w-full">
            <div className="max-w-[935px] w-full mx-auto pt-[30px] pb-12 px-5 max-md:px-0 max-md:pt-0">
                <ProfileHeader
                    profile={profile}
                    postsCount={posts.length}
                    isOwnProfile={isOwnProfile}
                    isFollowing={isFollowing}
                    onFollowToggle={handleFollowToggle}
                    onProfileUpdate={handleProfileUpdate}
                />

                <HighlightsRow
                    userId={profile.userId}
                    isOwnProfile={isOwnProfile}
                />

                <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Tab Content */}
                {activeTab === 'posts' && <ProfileGrid posts={posts} />}
                {activeTab === 'saved' && isOwnProfile && <SavedPosts />}
                {activeTab === 'saved' && !isOwnProfile && (
                    <div className="py-20 text-center text-text-secondary">
                        Only the user can see saved posts.
                    </div>
                )}
                {activeTab === 'tagged' && (
                    <div className="py-20 text-center text-text-secondary">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full border-2 border-gray-600 flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">No tagged posts yet</h3>
                                <p className="text-sm">Photos and videos you're tagged in will appear here.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer Meta Style */}
                <div className="mt-12 mb-12 flex flex-col items-center gap-4 text-xs text-text-secondary uppercase">
                    <div className="flex gap-4 flex-wrap justify-center">
                        {['Jaadoe', 'About', 'Blog', 'Jobs', 'Help', 'API', 'Privacy', 'Terms', 'Locations', 'Jaadoe Lite', 'Threads', 'Contact Uploading & Non-Users', 'Jaadoe Verified'].map(link => (
                            <span key={link} className="cursor-pointer hover:underline decoration-1">{link}</span>
                        ))}
                    </div>
                    <span>© 2026 Jaadoe from Jaadoe</span>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
