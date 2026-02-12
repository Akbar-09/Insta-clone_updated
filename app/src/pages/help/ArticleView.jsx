import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, ChevronRight, Clock, User, Share2 } from 'lucide-react';
import api from '../../api/axios';
import { format } from 'date-fns';

const ArticleView = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState(null); // 'yes' | 'no' | null
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get(`/help/article/${slug}`);
                if (response.data.status === 'success') {
                    setArticle(response.data.data.article); // response.data.data has { article, relatedArticles }
                } else {
                    setError('Article not found');
                }
            } catch (err) {
                console.error('Error fetching article:', err);
                setError('Failed to load article. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchArticle();
        }
    }, [slug]);

    const handleFeedback = async (isHelpful) => {
        if (feedback) return; // Prevent multiple submissions locally

        try {
            await api.post('/help/feedback', {
                articleId: article.id,
                isHelpful,
                comment: '' // Optional comment field could be added
            });
            setFeedback(isHelpful ? 'yes' : 'no');
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto py-8 animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
                <div className="space-y-3 mt-8">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                </div>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Oops!</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{error || 'Article not found.'}</p>
                <Link to="/help" className="text-[#0095f6] hover:underline font-semibold">
                    Back to Help Centre
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-gray-500 mb-6">
                <Link to="/help" className="hover:text-[#0095f6] transition-colors">Help Centre</Link>
                <ChevronRight size={14} className="mx-2" />
                {article.Category && (
                    <>
                        <span className="hover:text-[#0095f6] cursor-pointer transition-colors">
                            {article.Category.name}
                        </span>
                        <ChevronRight size={14} className="mx-2" />
                    </>
                )}
                <span className="text-gray-800 dark:text-gray-200 font-medium truncate max-w-[200px]">
                    {article.title}
                </span>
            </nav>

            {/* Title & Metadata */}
            <header className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 leading-tight">
                    {article.title}
                </h1>
                <div className="flex items-center text-sm text-gray-500 space-x-6">
                    <div className="flex items-center">
                        <User size={16} className="mr-2" />
                        <span>Jaadoe Support</span>
                    </div>
                    <div className="flex items-center">
                        <Clock size={16} className="mr-2" />
                        <span>Updated {format(new Date(article.updatedAt), 'MMM d, yyyy')}</span>
                    </div>
                </div>
            </header>

            {/* Article Content */}
            <article className="prose prose-lg dark:prose-invert max-w-none mb-12 text-text-primary leading-relaxed">
                {/* 
                   Safety note: For a real app, use a sanitizer like dompurify before rendering HTML.
                   Since this is an internal reliable source for now, we're assuming plain text or safe HTML.
                   If the content is Markdown, we'd use ReactMarkdown.
                   Here we'll render it as text/simple paragraphs for the prototype.
                */}
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </article>

            {/* Feedback Section */}
            <div className="bg-gray-50 dark:bg-[#121212] rounded-xl p-8 border border-gray-100 dark:border-gray-800 text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Was this article helpful?
                </h3>

                {!feedback ? (
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => handleFeedback(true)}
                            className="flex items-center px-6 py-2.5 bg-white dark:bg-[#262626] border border-gray-200 dark:border-gray-700 rounded-full hover:border-[#0095f6] hover:text-[#0095f6] transition-all shadow-sm"
                        >
                            <ThumbsUp size={18} className="mr-2" />
                            Yes
                        </button>
                        <button
                            onClick={() => handleFeedback(false)}
                            className="flex items-center px-6 py-2.5 bg-white dark:bg-[#262626] border border-gray-200 dark:border-gray-700 rounded-full hover:border-red-500 hover:text-red-500 transition-all shadow-sm"
                        >
                            <ThumbsDown size={18} className="mr-2" />
                            No
                        </button>
                    </div>
                ) : (
                    <div className="text-green-600 dark:text-green-400 font-medium animate-fade-in">
                        Thank you for your feedback!
                    </div>
                )}
            </div>

            {/* Related/Share */}
            <div className="mt-8 flex justify-end">
                <button className="flex items-center text-sm text-gray-500 hover:text-[#0095f6] transition-colors">
                    <Share2 size={16} className="mr-2" />
                    Share this article
                </button>
            </div>
        </div>
    );
};

export default ArticleView;
