import { Heart, MessageCircle } from 'lucide-react';

// Grid icon for the empty state
const Grid = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
);

const ProfileGrid = ({ posts }) => {
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



    const getMediaUrl = (url) => {
        if (!url) return undefined;
        if (url.startsWith('http')) return url;
        return url;
    };

    return (
        <div className="grid grid-cols-3 gap-1">
            {posts.map((post) => (
                <div key={post.id} className="relative aspect-square group cursor-pointer bg-black/20">
                    {post.mediaType === 'VIDEO' ? (
                        <video src={getMediaUrl(post.mediaUrl)} className="w-full h-full object-cover" />
                    ) : (
                        <img src={getMediaUrl(post.mediaUrl || post.imageUrl)} alt="Post" className="w-full h-full object-cover" />
                    )}

                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white">
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
