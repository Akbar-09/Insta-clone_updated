import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ExploreGrid from '../components/explore/ExploreGrid';
import { getHashtagPosts } from '../services/exploreApi';
import { ArrowLeft } from 'lucide-react';

const HashtagPage = () => {
    const { tag } = useParams();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const LIMIT = 18;

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
        // Reset state when tag changes
        setPosts([]);
        setOffset(0);
        setHasMore(true);
    }, [tag]);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const newPosts = await getHashtagPosts(tag, LIMIT, offset);

            setPosts(prev => {
                const existingIds = new Set(prev.map(p => String(p.id)));
                const uniqueNewPosts = newPosts.filter(p => !existingIds.has(String(p.id)));
                return [...prev, ...uniqueNewPosts];
            });

            setHasMore(newPosts.length === LIMIT);
            setLoading(false);
        };

        if (tag) fetchPosts();
    }, [tag, offset]);

    return (
        <div className="w-full min-h-screen bg-white dark:bg-primary transition-all duration-300">
            {/* Header */}
            <div className="max-w-[935px] mx-auto px-4 pt-8 pb-12 flex items-center">
                <div className="w-[150px] h-[150px] rounded-full border border-border flex items-center justify-center mr-12 shrink-0">
                    <span className="text-6xl font-light">#</span>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-3xl font-light mb-4">#{tag}</h1>
                    <div className="flex gap-8">
                        <div><span className="font-semibold">{posts.length}</span> posts</div>
                    </div>
                </div>
            </div>

            <div className="border-t border-border w-full">
                <div className="max-w-[935px] mx-auto pt-4">
                    <ExploreGrid posts={posts} />

                    <div ref={lastPostElementRef} className="h-20 flex justify-center items-center w-full">
                        {loading && (
                            <div className="w-8 h-8 border-4 border-text-secondary border-t-transparent rounded-full animate-spin"></div>
                        )}
                        {!hasMore && posts.length > 0 && (
                            <div className="text-text-secondary text-sm font-semibold">End of results</div>
                        )}
                        {!loading && posts.length === 0 && (
                            <div className="text-text-secondary text-sm font-semibold">No posts found for this hashtag.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HashtagPage;
