import { Heart, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProxiedUrl } from '../../utils/urlUtils';

// Grid icon for the empty state
const Grid = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
);

const ProfileGrid = ({ posts }) => {
    const navigate = useNavigate();

    const getMediaUrl = (url) => getProxiedUrl(url);

    if (posts.length === 0) {
        return (
            <div className="py-20 flex flex-col items-center text-center text-gray-400">
                <div className="w-[62px] h-[62px] border-2 border-white rounded-full flex items-center justify-center mb-4 text-white">
                    <Grid size={30} />
                </div>
                <h2 className="text-xl font-extrabold mb-2 text-white">No Posts Yet</h2>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 gap-1">
            {posts.map((post, index) => (
                <div
                    key={`${post.id}-${index}`}
                    onClick={() => navigate(`/post/${post.id}`, {
                        state: {
                            postIds: posts.map(p => p.id),
                            currentIndex: index
                        }
                    })}
                    className="relative aspect-square group cursor-pointer bg-black/20 overflow-hidden"
                >
                    {post.mediaType === 'VIDEO' || post.videoUrl ? (
                        <video
                            src={getMediaUrl(post.mediaUrl || post.videoUrl)}
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                        />
                    ) : (
                        <img
                            src={getMediaUrl(post.mediaUrl || post.imageUrl)}
                            alt="Post"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://ui-avatars.com/api/?name=Post&background=f3f4f6&color=9ca3af&size=256&semibold=true&format=svg';
                            }}
                        />
                    )}

                    {/* Video Icon Indicator */}
                    {(post.mediaType === 'VIDEO' || post.videoUrl) && (
                        <div className="absolute top-2 right-2 text-white drop-shadow-md z-10 transition-opacity group-hover:opacity-0">
                            <svg aria-label="Clip" className="fill-white" height="18" role="img" viewBox="0 0 24 24" width="18"><path d="m12.823 1 2.974 5.002h-2.58L10.007 1H12.823ZM17.584 1l-2.972 5.002h2.58L20.399 1h-2.815Zm-6.223 1H6.002l5.003 5.002h2.58L8.232 2Zm-5.344 0H1l5.002 5.002h2.58L3.064 1.341a.508.508 0 0 0 1.954-.341ZM23 10.002h-4.002l1.666-2.502h2.89L23 10.002Zm-5.467 0h-4.002l1.666-2.502h2.336L17.533 10.002ZM11 10.002H6.998l1.666-2.502h2.336L11 10.002Zm11.002-1.001h-2.128l-1.668-2.501h1.998l1.798 2.501ZM1.5 10.002h2.834L2.668 7.501H1.5v2.501Zm21.5 1.498H22V10.75h1v.75ZM1 22.25V11.503h22V22.25a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75ZM11 12.502H6.5v2.502H11v-2.502Zm-6 0H2.5v2.502H5v-2.502Zm6 4.002H6.5v2.501H11v-2.501Zm-6 0H2.5v2.501H5v-2.501Zm12-4.002h-4.5v2.502h4.5v-2.502Zm0 4.002h-4.5v2.501h4.5v-2.501Zm6-4.002h-4.5v2.502h4.5v-2.502Zm0 4.002h-4.5v2.501h4.5v-2.501Z"></path></svg>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-6 text-white z-20">
                        <div className="flex items-center gap-2">
                            <Heart size={20} fill="white" className="drop-shadow-sm" />
                            <span className="font-bold text-base drop-shadow-sm">{post.likesCount || 0}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MessageCircle size={20} fill="white" className="drop-shadow-sm" />
                            <span className="font-bold text-base drop-shadow-sm">{post.commentsCount || 0}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProfileGrid;
