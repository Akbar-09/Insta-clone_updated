import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { reportPost } from '../api/reportApi';

const REPORT_CATEGORIES = [
    {
        id: 'spam',
        label: "Spam",
        subcategories: [
            "Fake engagement",
            "Repetitive content",
            "Misleading links"
        ]
    },
    {
        id: 'bullying',
        label: "Bullying or harassment",
        subcategories: [
            "Being harassed",
            "Threats",
            "Blackmail",
            "Someone being bullied",
            "Someone imitating me"
        ]
    },
    {
        id: 'violence',
        label: "Violence or dangerous organizations",
        subcategories: [
            "Violence",
            "Dangerous organizations",
            "Terrorist content"
        ]
    },
    {
        id: 'hate',
        label: "Hate speech or symbols",
        subcategories: [
            "Hate speech",
            "Hateful symbols",
            "Discrimination"
        ]
    },
    {
        id: 'nudity',
        label: "Nudity or sexual activity",
        subcategories: [
            "Nudity",
            "Sexual activity",
            "Child exploitation"
        ]
    },
    {
        id: 'scam',
        label: "Scam or fraud",
        subcategories: [
            "Fake giveaway",
            "Phishing attempt",
            "Financial scam",
            "Impersonation"
        ]
    },
    {
        id: 'false_information',
        label: "False information",
        subcategories: [
            "Health misinformation",
            "Political misinformation",
            "Manipulated media"
        ]
    },
    {
        id: 'other',
        label: "Something else",
        subcategories: [
            "Intellectual property violation",
            "Sale of illegal goods",
            "Other concern"
        ]
    }
];

const ReportModal = ({ postId, onClose, onReport }) => {
    const [step, setStep] = useState('categories'); // categories, subcategories, submitted
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [animating, setAnimating] = useState(false);

    // Close on ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleCategorySelect = (category) => {
        if (animating) return;
        setAnimating(true);
        setTimeout(() => {
            setSelectedCategory(category);
            setStep('subcategories');
            setAnimating(false);
        }, 300); // Wait for transition
    };

    const handleBack = () => {
        if (animating) return;
        setAnimating(true);
        setTimeout(() => {
            setStep('categories');
            setSelectedCategory(null);
            setAnimating(false);
        }, 300);
    };

    const handleSubmit = async (detail) => {
        setLoading(true);
        try {
            // Send category.id (enum value) instead of label
            if (onReport) {
                await onReport(selectedCategory.id, detail);
            } else {
                await reportPost(postId, selectedCategory.id, detail);
            }
            setStep('submitted');
        } catch (error) {
            console.error("Report failed", error);
            const serverMessage = error.response?.data?.message || 'Failed to submit report. Please try again.';
            alert(serverMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div
                className="bg-[#262626] w-full max-w-[400px] rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh] relative animate-scale-in"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="border-b border-[#363636] px-4 py-3 flex items-center justify-between sticky top-0 bg-[#262626] z-10">
                    <div className="w-8">
                        {step === 'subcategories' && (
                            <button onClick={handleBack} className="text-white hover:opacity-70">
                                <ChevronLeft size={24} />
                            </button>
                        )}
                    </div>
                    <h1 className="text-white font-semibold text-base">Report</h1>
                    <div className="w-8 flex justify-end">
                        <button onClick={onClose} className="text-white hover:opacity-70">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {step === 'categories' && (
                        <div className={`p-0 transition-opacity duration-300 ${animating ? 'opacity-0 translate-x-[-20px]' : 'opacity-100'}`}>
                            <div className="p-4">
                                <h2 className="text-white font-bold text-lg mb-1">Why are you reporting this post?</h2>
                                <p className="text-[#A8A8A8] text-sm">
                                    Your report is anonymous, except if you're reporting an intellectual property infringement.
                                    If someone is in immediate danger, call the local emergency services - don't wait.
                                </p>
                            </div>
                            <div className="flex flex-col">
                                {REPORT_CATEGORIES.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => handleCategorySelect(category)} // Fixed: Wrap in function
                                        className="flex items-center justify-between px-4 py-3.5 hover:bg-[#363636] transition-colors border-b border-[#363636]/30 last:border-none group text-left w-full"
                                    >
                                        <span className="text-white text-base">{category.label}</span>
                                        <ChevronRight size={20} className="text-[#A8A8A8] group-hover:text-white" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 'subcategories' && selectedCategory && (
                        <div className={`p-0 transition-opacity duration-300 ${animating ? 'opacity-0 translate-x-[20px]' : 'opacity-100'}`}>
                            <div className="p-4">
                                <h2 className="text-white font-bold text-lg mb-1">{selectedCategory.label}</h2>
                                <p className="text-[#A8A8A8] text-sm">
                                    Choose the best match.
                                </p>
                            </div>
                            <div className="flex flex-col">
                                {selectedCategory.subcategories.map(sub => (
                                    <button
                                        key={sub}
                                        onClick={() => handleSubmit(sub)}
                                        disabled={loading}
                                        className="flex items-center justify-between px-4 py-3.5 hover:bg-[#363636] transition-colors border-b border-[#363636]/30 last:border-none text-left w-full"
                                    >
                                        <span className="text-white text-base">{sub}</span>
                                        {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 'submitted' && (
                        <div className="p-8 flex flex-col items-center text-center animate-fade-in">
                            <div className="w-16 h-16 rounded-full border-2 border-green-500 flex items-center justify-center mb-4 text-green-500">
                                <CheckCircle size={32} />
                            </div>
                            <h2 className="text-white font-bold text-xl mb-2">Thanks for letting us know</h2>
                            <p className="text-[#A8A8A8] text-sm mb-6">
                                Your report helps keep our community safe. We'll review the post and remove it if it goes against our Community Guidelines.
                            </p>
                            <button
                                onClick={onClose}
                                className="w-full bg-[#0095F6] hover:bg-[#1877F2] text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportModal;
