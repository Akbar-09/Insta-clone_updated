import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { helpApi } from '../api/helpApi';
import { ThumbsUp, ThumbsDown, Share2, Printer, ChevronLeft } from 'lucide-react';

const ArticlePage = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [feedbackSent, setFeedbackSent] = useState(false);

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            try {
                const res = await helpApi.getArticle(slug);
                if (res.data.status === 'success') {
                    setArticle(res.data.data);
                }
            } catch (err) {
                console.error('Failed to load article', err);
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
        window.scrollTo(0, 0);
    }, [slug]);

    const handleFeedback = async (isHelpful) => {
        try {
            await helpApi.submitFeedback({ articleId: article.id, isHelpful });
            setFeedbackSent(true);
        } catch (err) {
            console.error('Feedback failed', err);
        }
    };

    if (loading) return <div className="p-10 text-center animate-pulse">Loading article...</div>;
    if (!article) return <div className="p-10 text-center">Article not found.</div>;

    return (
        <div className="max-w-[800px] mx-auto w-full">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-[14px] text-text-secondary mb-8">
                <Link to="/" className="hover:underline">Help Home</Link>
                <span>/</span>
                <span className="text-text-primary font-medium">{article.Category?.name}</span>
            </div>

            <article className="prose prose-slate max-w-none">
                <h1 className="text-3xl md:text-4xl font-bold mb-6">{article.title}</h1>

                {/* Meta actions */}
                <div className="flex items-center gap-4 mb-10 pb-6 border-b border-border">
                    <button className="flex items-center gap-2 text-[13px] font-semibold text-text-secondary hover:text-text-primary transition-colors">
                        <Share2 size={16} /> Share
                    </button>
                    <button className="flex items-center gap-2 text-[13px] font-semibold text-text-secondary hover:text-text-primary transition-colors">
                        <Printer size={16} /> Print
                    </button>
                </div>

                <div className="text-[17px] leading-relaxed text-text-primary mb-12 whitespace-pre-wrap">
                    {article.content}
                </div>

                {/* Feedback Widget */}
                <div className="bg-[#fafafa] border border-border rounded-2xl p-8 mb-12">
                    <h4 className="text-[18px] font-bold mb-2">Was this helpful?</h4>
                    {!feedbackSent ? (
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => handleFeedback(true)}
                                className="flex items-center gap-2 px-6 py-2 bg-white border border-border rounded-lg font-bold hover:bg-[#efefef] transition-all"
                            >
                                <ThumbsUp size={18} /> Yes
                            </button>
                            <button
                                onClick={() => handleFeedback(false)}
                                className="flex items-center gap-2 px-6 py-2 bg-white border border-border rounded-lg font-bold hover:bg-[#efefef] transition-all"
                            >
                                <ThumbsDown size={18} /> No
                            </button>
                        </div>
                    ) : (
                        <p className="text-[#0095f6] font-bold">Thanks for your feedback!</p>
                    )}
                </div>
            </article>

            {/* Related Articles Footer */}
            <div className="mt-20 pt-10 border-t border-border">
                <h3 className="text-xl font-bold mb-6">Need more help?</h3>
                <div className="flex flex-col gap-4">
                    <Link to="/" className="flex items-center gap-2 text-[#0095f6] font-semibold hover:underline">
                        <ChevronLeft size={18} /> Back to Help Centre
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ArticlePage;
