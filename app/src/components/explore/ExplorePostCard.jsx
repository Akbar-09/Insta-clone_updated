import { Heart, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExplorePostCard = ({ post, isLarge, allPostIds, index }) => {
    const navigate = useNavigate();

    const getProxiedUrl = (url) => {
        if (!url) return '';
        if (typeof url !== 'string') return url;

        if (!url.startsWith('http') && !url.startsWith('/') && !url.startsWith('data:') && !url.startsWith('blob:')) {
            return `/api/v1/media/files/${url}`;
        }

        try {
            if (url.startsWith('http://localhost:5000') || url.startsWith('http://127.0.0.1:5000')) {
                return url.replace(/^http:\/\/(localhost|127\.0\.0\.1):5000/, '');
            }
            if (url.includes('r2.dev')) {
                const parts = url.split('.dev/');
                if (parts.length > 1) return `/api/v1/media/files/${parts[1]}`;
            }
            if (url.includes('/media/files') && !url.includes('/api/v1/')) {
                return url.replace('/media/files', '/api/v1/media/files');
            }
        } catch (e) {
            console.warn('URL proxying failed:', e);
        }
        return url;
    };

    const getMediaUrl = (url) => getProxiedUrl(url);

    return (
        <div
            className={`relative group cursor-pointer overflow-hidden bg-gray-200 dark:bg-gray-800 w-full h-full ${!isLarge ? 'aspect-square' : ''}`}
            onClick={() => {
                navigate(`/post/${post.id}`, {
                    state: {
                        postIds: allPostIds,
                        currentIndex: index
                    }
                });
            }}
        >
            {post.mediaType === 'VIDEO' ? (
                <video
                    key={post.id} // Force re-render on id change to ensure autoplay works
                    src={getMediaUrl(post.mediaUrl || post.videoUrl)}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    autoPlay
                    playsInline
                    onError={(e) => {
                        console.error("Video load error:", post.mediaUrl || post.videoUrl);
                        e.target.style.display = 'none'; // Hide if broken
                    }}
                />
            ) : (
                <img
                    src={getMediaUrl(post.mediaUrl)}
                    alt={post.caption || 'Explore content'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=Error&background=random`; // Fallback
                    }}
                />
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-6 transition-opacity duration-200">
                <div className="flex items-center text-white font-bold">
                    <Heart className="fill-white mr-2" size={20} />
                    <span>{post.likesCount}</span>
                </div>
                <div className="flex items-center text-white font-bold">
                    <MessageCircle className="fill-white mr-2" size={20} />
                    <span>{post.commentsCount || 0}</span>
                </div>
            </div>

            {/* Video Indicator */}
            {post.mediaType === 'VIDEO' && (
                <div className="absolute top-2 right-2 text-white drop-shadow-md">
                    <svg aria-label="Clip" className="fill-white" height="18" role="img" viewBox="0 0 24 24" width="18"><path d="m12.823 1 2.974 5.002h-2.58L10.007 1H12.823ZM17.584 1l-2.972 5.002h2.58L20.399 1h-2.815Zm-6.223 1H6.002l5.003 5.002h2.58L8.232 2Zm-5.344 0H1l5.002 5.002h2.58L3.064 1.341a.508.508 0 0 0 1.954-.341ZM23 10.002h-4.002l1.666-2.502h2.89L23 10.002Zm-5.467 0h-4.002l1.666-2.502h2.336L17.533 10.002ZM11 10.002H6.998l1.666-2.502h2.336L11 10.002Zm11.002-1.001h-2.128l-1.668-2.501h1.998l1.798 2.501ZM1.5 10.002h2.834L2.668 7.501H1.5v2.501Zm21.5 1.498H22V10.75h1v.75ZM1 22.25V11.503h22V22.25a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75ZM11 12.502H6.5v2.502H11v-2.502Zm-6 0H2.5v2.502H5v-2.502Zm6 4.002H6.5v2.501H11v-2.501Zm-6 0H2.5v2.501H5v-2.501Zm12-4.002h-4.5v2.502h4.5v-2.502Zm0 4.002h-4.5v2.501h4.5v-2.501Zm6-4.002h-4.5v2.502h4.5v-2.502Zm0 4.002h-4.5v2.501h4.5v-2.501Z"></path></svg>
                </div>
            )}
        </div>
    );
};

export default ExplorePostCard;
