import ExplorePostCard from './ExplorePostCard';

const ExploreGrid = ({ posts }) => {
    return (
        <div className="grid grid-cols-3 gap-1 md:gap-4 max-w-[935px] mx-auto pb-8">
            {posts.map(post => (
                <ExplorePostCard key={post.id} post={post} />
            ))}
        </div>
    );
};

export default ExploreGrid;
