import { useState } from 'react';
import { submitFeedback } from '../../api/settingsApi';
import { ArrowLeft, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HelpFeedback = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const options = [
        { label: 'Very satisfied', value: 5 },
        { label: 'Slightly satisfied', value: 4 },
        { label: 'Neutral', value: 3 },
        { label: 'Slightly dissatisfied', value: 2 },
        { label: 'Very dissatisfied', value: 1 },
    ];

    const handleSubmit = async () => {
        if (selected === null) return;
        setSubmitting(true);
        try {
            await submitFeedback({ rating: selected });
            setSubmitted(true);
            setTimeout(() => navigate('/settings/help'), 2000);
        } catch (err) {
            console.error('Feedback submission failed', err);
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center h-[400px] text-center px-6">
                <div className="w-16 h-16 bg-[#00c950] rounded-full flex items-center justify-center mb-6">
                    <X size={32} className="text-white rotate-45" />
                </div>
                <h2 className="text-xl font-bold mb-2">Thanks for your feedback!</h2>
                <p className="text-text-secondary">Your input helps us improve the help experience for everyone.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl mx-auto h-full pb-10">
            {/* Header */}
            <div className="flex items-center mb-8 mt-1">
                <button onClick={() => navigate(-1)} className="mr-0 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <div className="flex-1 flex justify-center mr-6">
                    <h2 className="text-base font-bold text-text-primary">Help</h2>
                </div>
            </div>

            {/* Back Icon */}
            <div className="mb-6">
                <button onClick={() => navigate(-1)} className="p-1 -ml-1">
                    <X size={28} strokeWidth={1.5} />
                </button>
            </div>

            <div className="max-w-[480px] mx-auto w-full">
                <h3 className="text-[15px] font-bold mb-8 leading-tight">
                    How satisfied or dissatisfied are you with the help provided for your issue?
                </h3>

                <div className="border border-border rounded-xl overflow-hidden mb-8">
                    {options.map((option, index) => (
                        <div
                            key={option.value}
                            onClick={() => setSelected(option.value)}
                            className={`flex items-center justify-between p-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${index !== options.length - 1 ? 'border-b border-border' : ''}`}
                        >
                            <span className="text-[14px] font-medium">{option.label}</span>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${selected === option.value ? 'border-[#0095f6]' : 'border-gray-300 dark:border-gray-600'}`}>
                                {selected === option.value && <div className="w-2.5 h-2.5 rounded-full bg-[#0095f6]" />}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={selected === null || submitting}
                    className={`w-full py-2.5 rounded-xl font-bold text-[14px] transition-all duration-200 flex justify-center items-center ${selected !== null ? 'bg-[#0095f6] text-white hover:bg-[#1877f2]' : 'bg-[#0095f6]/50 text-white cursor-not-allowed'}`}
                >
                    {submitting ? <Loader2 size={20} className="animate-spin" /> : 'Continue'}
                </button>
            </div>
        </div>
    );
};

export default HelpFeedback;
