import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile, getUserPosts } from '../../api/profileApi';

const EmbedProfile = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUserProfile(username);
                if (response.status === 'success') {
                    setProfile(response.data);
                    
                    if (!response.data.isPrivate) {
                        const postsResponse = await getUserPosts(response.data.userId);
                        if (postsResponse.status === 'success') {
                            setPosts(postsResponse.data.slice(0, 6)); // Show max 6 posts in embed
                        }
                    }
                }
            } catch (error) {
                console.error('Failed to load profile for embed:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [username]);

    if (loading) {
        return <div className="flex items-center justify-center p-8 bg-black w-full h-full text-white text-sm">Loading...</div>;
    }

    if (!profile) {
        return <div className="flex items-center justify-center p-8 bg-black w-full h-full text-white text-sm">Profile not found.</div>;
    }

    return (
        <div className="bg-black w-full h-full text-white font-sans overflow-hidden flex flex-col border border-gray-800 rounded-xl max-w-sm mx-auto shadow-lg">
            {/* Header */}
            <div className="flex items-center p-4 border-b border-gray-800">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                    {profile.profilePicture ? (
                        <img 
                            src={profile.profilePicture} 
                            alt={profile.username} 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">{profile.username[0].toUpperCase()}</span>
                        </div>
                    )}
                </div>
                <div className="ml-3 flex-grow overflow-hidden">
                    <h2 className="font-semibold text-sm truncate flex items-center gap-1">
                        {profile.username}
                        {profile.isVerified && (
                             <svg aria-label="Verified" className="w-[12px] h-[12px] text-[#0095f6]" fill="rgb(0, 149, 246)" viewBox="0 0 40 40"><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6 6.162-3.137v-5.905L40 25.359 36.905 20 40 14.641l-5.248-3.137V5.15h-6.162l-3.232-5.6Z" fillRule="evenodd"></path><path d="M24.509 15.385l-6.421 6.421-3.978-3.978-1.528 1.528 5.506 5.506L26.037 16.913z" fill="#fff" fillRule="nonzero"></path></svg>
                        )}
                    </h2>
                    <p className="text-gray-400 text-xs truncate">
                        {profile.displayName || profile.fullName}
                    </p>
                </div>
                <a 
                    href={`/profile/${profile.username}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ml-2 bg-[#0095f6] hover:bg-[#1877f2] text-white text-xs font-semibold py-1.5 px-3 rounded-lg flex-shrink-0"
                >
                    View Profile
                </a>
            </div>

            {/* Bio */}
            {profile.bio && (
                <div className="p-4 py-3 text-sm text-gray-300 whitespace-pre-wrap truncate hidden sm:block">
                    {profile.bio}
                </div>
            )}

            {/* Stats */}
            <div className="flex justify-around border-t border-b border-gray-800 py-3 bg-[#111]">
                <div className="text-center">
                    <div className="font-bold text-sm">{profile.postsCount || 0}</div>
                    <div className="text-xs text-gray-500 font-medium">posts</div>
                </div>
                <div className="text-center">
                    <div className="font-bold text-sm">{profile.followersCount || 0}</div>
                    <div className="text-xs text-gray-500 font-medium">followers</div>
                </div>
                <div className="text-center">
                    <div className="font-bold text-sm">{profile.followingCount || 0}</div>
                    <div className="text-xs text-gray-500 font-medium">following</div>
                </div>
            </div>

            {/* Grid */}
            <div className="flex-grow p-1 overflow-y-auto">
                {profile.isPrivate ? (
                    <div className="flex items-center justify-center p-6 text-gray-500 text-sm">
                        This account is private.
                    </div>
                ) : posts.length > 0 ? (
                    <div className="grid grid-cols-3 gap-1">
                        {posts.map(post => (
                            <a 
                                key={post.id} 
                                href={`/post/${post.id}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="aspect-square relative group block bg-gray-900"
                            >
                                <img 
                                    src={post.mediaUrl || post.imageUrl} 
                                    alt="Post" 
                                    className="w-full h-full object-cover"
                                />
                                {(post.mediaType === 'VIDEO' || post.videoUrl) && (
                                    <div className="absolute top-1 right-1">
                                        <svg aria-label="Clip" className="fill-white" height="12" role="img" viewBox="0 0 24 24" width="12"><path d="m12.823 1 2.974 5.002h-2.58L10.007 1H12.823ZM17.584 1l-2.972 5.002h2.58L20.399 1h-2.815Zm-6.223 1H6.002l5.003 5.002h2.58L8.232 2Zm-5.344 0H1l5.002 5.002h2.58L3.064 1.341a.508.508 0 0 0 1.954-.341ZM23 10.002h-4.002l1.666-2.502h2.89L23 10.002Zm-5.467 0h-4.002l1.666-2.502h2.336L17.533 10.002ZM11 10.002H6.998l1.666-2.502h2.336L11 10.002Zm11.002-1.001h-2.128l-1.668-2.501h1.998l1.798 2.501ZM1.5 10.002h2.834L2.668 7.501H1.5v2.501Zm21.5 1.498H22V10.75h1v.75ZM1 22.25V11.503h22V22.25a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75ZM11 12.502H6.5v2.502H11v-2.502Zm-6 0H2.5v2.502H5v-2.502Zm6 4.002H6.5v2.501H11v-2.501Zm-6 0H2.5v2.501H5v-2.501Zm12-4.002h-4.5v2.502h4.5v-2.502Zm0 4.002h-4.5v2.501h4.5v-2.501Zm6-4.002h-4.5v2.502h4.5v-2.502Zm0 4.002h-4.5v2.501h4.5v-2.501Z"></path></svg>
                                    </div>
                                )}
                            </a>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center p-6 text-gray-500 text-sm">
                        No posts yet.
                    </div>
                )}
            </div>
            {/* Footer */}
            <div className="p-3 bg-black border-t border-gray-800 text-center">
                <a href="/" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-xs hover:text-white transition-colors font-medium tracking-wide">
                    View more on Jaadoe
                </a>
            </div>
        </div>
    );
};

export default EmbedProfile;
