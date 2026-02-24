import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMySavedPosts } from '../../api/profileApi';
import { MessageCircle, Heart } from 'lucide-react';
import { getProxiedUrl } from '../../utils/mediaUtils';

const SavedPosts = () => {
    const navigate = useNavigate();
    const [savedPosts, setSavedPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSavedPosts();
    }, []);

    const fetchSavedPosts = async () => {
        setLoading(true);
        try {
            const response = await getMySavedPosts();
            if (response.status === 'success') {
                setSavedPosts(response.data);
            }
        } catch (error) {
            console.error('Error fetching saved posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePostClick = (postId, index) => {
        const postMetadata = savedPosts.map(p => ({
            id: p.id,
            type: p.type || (p.videoUrl ? 'REEL' : 'POST')
        }));

        navigate(`/post/${postId}`, {
            state: {
                postMetadata,
                currentIndex: index,
                type: savedPosts[index].type || (savedPosts[index].videoUrl ? 'REEL' : 'POST')
            }
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
        );
    }

    if (savedPosts.length === 0) {
        return (
            <div className="py-20 text-center text-text-secondary">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-2 border-gray-600 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-1">Save</h3>
                        <p className="text-sm">Save photos and videos that you want to see again.</p>
                        <p className="text-sm">No one is notified, and only you can see what you've saved.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 gap-1 md:gap-7">
            {savedPosts.map((post, index) => (
                <div
                    key={`${post.id}-${index}`}
                    onClick={() => handlePostClick(post.id, index)}
                    className="relative aspect-square cursor-pointer group overflow-hidden bg-gray-900"
                >
                    {/* Post Image/Video */}
                    {(post.type === 'REEL' || post.mediaType === 'VIDEO' || post.videoUrl) ? (
                        <video
                            src={getProxiedUrl(post.videoUrl || post.mediaUrl)}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <img
                            src={getProxiedUrl(post.mediaUrl || post.imageUrl || post.videoUrl)}
                            alt="Saved content"
                            className="w-full h-full object-cover"
                        />
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                        <div className="flex items-center gap-2 text-white">
                            <Heart size={24} fill="white" />
                            <span className="font-semibold">{post.likesCount || 0}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                            <MessageCircle size={24} fill="white" />
                            <span className="font-semibold">{post.commentsCount || 0}</span>
                        </div>
                    </div>

                    {/* Video/Reel indicator */}
                    {(post.type === 'REEL' || post.mediaType === 'VIDEO') && (
                        <div className="absolute top-2 right-2">
                            <svg className="w-5 h-5 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SavedPosts;
