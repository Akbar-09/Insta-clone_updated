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

    const handlePostClick = (post, index) => {
        const postMetadata = posts.map(p => ({ id: p.id, type: p.type || 'POST' }));
        navigate(`/post/${post.id}`, {
            state: {
                postMetadata,
                currentIndex: index,
                type: post.type || 'POST'
            }
        });
    };

    const getProxiedUrl = (url) => {
        if (!url) return '';
        if (typeof url !== 'string') return url;

        if (!url.startsWith('http') && !url.startsWith('/') && !url.startsWith('data:') && !url.startsWith('blob:')) {
            return `/api/v1/media/files/${url}`;
        }

        try {
            const cleanedUrl = url.replace(/^http:\/\/(localhost|127\.0\.0\.1|192\.168\.1\.\d+):(5000|5175|8000|5173|5174)/, '');
            if (cleanedUrl !== url) return cleanedUrl;

            if (url.includes('r2.dev')) {
                const parts = url.split('.dev/');
                if (parts.length > 1) return `/api/v1/media/files/${parts[1]}`;
            }

            if (url.includes('/media/files') && !url.includes('/api/v1/')) {
                return url.replace('/media/files', '/api/v1/media/files');
            }

            if (url.startsWith('/uploads/')) {
                return url.replace('/uploads/', '/api/v1/media/files/');
            }
        } catch (e) {
            console.warn('URL proxying failed:', e);
        }
        return url;
    };

    // Helper to get the correct thumbnail/image URL for display
    const getDisplayUrl = (post) => {
        let url;
        if (post.mediaType === 'VIDEO') {
            url = post.thumbnailUrl || post.mediaUrl || post.image;
        } else {
            url = post.mediaUrl || post.image;
        }
        return getProxiedUrl(url);
    };


    return (
        <div className="w-full max-w-[975px] mx-auto pb-6 pt-4">
            <div className="grid grid-cols-3 gap-1 max-md:gap-[1px] auto-rows-[minmax(100px,auto)] grid-flow-dense">
                {posts.map((post, index) => (
                    <div
                        key={post.id}
                        onClick={() => handlePostClick(post, index)}
                        className={`relative w-full cursor-pointer overflow-hidden bg-secondary group ${getSpanClass(index)} ${getSpanClass(index) ? 'aspect-[1/2]' : 'aspect-square'}`}
                    >
                        <img
                            src={getDisplayUrl(post)}
                            alt="Explore content"
                            className="absolute top-0 left-0 w-full h-full object-cover"
                        />

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
