import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const HelpHome = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [featuredArticles, setFeaturedArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await api.get('/help/articles/featured');
                if (response.data.status === 'success') {
                    setFeaturedArticles(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching featured help articles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/help/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="flex flex-col w-full max-w-4xl mx-auto">
            {/* Search Header */}
            <div className="flex flex-col items-center justify-center py-12 md:py-16 text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FF0080] via-[#FF4D4D] to-[#FDBB2D] pb-2">
                    How can we help you?
                </h1>

                <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <Search className="h-6 w-6 text-gray-400" />
                    </div>
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-14 pr-4 py-4 md:py-5 text-lg border border-gray-200 dark:border-gray-800 rounded-full shadow-lg focus:ring-2 focus:ring-[#FF4D4D] focus:border-transparent bg-white dark:bg-[#121212] transition-all hover:shadow-xl dark:text-white"
                        placeholder="Search for articles, topics, or issues..."
                    />
                </form>
            </div>

            {/* Featured Articles Section */}
            <div className="mt-8 md:mt-12">
                <h2 className="text-2xl font-bold mb-6 text-text-primary px-2 border-l-4 border-[#FF4D4D] pl-4">
                    Popular Topics
                </h2>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-40 bg-gray-100 dark:bg-gray-900 rounded-xl animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredArticles.map(article => (
                            <Link
                                to={`/help/article/${article.slug}`}
                                key={article.id}
                                className="group block p-6 bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300"
                            >
                                <h3 className="text-lg font-bold text-text-primary group-hover:text-[#0095f6] mb-3 line-clamp-2 leading-tight">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-text-secondary line-clamp-3 leading-relaxed">
                                    {article.content.substring(0, 120)}...
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* "Looking for something else?" Section */}
            <div className="mt-16 bg-[#FAFAFA] dark:bg-[#121212] rounded-3xl p-8 md:p-12 text-center border border-gray-100 dark:border-gray-800">
                <h3 className="text-2xl font-bold mb-4 text-text-primary">Still need help?</h3>
                <p className="text-text-secondary mb-8 max-w-xl mx-auto text-lg leading-relaxed">
                    Our support team is always here to assist you with any issues you might encounter while using Jaadoe.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/settings/report" className="px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:opacity-80 transition-opacity shadow-lg">
                        Report a Problem
                    </Link>
                    <Link to="/settings/privacy_center" className="px-8 py-3.5 bg-white dark:bg-black text-black dark:text-white border border-gray-200 dark:border-gray-700 font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors shadow-sm">
                        Privacy Checkup
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HelpHome;
