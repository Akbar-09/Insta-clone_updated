import { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import api from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';
import ProfileHeader from './ProfileHeader';
import ProfileHighlights from './ProfileHighlights';
import ProfileTabs from './ProfileTabs';
import ProfileGrid from './ProfileGrid';
import SavedPosts from './SavedPosts';

const ProfilePage = () => {
    const { id } = useParams();
    const { user: currentUser } = useContext(AuthContext);
    // Parse query params for initial tab
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
        const fetchProfile = async () => {
            try {
                const targetId = id === 'me' ? currentUser?.username : id;
                if (!targetId) return;

                const userRes = await api.get(`/users/${targetId}`);
                if (userRes.data.status === 'success') {
                    setProfile(userRes.data.data);
                }

                // If viewing someone else, check follow status (mock or api)
                // setIsFollowing(...)

                // Load posts regardless of tab (or optimize to load only when posts tab is active)
                // For now keeping original logic
                const postsRes = await api.get(`/posts?username=${targetId}`);
                if (postsRes.data.status === 'success') {
                    setPosts(postsRes.data.data);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser) {
            fetchProfile();
        }
    }, [id, currentUser]);

    const handleFollowToggle = async () => {
        if (!profile) return;
        try {
            if (isFollowing) {
                await api.delete(`/users/${profile.id}/follow`);
                setIsFollowing(false);
                setProfile(prev => ({ ...prev, followersCount: prev.followersCount - 1 }));
            } else {
                await api.post(`/users/${profile.id}/follow`);
                setIsFollowing(true);
                setProfile(prev => ({ ...prev, followersCount: prev.followersCount + 1 }));
            }
        } catch (error) {
            console.error('Follow toggle error:', error);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen text-text-primary">Loading...</div>;
    if (!profile) return <div className="flex justify-center items-center h-screen text-text-primary">User not found</div>;

    const isOwnProfile = currentUser?.id === profile.userId || id === 'me' || currentUser?.username === profile.username;

    return (
        <div className="min-h-screen w-full">
            <div className="max-w-[935px] w-full mx-auto pt-[30px] pb-12 px-5 max-md:px-0 max-md:pt-0">
                <ProfileHeader
                    profile={profile}
                    postsCount={posts.length}
                    isOwnProfile={isOwnProfile}
                    isFollowing={isFollowing}
                    onFollowToggle={handleFollowToggle}
                />

                <ProfileHighlights />

                <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Tab Content */}
                {activeTab === 'posts' && <ProfileGrid posts={posts} />}
                {activeTab === 'saved' && isOwnProfile && <SavedPosts />}
                {activeTab === 'saved' && !isOwnProfile && <div className="py-20 text-center text-text-secondary">Only the user can see saved posts.</div>}

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
