import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, FileText } from 'lucide-react';
import api from '../../api/axios';

const CategoryPage = () => {
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch category details and its articles
                const response = await api.get(`/help/category/${slug}`);
                if (response.data.status === 'success') {
                    setCategory(response.data.data.category);
                    setArticles(response.data.data.articles);
                } else {
                    setError('Category not found');
                }
            } catch (err) {
                console.error('Error fetching category:', err);
                setError('Failed to load category. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchCategoryData();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto py-8 animate-pulse space-y-6">
                <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
                <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-24 bg-gray-100 dark:bg-gray-900 rounded-xl"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error || !category) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Category not found</h2>
                <Link to="/help" className="text-[#0095f6] hover:underline font-semibold">
                    Back to Help Centre
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-gray-500 mb-8">
                <Link to="/help" className="hover:text-[#0095f6] transition-colors">Help Centre</Link>
                <ChevronRight size={14} className="mx-2" />
                <span className="text-gray-900 dark:text-white font-medium">{category.name}</span>
            </nav>

            {/* Header */}
            <div className="mb-10 text-center md:text-left border-b border-gray-100 dark:border-gray-800 pb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
                    {category.name}
                </h1>
                {category.description && (
                    <p className="text-lg text-text-secondary max-w-2xl">
                        {category.description}
                    </p>
                )}
            </div>

            {/* Articles List */}
            <div className="space-y-4">
                {articles.length > 0 ? (
                    articles.map(article => (
                        <Link
                            key={article.id}
                            to={`/help/article/${article.slug}`}
                            className="group flex items-center p-6 bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 transforms hover:-translate-y-1"
                        >
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full mr-5 text-[#0095f6]">
                                <FileText size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-text-primary group-hover:text-[#0095f6] mb-1 transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-text-secondary line-clamp-2">
                                    {article.excerpt || article.content.substring(0, 100)}...
                                </p>
                            </div>
                            <ChevronRight size={20} className="text-gray-400 group-hover:text-[#0095f6] transform group-hover:translate-x-1 transition-all" />
                        </Link>
                    ))
                ) : (
                    <div className="text-center py-12 bg-gray-50 dark:bg-[#121212] rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                        <p className="text-lg text-text-secondary">No articles found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
