import { useState, useRef, useEffect, useContext } from 'react';
import { Image as ImageIcon, X, ArrowLeft, Loader2 } from 'lucide-react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const CreateAdModal = ({ onClose }) => {
    const { user } = useContext(AuthContext);
    const [step, setStep] = useState(1); // 1: Media, 2: Details
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    // Ad Details
    const [caption, setCaption] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    const [ctaText, setCtaText] = useState('Learn More');
    const [budget, setBudget] = useState(50);
    const [duration, setDuration] = useState(7); // Days

    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);
    const [isDragOver, setIsDragOver] = useState(false);

    // Prevent scrolling
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    const handleFileSelect = (e) => processFile(e.target.files?.[0]);
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        processFile(e.dataTransfer.files?.[0]);
    };

    const processFile = (file) => {
        if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleNext = () => setStep(2);
    const handleBack = () => setStep(1);

    const handleCreateAd = async () => {
        if (!selectedFile || !linkUrl || !budget) return;
        setLoading(true);

        try {
            // 1. Upload Media
            const formData = new FormData();
            formData.append('file', selectedFile);

            const uploadRes = await api.post('/media/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (uploadRes.data.status !== 'success') throw new Error('Upload failed');
            const { url, type } = uploadRes.data.data;

            // 2. Create Ad
            const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(startDate.getDate() + parseInt(duration));

            const adData = {
                userId: user.id || user.userId,
                username: user.username,
                profileImage: user.profilePicture || user.avatar,
                caption,
                mediaUrl: url,
                mediaType: type || (selectedFile.type.startsWith('image/') ? 'IMAGE' : 'VIDEO'),
                linkUrl,
                ctaText,
                budget: parseFloat(budget),
                startDate,
                endDate
            };

            await api.post('/ads', adData);

            // Success
            alert('Ad created successfully! It will appear in feeds shortly.');
            onClose();
            window.location.reload();

        } catch (error) {
            console.error('Ad creation failed:', error);
            alert('Failed to create ad.');
        } finally {
            setLoading(false);
        }
    };

    const triggerFileInput = () => fileInputRef.current?.click();

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/65 backdrop-blur-sm p-5" onClick={onClose}>
            <button className="absolute top-4 right-4 text-white hover:opacity-75 transition-opacity cursor-pointer border-none bg-transparent">
                <X size={28} />
            </button>

            <div className={`bg-white dark:bg-[#262626] rounded-xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col max-w-[95vw] max-h-[90vh] ${step === 2 ? 'w-[900px] h-[600px]' : 'w-[500px] h-[550px]'}`} onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="h-[42px] border-b border-gray-200 dark:border-gray-800 flex justify-between items-center px-4 shrink-0">
                    {preview || step === 2 ? (
                        <button onClick={step === 2 ? handleBack : () => { setPreview(null); setSelectedFile(null); }} className="border-none bg-transparent cursor-pointer p-0">
                            <ArrowLeft size={24} className="text-black dark:text-white" />
                        </button>
                    ) : <div className="w-6"></div>}

                    <h1 className="font-semibold text-base text-center flex-grow text-black dark:text-white">Create Ad</h1>

                    {step === 1 && preview ? (
                        <button onClick={handleNext} className="text-blue-500 font-semibold text-sm hover:text-blue-700 bg-transparent border-none cursor-pointer">Next</button>
                    ) : step === 2 ? (
                        <button onClick={handleCreateAd} disabled={loading} className="text-blue-500 font-semibold text-sm hover:text-blue-700 bg-transparent border-none cursor-pointer flex items-center gap-2">
                            {loading ? <Loader2 className="animate-spin" size={16} /> : 'Launch'}
                        </button>
                    ) : <div className="w-6"></div>}
                </div>

                {/* Content */}
                <div className="flex-grow flex overflow-hidden bg-white dark:bg-black">
                    {step === 1 ? (
                        /* Upload Step */
                        !preview ? (
                            <div
                                className={`w-full h-full flex flex-col items-center justify-center p-8 transition-colors ${isDragOver ? 'bg-gray-50 dark:bg-gray-900' : ''}`}
                                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                                onDragLeave={() => setIsDragOver(false)}
                                onDrop={handleDrop}
                            >
                                <div className="mb-4"><ImageIcon size={60} strokeWidth={1} className="text-black dark:text-white scale-110" /></div>
                                <h2 className="text-xl font-light mb-5 text-black dark:text-white">Drag photos and videos here</h2>
                                <button onClick={triggerFileInput} className="bg-[#0095f6] hover:bg-[#1877f2] text-white px-4 py-1.5 rounded-[4px] font-semibold text-sm transition-colors border-none cursor-pointer">Select from computer</button>
                                <input ref={fileInputRef} type="file" onChange={handleFileSelect} className="hidden" accept="image/*,video/*" />
                            </div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-black">
                                {selectedFile?.type.startsWith('video') ?
                                    <video src={preview} controls className="max-w-full max-h-full object-contain" /> :
                                    <img src={preview} alt="Preview" className="max-w-full max-h-full object-contain" />
                                }
                            </div>
                        )
                    ) : (
                        /* Details Step */
                        <div className="w-full flex h-full">
                            {/* Preview */}
                            <div className="w-[60%] h-full bg-black flex items-center justify-center border-r border-gray-200 dark:border-gray-800">
                                {selectedFile?.type.startsWith('video') ?
                                    <video src={preview} controls className="max-w-full max-h-full object-contain" /> :
                                    <img src={preview} alt="Preview" className="max-w-full max-h-full object-contain" />
                                }
                            </div>

                            {/* Form */}
                            <div className="w-[40%] flex flex-col h-full bg-white dark:bg-[#262626] overflow-y-auto">
                                <div className="p-4 flex items-center gap-3 border-b border-gray-200 dark:border-gray-800">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                        <img src={user?.profilePicture || user?.avatar || 'https://via.placeholder.com/150'} alt="User" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="font-semibold text-sm text-black dark:text-white">{user?.username}</span>
                                </div>

                                <div className="p-4 space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1">CAPTION</label>
                                        <textarea
                                            className="w-full p-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded resize-none text-sm text-black dark:text-white focus:outline-none focus:border-blue-500"
                                            rows="3"
                                            placeholder="Write a caption..."
                                            value={caption}
                                            onChange={(e) => setCaption(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1">DESTINATION URL</label>
                                        <input
                                            type="url"
                                            className="w-full p-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded text-sm text-black dark:text-white focus:outline-none focus:border-blue-500"
                                            placeholder="https://example.com"
                                            value={linkUrl}
                                            onChange={(e) => setLinkUrl(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1">CALL TO ACTION</label>
                                        <select
                                            className="w-full p-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded text-sm text-black dark:text-white focus:outline-none focus:border-blue-500"
                                            value={ctaText}
                                            onChange={(e) => setCtaText(e.target.value)}
                                        >
                                            <option>Learn More</option>
                                            <option>Shop Now</option>
                                            <option>Sign Up</option>
                                            <option>Watch More</option>
                                            <option>Apply Now</option>
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 mb-1">BUDGET ($)</label>
                                            <input
                                                type="number"
                                                className="w-full p-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded text-sm text-black dark:text-white focus:outline-none focus:border-blue-500"
                                                value={budget}
                                                onChange={(e) => setBudget(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 mb-1">DURATION (DAYS)</label>
                                            <input
                                                type="number"
                                                className="w-full p-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded text-sm text-black dark:text-white focus:outline-none focus:border-blue-500"
                                                value={duration}
                                                onChange={(e) => setDuration(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-100 dark:border-blue-800">
                                        <p className="text-xs text-blue-800 dark:text-blue-200">
                                            Your ad will run for {duration} days with a total budget of ${budget}. Estimated reach: {budget * 50 - budget * 20} - {budget * 50 + budget * 10} people.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateAdModal;
