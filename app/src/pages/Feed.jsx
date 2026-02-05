import PostCard from '../components/PostCard';
import Stories from '../components/Stories';
import useFeed from '../hooks/useFeed';

const Feed = () => {
    const { posts, loading, error, syncPostLike } = useFeed();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-text-primary">Loading feed...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col relative w-full max-w-[600px] mx-auto">
            <div className="sticky top-0 z-10 bg-transparent backdrop-blur-xl pt-4 pb-2 -mt-4 mb-2">
                <Stories />
            </div>

            <div className="mt-0 flex flex-col items-stretch px-0 md:px-4">
                {posts.length === 0 ? (
                    <div className="text-text-secondary py-10">No posts yet. Follow people to see their posts!</div>
                ) : (
                    posts.map(post => (
                        <PostCard key={post.id} post={post} onLikeUpdate={syncPostLike} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Feed;
