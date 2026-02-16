import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Bookmark, Clapperboard, MonitorPlay, Heart, UserSquare2 } from 'lucide-react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import ProfileHeader from '../components/profile/ProfileHeader';
import { getSavedPosts, getSavedReels } from '../api/bookmarkApi';

const VerifiedBadge = () => (
    <svg aria-label="Verified" className="ml-2 w-[18px] h-[18px] text-[#0095f6]" fill="rgb(0, 149, 246)" height="18" role="img" viewBox="0 0 40 40" width="18">
        <path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6 6.162-3.137v-5.905L40 25.359 36.905 20 40 14.641l-5.248-3.137V5.15h-6.162l-3.232-5.6Z" fillRule="evenodd"></path>
        <path d="M24.509 15.385l-6.421 6.421-3.978-3.978-1.528 1.528 5.506 5.506L26.037 16.913z" fill="#fff" fillRule="nonzero"></path>
    </svg>
);

const Profile = ({ section }) => {
    const { id } = useParams(); // Using :id as username or userId based on route
    const { user: currentUser } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(section || 'posts');
    const [totalPostsCount, setTotalPostsCount] = useState(0);

    useEffect(() => {
        if (section) {
            setActiveTab(section);
        }
    }, [section]);

    useEffect(() => {
        if (profile?.username && activeTab !== 'posts') {
            api.get(`/posts?username=${profile.username}`).then(res => {
                if (res.data.status === 'success') setTotalPostsCount(res.data.data.length);
            }).catch(console.error);
        }
    }, [profile?.username, activeTab]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Determine if we are viewing own profile
                const targetId = id === 'me' ? currentUser?.username : id;
                if (!targetId) return;

                const userRes = await api.get(`/users/${targetId}`);
                if (userRes.data.status === 'success') {
                    setProfile(userRes.data.data);
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

    useEffect(() => {
        const fetchPosts = async () => {
            if (!profile) return;

            try {
                let data = [];
                if (activeTab === 'saved') {
                    // Saved posts are private, only fetch if it's the current user
                    // The check isOwnProfile will be derived from profile props, handling here for data safety
                    const targetId = id === 'me' ? currentUser?.id : profile?.userId;
                    // We can only see saved posts for ourselves
                    if (currentUser?.id === targetId || id === 'me') {
                        const [postsRes, reelsRes] = await Promise.allSettled([
                            getSavedPosts(targetId),
                            getSavedReels(targetId)
                        ]);

                        let savedPosts = [];
                        let savedReels = [];

                        if (postsRes.status === 'fulfilled') {
                            const res = postsRes.value;
                            savedPosts = res.data || (Array.isArray(res) ? res : []);
                        }

                        if (reelsRes.status === 'fulfilled') {
                            const res = reelsRes.value;
                            savedReels = (res.data || (Array.isArray(res) ? res : [])).map(r => ({ ...r, isReel: true }));
                        }

                        data = [...savedPosts, ...savedReels].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    }
                } else if (activeTab === 'reels') {
                    const res = await api.get(`/reels/user?username=${profile.username}`);
                    if (res.data.status === 'success') {
                        data = res.data.data.map(r => ({ ...r, isReel: true }));
                    }
                } else if (activeTab === 'posts') {
                    const postsRes = await api.get(`/posts?username=${profile.username}`);
                    if (postsRes.data.status === 'success') {
                        data = postsRes.data.data;
                        if (id !== 'me' || profile?.id) {
                            setTotalPostsCount(data.length);
                        }
                    }
                }
                // Extend for other tabs like Reels if needed

                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts for tab:", activeTab, error);
            }
        };

        fetchPosts();
    }, [activeTab, profile, id, currentUser]);



    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (!profile) return <div className="flex justify-center items-center h-screen">User not found</div>;

    const isOwnProfile = currentUser?.id === profile.userId || id === 'me';

    const getMediaUrl = (url) => {
        if (!url) return undefined;
        if (url.startsWith('http') || url.startsWith('data:')) return url;
        return url;
    };

    return (
        <div className="max-w-[935px] w-full mx-auto pt-[30px] pb-12 px-5 max-md:px-0 max-md:pt-0">
            {/* Header */}
            <ProfileHeader
                key={profile.userId} // Important to reset state when profile changes
                profile={profile}
                postsCount={totalPostsCount}
                isOwnProfile={isOwnProfile}
            />

            {/* Navigation Tabs */}
            <div className="border-t border-border flex justify-center uppercase tracking-[1px] text-xs font-semibold">
                <div onClick={() => setActiveTab('posts')} className={`flex items-center gap-1.5 h-[52px] -mt-px px-1 cursor-pointer transition-colors border-t ${activeTab === 'posts' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}>
                    <Grid size={12} strokeWidth={activeTab === 'posts' ? 3 : 2} />
                    <span>Posts</span>
                </div>
                {isOwnProfile && (
                    <div onClick={() => setActiveTab('saved')} className={`flex items-center gap-1.5 h-[52px] -mt-px px-1 cursor-pointer transition-colors border-t ${activeTab === 'saved' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}>
                        <Bookmark size={12} strokeWidth={activeTab === 'saved' ? 3 : 2} />
                        <span>Saved</span>
                    </div>
                )}
                <div onClick={() => setActiveTab('reels')} className={`flex items-center gap-1.5 h-[52px] -mt-px px-1 cursor-pointer transition-colors border-t ${activeTab === 'reels' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}>
                    <Clapperboard size={12} strokeWidth={activeTab === 'reels' ? 3 : 2} />
                    <span>Reels</span>
                </div>
                <div onClick={() => setActiveTab('tagged')} className={`flex items-center gap-1.5 h-[52px] -mt-px px-1 cursor-pointer transition-colors border-t ${activeTab === 'tagged' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}>
                    <UserSquare2 size={12} strokeWidth={activeTab === 'tagged' ? 3 : 2} />
                    <span>Tagged</span>
                </div>
            </div>

            {/* Post Grid */}
            <div className="grid grid-cols-3 gap-1 max-md:gap-[3px]">
                {posts.map((post) => (
                    <div key={`${post.isReel ? 'reel' : 'post'}-${post.id}`} className="relative aspect-square group cursor-pointer bg-secondary">
                        {post.isReel || post.mediaType === 'VIDEO' ? (
                            <div className="relative w-full h-full">
                                <video src={post.videoUrl || post.mediaUrl} className="w-full h-full object-cover" />
                                {post.isReel && (
                                    <div className="absolute top-2 right-2 text-white drop-shadow-md">
                                        <Clapperboard size={18} />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <img src={post.mediaUrl || post.imageUrl} alt="Post" className="w-full h-full object-cover" />
                        )}

                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white max-md:hidden">
                            <div className="flex items-center gap-2">
                                <Heart size={20} fill="white" />
                                <span className="font-bold text-base">{post.likesCount || 0}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {posts.length === 0 && (
                <div className="py-20 flex flex-col items-center text-center text-text-secondary">
                    <div className="w-[62px] h-[62px] border-2 border-text-primary rounded-full flex items-center justify-center mb-4">
                        <Grid size={30} />
                    </div>
                    <h2 className="text-xl font-extrabold mb-2">No Posts Yet</h2>
                </div>
            )}
        </div>
    );
};

export default Profile;
