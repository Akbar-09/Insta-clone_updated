import { Component, Copy, Play } from 'lucide-react';


const EXPLORE_POSTS = [
    { id: 1, type: 'video', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=500&fit=crop' },
    { id: 2, type: 'image', image: 'https://images.unsplash.com/photo-1542272617-08f086303b9b?w=500&h=500&fit=crop' },
    { id: 3, type: 'multiple', image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=500&h=500&fit=crop' },
    { id: 4, type: 'image', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&h=500&fit=crop' },
    { id: 5, type: 'video', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop' },
    { id: 6, type: 'image', image: 'https://images.unsplash.com/photo-1502224562085-639556652f33?w=500&h=500&fit=crop' },
    { id: 7, type: 'image', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&h=500&fit=crop' },
    { id: 8, type: 'multiple', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=500&fit=crop' },
    { id: 9, type: 'image', image: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=500&h=500&fit=crop' },
    { id: 10, type: 'video', image: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=500&h=500&fit=crop' },
    { id: 11, type: 'image', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=500&fit=crop' },
    { id: 12, type: 'image', image: 'https://images.unsplash.com/photo-1529139574466-a302d27f6054?w=500&h=500&fit=crop' }
];

const Explore = () => {
    return (
        <div className="w-full max-w-[975px] mx-auto pb-6">
            <div className="grid grid-cols-3 gap-1 max-md:gap-[1px]">
                {EXPLORE_POSTS.map(post => (
                    <div key={post.id} className="relative w-full pb-[100%] cursor-pointer overflow-hidden bg-secondary group">
                        <img src={post.image} alt="Explore content" className="absolute top-0 left-0 w-full h-full object-cover" />
                        <div className="absolute top-0 left-0 w-full h-full bg-black/30 flex justify-center items-center opacity-0 transition-opacity duration-100 group-hover:opacity-100">
                            <div className="flex gap-4">
                                {/* Icons for type */}
                                {post.type === 'video' && <Play size={24} fill="white" stroke="white" />}
                                {post.type === 'multiple' && <Copy size={24} fill="white" stroke="white" style={{ transform: 'rotate(180deg)' }} />}
                            </div>
                        </div>
                        {/* Top right icon (always visible if type matches, or on hover? Instagram shows type icon in top right usually) */}
                        <div className="absolute top-2 right-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                            {post.type === 'video' && <Play size={18} fill="white" stroke="white" />}
                            {post.type === 'multiple' && <Copy size={18} fill="white" stroke="white" style={{ transform: 'rotate(180deg)' }} />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Explore;
