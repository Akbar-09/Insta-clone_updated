import { forwardRef, useState, useEffect } from 'react';
import { X, XCircle } from 'lucide-react';
import { searchUsers } from '../services/searchApi';
import { useNavigate } from 'react-router-dom';
import UserCard from './UserCard';

const SearchDrawer = forwardRef(({ isOpen, onClose }, ref) => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [recent, setRecent] = useState([]); // In a real app, fetch from API/Local Storage

    // Debounce search
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (query.trim().length > 0) {
                setIsLoading(true);
                try {
                    const data = await searchUsers(query);

                    const mapped = data.map(item => {
                        if (item.type === 'USER') {
                            return {
                                type: 'USER',
                                id: item.referenceId,
                                username: item.content,
                                name: item.metadata?.fullName || item.content,
                                avatar: item.metadata?.profilePicture || `https://ui-avatars.com/api/?name=${item.content}&background=random`,
                                isFollowing: item.isFollowing
                            };
                        } else if (item.type === 'HASHTAG') {
                            return {
                                type: 'HASHTAG',
                                id: item.id,
                                name: item.content,
                                postsCount: item.metadata?.postCount || 0
                            };
                        }
                        return null;
                    }).filter(Boolean);

                    setResults(mapped);
                } catch (err) {
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    if (!isOpen) return null;

    const handleClear = () => {
        setQuery('');
        setResults([]);
    };

    return (
        <div ref={ref} className="absolute top-0 left-[72px] bottom-0 w-[397px] bg-primary border-r border-border rounded-r-2xl py-6 z-[99] shadow-[4px_0_24px_rgba(0,0,0,0.15)] flex flex-col transition-transform duration-300">
            <div className="px-6 pb-9 pt-3">
                <h2 className="text-2xl font-semibold">Search</h2>
            </div>

            <div className="mx-4 mb-6 relative">
                <input
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-secondary border-none rounded-lg px-4 py-3 text-base outline-none placeholder:text-text-secondary placeholder:font-light pr-10"
                    autoFocus
                />
                {/* Clear Icon or Loading Spinner */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer flex">
                    {isLoading ? (
                        <div className="w-4 h-4 border-2 border-text-secondary border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        query && <XCircle size={16} color="#c7c7c7" onClick={handleClear} />
                    )}
                </div>
            </div>

            <div className="flex-grow overflow-y-auto custom-scrollbar">
                {query.length === 0 ? (
                    <>
                        <div className="flex justify-between px-6 pb-3 mt-2.5">
                            <h3 className="text-base font-semibold">Recent</h3>
                            <button className="text-blue-btn font-semibold text-sm cursor-pointer hover:text-blue-btn-hover bg-transparent border-none">Clear All</button>
                        </div>
                        {/* Placeholder for Recent Searches */}
                        <div className="px-6 py-4 text-center text-text-secondary text-sm">
                            No recent searches.
                        </div>
                    </>
                ) : (
                    <>
                        {results.length === 0 && !isLoading ? (
                            <div className="px-6 py-4 text-center text-text-secondary text-sm">
                                No results found.
                            </div>
                        ) : (
                            results.map(item => {
                                if (item.type === 'USER') {
                                    return (
                                        <UserCard
                                            key={`user-${item.id}`}
                                            user={item}
                                            onUserClick={() => {
                                                navigate(`/profile/${item.username}`);
                                                onClose();
                                            }}
                                        />
                                    );
                                } else {
                                    return (
                                        <div
                                            key={`tag-${item.id}`}
                                            onClick={() => {
                                                navigate(`/explore/tags/${item.name.replace('#', '')}`);
                                                onClose();
                                            }}
                                            className="flex items-center px-6 py-2 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                                        >
                                            <div className="w-11 h-11 rounded-full border border-border flex items-center justify-center mr-3 shrink-0">
                                                <span className="text-xl font-light">#</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-sm">{item.name}</span>
                                                <span className="text-xs text-text-secondary">{item.postsCount.toLocaleString()} posts</span>
                                            </div>
                                        </div>
                                    );
                                }
                            })
                        )}
                    </>
                )}
            </div>
        </div>
    );
});

SearchDrawer.displayName = 'SearchDrawer';

export default SearchDrawer;
