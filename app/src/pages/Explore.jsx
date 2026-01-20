import { useState, useEffect } from 'react';
import { Component, Copy, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getExplorePosts } from '../api/postActionsApi';

const Explore = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await getExplorePosts();
                setPosts(res.data.data || []);
            } catch (error) {
                console.error('Failed to fetch explore posts', error);
            }
        };
        fetchPosts();
    }, []);

    // Helper to determine span classes based on index
    const getSpanClass = (index) => {
        const i = index % 10;
        if (i === 2) return 'row-span-2 col-start-3';
        if (i === 5) return 'row-span-2 col-start-1';
        return '';
    };

    return (
        <div className="w-full max-w-[975px] mx-auto pb-6 pt-4">
            <div className="grid grid-cols-3 gap-1 max-md:gap-[1px] auto-rows-[minmax(100px,auto)] grid-flow-dense">
                {posts.map((post, index) => (
                    <div
                        key={post.id}
                        onClick={() => navigate(`/post/${post.id}`)}
                        className={`relative w-full cursor-pointer overflow-hidden bg-secondary group ${getSpanClass(index)} ${getSpanClass(index) ? 'aspect-[1/2]' : 'aspect-square'}`}
                    >
                        <img src={post.mediaUrl || post.image} alt="Explore content" className="absolute top-0 left-0 w-full h-full object-cover" />

                        {/* Hover Overlay */}
                        <div className="absolute top-0 left-0 w-full h-full bg-black/30 flex justify-center items-center opacity-0 transition-opacity duration-100 group-hover:opacity-100 z-10">
                            <div className="flex gap-4">
                                {post.mediaType === 'VIDEO' && <Play size={24} fill="white" stroke="white" />}
                                {post.mediaType === 'CAROUSEL' && <Copy size={24} fill="white" stroke="white" style={{ transform: 'rotate(180deg)' }} />}
                            </div>
                        </div>

                        {/* Type Icon (Always visible) */}
                        <div className="absolute top-2 right-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] z-20">
                            {post.mediaType === 'VIDEO' && <Play size={18} fill="white" stroke="white" />}
                            {post.mediaType === 'CAROUSEL' && <Copy size={18} fill="white" stroke="white" style={{ transform: 'rotate(180deg)' }} />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Explore;
