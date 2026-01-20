import { useState, useEffect, useRef, useCallback } from 'react';
import ExploreGrid from '../components/explore/ExploreGrid';
import { getExplorePosts } from '../services/exploreApi';

const ExplorePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const LIMIT = 18; // Multiple of 3 for nice grid

    const observer = useRef();
    const lastPostElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setOffset(prevOffset => prevOffset + LIMIT);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    useEffect(() => {
        const fetchExplore = async () => {
            setLoading(true);
            const newPosts = await getExplorePosts(LIMIT, offset);

            setPosts(prev => {
                // Deduplicate logic just in case backend or race condition causes overlap
                const existingIds = new Set(prev.map(p => p.id));
                const uniqueNewPosts = newPosts.filter(p => !existingIds.has(p.id));
                return [...prev, ...uniqueNewPosts];
            });

            setHasMore(newPosts.length === LIMIT);
            setLoading(false);
        };

        fetchExplore();
    }, [offset]);

    return (
        <div className="w-full min-h-screen bg-primary transition-all duration-300">
            <div className="pt-8 px-4 w-full">
                <ExploreGrid posts={posts} />

                {/* Infinite Scroll Trigger / Loading Indicator */}
                <div ref={lastPostElementRef} className="h-20 flex justify-center items-center w-full">
                    {loading && (
                        <div className="w-8 h-8 border-4 border-text-secondary border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {!hasMore && posts.length > 0 && (
                        <div className="text-text-secondary text-sm font-semibold">You've seen it all!</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExplorePage;
