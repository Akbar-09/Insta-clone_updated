import { useState, useRef, useEffect } from 'react';
import { X, Loader2, Image as ImageIcon } from 'lucide-react';
import { reportProblem, uploadReportFile } from '../api/reportApi';

const ReportProblemModal = ({ onClose }) => {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [files, setFiles] = useState([]);
    const modalRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        if (e.target.files) {
            setFiles(prev => [...prev, ...Array.from(e.target.files)]);
        }
    };

    const handleRemoveFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

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
        try {
            // 1. Upload files first
            const uploadedFileUrls = [];
            for (const file of files) {
                const uploadRes = await uploadReportFile(file);
                if (uploadRes.status === 'success') {
                    uploadedFileUrls.push(uploadRes.data.url);
                }
            }

            // 2. Submit report
            const browserInfo = {
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                language: navigator.language,
                windowSize: `${window.innerWidth}x${window.innerHeight}`
            };

            await reportProblem({
                text,
                files: uploadedFileUrls,
                browserInfo
            });

            alert("Thank you! Your report has been submitted.");
            onClose();
        } catch (error) {
            console.error("Failed to submit report", error);
            alert("Failed to submit report. Please try again later.");
        } finally {
            setIsLoading(false);
        }
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

                    <div className="mt-2 flex flex-col gap-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            multiple
                            accept="image/*,video/*"
                            onChange={handleFileSelect}
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-fit bg-secondary hover:bg-[#e0e0e0] dark:bg-[#363636] dark:hover:bg-[#464646] text-text-primary text-sm font-semibold py-1.5 px-4 rounded-lg transition-colors border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center gap-2"
                        >
                            <ImageIcon size={18} />
                            Add file
                        </button>

                        {/* File Previews */}
                        {files.length > 0 && (
                            <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide">
                                {files.map((file, index) => (
                                    <div key={index} className="relative group min-w-[80px] w-[80px] h-[80px] rounded-lg overflow-hidden border border-border bg-gray-100 dark:bg-gray-800">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleRemoveFile(index); }}
                                            className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
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
