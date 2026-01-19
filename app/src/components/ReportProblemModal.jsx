import { useState, useRef, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

const ReportProblemModal = ({ onClose }) => {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const modalRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const handleSend = async () => {
        if (!text.trim()) return;

        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/65 z-[1000] flex items-center justify-center animate-in fade-in duration-200">
            <div
                ref={modalRef}
                className="bg-white dark:bg-[#262626] w-[400px] md:w-[448px] rounded-xl overflow-hidden shadow-xl animate-in zoom-in-95 duration-200"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border dark:border-[#363636]">
                    <h2 className="text-base font-bold flex-1 text-center text-text-primary">Report a problem</h2>
                    <button onClick={onClose} className="text-text-primary absolute right-4">
                        <X size={24} />
                    </button>
                    {/* Placeholder for centering */}
                    <div className="w-6 h-6"></div>
                </div>

                {/* Body */}
                <div className="p-4">
                    <textarea
                        className="w-full h-[120px] resize-none bg-transparent text-text-primary placeholder:text-text-secondary outline-none text-base"
                        placeholder="Please include as much info as possible..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        autoFocus
                    />

                    <div className="mt-2">
                        <button className="bg-secondary hover:bg-[#e0e0e0] dark:bg-[#363636] dark:hover:bg-[#464646] text-text-primary text-sm font-semibold py-1.5 px-4 rounded-lg transition-colors">
                            Add file
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 pt-0">
                    <p className="text-xs text-text-secondary mb-4">
                        Your Jaadoe username and browser information will be automatically included in your report.
                    </p>

                    <button
                        onClick={handleSend}
                        disabled={!text.trim() || isLoading}
                        className={`w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center transition-colors
                            ${!text.trim() || isLoading
                                ? 'bg-primary/50 text-white/50 cursor-not-allowed bg-blue-300'
                                : 'bg-blue-btn hover:bg-blue-btn-hover text-white'
                            }`}
                    >
                        {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Send report'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportProblemModal;
