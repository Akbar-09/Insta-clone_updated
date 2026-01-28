import ExplorePostCard from './ExplorePostCard';

const ExploreGrid = ({ posts }) => {
    return (
        <div className="grid grid-cols-3 gap-[4px] max-w-[975px] mx-auto pb-8 grid-flow-dense auto-rows-[minmax(100px,auto)] px-4">
            {posts.map((post, index) => {
                // Precise Instagram Explore Pattern (10-post cycle)
                const i = index % 10;
                // Index 2 is the tall post on the right side
                // Index 5 is the tall post on the left side
                const isTall = (i === 2 || i === 5);
                const spanClass = isTall ? 'row-span-2' : '';

                return (
                    <div key={post.id} className={spanClass}>
                        <ExplorePostCard post={post} isLarge={isTall} />
                    </div>
                );
            })}
        </div>
    );
};

export default ExploreGrid;
