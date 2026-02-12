import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../../api/axios';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query) return;

            setLoading(true);
            try {
                const response = await api.get(`/help/search?q=${encodeURIComponent(query)}`);
                if (response.data.status === 'success') {
                    setResults(response.data.data);
                }
            } catch (error) {
                console.error('Error searching articles:', error);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchResults();
        }, 300); // Simple debounce

        return () => clearTimeout(timeoutId);
    }, [query]);

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6 text-text-primary">
                Search Results for "{query}"
            </h1>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-24 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="space-y-6">
                    {results.length > 0 ? (
                        results.map(article => (
                            <Link
                                key={article.id}
                                to={`/help/article/${article.slug}`}
                                className="block p-6 bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-md transition-shadow group"
                            >
                                <h3 className="text-xl font-semibold text-[#0095f6] mb-2 group-hover:underline">
                                    {article.title}
                                </h3>
                                <p className="text-text-secondary line-clamp-2">
                                    {article.content.substring(0, 150)}...
                                </p>
                            </Link>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-gray-50 dark:bg-[#121212] rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                            <p className="text-lg text-text-secondary">No articles found matching your search.</p>
                            <p className="text-sm text-gray-500 mt-2">Try checking your spelling or use different keywords.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
