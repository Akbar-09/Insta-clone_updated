import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const GlobalSearch = () => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    // Mock search results
    const allResults = {
        users: [
            { id: 1, type: 'user', name: '@john_doe', subtitle: 'john@example.com' },
            { id: 2, type: 'user', name: '@jane_smith', subtitle: 'jane@example.com' },
        ],
        posts: [
            { id: 1, type: 'post', name: 'Beautiful sunset photo', subtitle: 'by @emma_watson' },
            { id: 2, type: 'post', name: 'Travel vlog compilation', subtitle: 'by @chris_evans' },
        ],
        reels: [
            { id: 1, type: 'reel', name: 'Dance challenge', subtitle: 'by @olivia_brown' },
        ],
        reports: [
            { id: 1, type: 'report', name: 'Harassment report #1234', subtitle: 'Pending review' },
        ],
    };

    const filteredResults = query.length > 0 ? {
        users: allResults.users.filter(u => u.name.toLowerCase().includes(query.toLowerCase())),
        posts: allResults.posts.filter(p => p.name.toLowerCase().includes(query.toLowerCase())),
        reels: allResults.reels.filter(r => r.name.toLowerCase().includes(query.toLowerCase())),
        reports: allResults.reports.filter(r => r.name.toLowerCase().includes(query.toLowerCase())),
    } : { users: [], posts: [], reels: [], reports: [] };

    const totalResults = Object.values(filteredResults).reduce((acc, arr) => acc + arr.length, 0);

    return (
        <div className="relative">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search users, posts, reels, reports..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(e.target.value.length > 0);
                    }}
                    onFocus={() => query.length > 0 && setIsOpen(true)}
                    className="w-full md:w-96 pl-10 pr-10 py-2.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20 text-sm"
                />
                {query && (
                    <button
                        onClick={() => {
                            setQuery('');
                            setIsOpen(false);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            {/* Dropdown Results */}
            {isOpen && totalResults > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-white/10 max-h-96 overflow-y-auto z-50">
                    {filteredResults.users.length > 0 && (
                        <div className="p-2">
                            <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Users</p>
                            {filteredResults.users.map((user) => (
                                <button
                                    key={user.id}
                                    className="w-full px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-left"
                                >
                                    <p className="font-semibold text-sm text-gray-800 dark:text-white">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.subtitle}</p>
                                </button>
                            ))}
                        </div>
                    )}

                    {filteredResults.posts.length > 0 && (
                        <div className="p-2 border-t border-gray-200 dark:border-white/10">
                            <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Posts</p>
                            {filteredResults.posts.map((post) => (
                                <button
                                    key={post.id}
                                    className="w-full px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-left"
                                >
                                    <p className="font-semibold text-sm text-gray-800 dark:text-white">{post.name}</p>
                                    <p className="text-xs text-gray-500">{post.subtitle}</p>
                                </button>
                            ))}
                        </div>
                    )}

                    {filteredResults.reels.length > 0 && (
                        <div className="p-2 border-t border-gray-200 dark:border-white/10">
                            <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Reels</p>
                            {filteredResults.reels.map((reel) => (
                                <button
                                    key={reel.id}
                                    className="w-full px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-left"
                                >
                                    <p className="font-semibold text-sm text-gray-800 dark:text-white">{reel.name}</p>
                                    <p className="text-xs text-gray-500">{reel.subtitle}</p>
                                </button>
                            ))}
                        </div>
                    )}

                    {filteredResults.reports.length > 0 && (
                        <div className="p-2 border-t border-gray-200 dark:border-white/10">
                            <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Reports</p>
                            {filteredResults.reports.map((report) => (
                                <button
                                    key={report.id}
                                    className="w-full px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-left"
                                >
                                    <p className="font-semibold text-sm text-gray-800 dark:text-white">{report.name}</p>
                                    <p className="text-xs text-gray-500">{report.subtitle}</p>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {isOpen && totalResults === 0 && query.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-white/10 p-4 z-50">
                    <p className="text-sm text-gray-500 text-center">No results found for "{query}"</p>
                </div>
            )}
        </div>
    );
};

export default GlobalSearch;
