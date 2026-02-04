import { useState, useRef, useEffect, useContext } from 'react';
import { Image as ImageIcon, X, ArrowLeft, Loader2, Sparkles, Globe, DollarSign } from 'lucide-react';
import api from '../api/axios';
import { createAd } from '../api/adApi';
import { AuthContext } from '../context/AuthContext';

const CreateAdModal = ({ onClose }) => {
    const { user } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    // Ad Specific Fields
    const [headline, setHeadline] = useState('');
    const [description, setDescription] = useState('');
    const [targetUrl, setTargetUrl] = useState('');
    const [budget, setBudget] = useState('100');

    const fileInputRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        processFile(file);
    };

    const processFile = (file) => {
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreateAd = async () => {
        if (!selectedFile || !headline || !targetUrl) return;

        setLoading(true);
        try {
            // 1. Upload Media
            const formData = new FormData();
            formData.append('file', selectedFile);

            const uploadRes = await api.post('/media/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (uploadRes.data.status !== 'success') throw new Error('Media upload failed');
            const { url } = uploadRes.data.data;

            // 2. Create Ad via Ad Service
            const adData = {
                advertiserId: user.id || 1, // Fallback if user context is missing
                imageUrl: url,
                targetUrl,
                headline,
                description,
                budget: parseFloat(budget),
                type: 'image',
                status: 'pending' // Admin will approve it
            };

            const response = await createAd(adData);

            if (response.data.success) {
                console.log('Ad created successfully!');
                onClose();
                // Optional: show a success toast or notification
            } else {
                throw new Error('Ad creation failed');
            }

        } catch (error) {
            console.error('Error creating ad:', error);
            alert('Failed to create advertisement. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const clearSelection = () => {
        setSelectedFile(null);
        setPreview(null);
        setHeadline('');
        setDescription('');
        setTargetUrl('');
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/65 backdrop-blur-md p-5" onClick={onClose}>
            {/* Close Button */}
            <button className="absolute top-4 right-4 text-white hover:opacity-75 transition-opacity cursor-pointer border-none bg-transparent" onClick={onClose}>
                <X size={28} />
            </button>

            {/* Modal Container */}
            <div
                className={`bg-white dark:bg-[#262626] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 flex flex-col
                    ${preview ? 'w-[900px] h-[650px]' : 'w-[500px] h-[600px]'}
                    max-w-[95vw] max-h-[90vh]`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="h-[50px] border-b border-white/10 flex justify-between items-center px-4 shrink-0 bg-white dark:bg-[#262626]">
                    {preview ? (
                        <button onClick={clearSelection} className="border-none bg-transparent cursor-pointer p-0 text-text-primary dark:text-white">
                            <ArrowLeft size={24} />
                        </button>
                    ) : (
                        <div className="w-6"></div>
                    )}

                    <h1 className="font-bold text-base text-center flex-grow dark:text-white">Create Advertisement</h1>

                    {preview ? (
                        <button
                            onClick={handleCreateAd}
                            disabled={loading || !headline || !targetUrl}
                            className={`text-blue-500 font-bold text-sm border-none bg-transparent cursor-pointer hover:text-blue-600 transition-colors ${loading ? 'opacity-50' : ''}`}
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create Ad'}
                        </button>
                    ) : (
                        <div className="w-6"></div>
                    )}
                </div>

                {/* Content Area */}
                <div className="flex-grow flex overflow-hidden">
                    {!preview ? (
                        // Upload State
                        <div
                            className="w-full h-full flex flex-col items-center justify-center p-12 bg-white dark:bg-[#262626]"
                        >
                            <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
                                <Sparkles size={48} className="text-blue-500" />
                            </div>
                            <h2 className="text-2xl font-bold mb-4 dark:text-white">Reach more people</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8 max-w-[320px]">
                                Your advertisement will be displayed to users in their feed and explore pages. Select a compelling image to get started.
                            </p>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30"
                            >
                                Select Image
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                        </div>
                    ) : (
                        // Form State
                        <div className="w-full flex h-full">
                            {/* Ad Preview Side */}
                            <div className="w-[55%] h-full bg-gray-100 dark:bg-[#121212] flex items-center justify-center p-8">
                                <div className="w-full max-w-[350px] bg-white dark:bg-black rounded-xl overflow-hidden shadow-xl border border-white/10">
                                    <div className="p-3 flex items-center border-b border-white/10">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[2px] mr-3">
                                            <div className="w-full h-full rounded-full bg-white dark:bg-black p-[2px]">
                                                <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-800" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold dark:text-white truncate w-32">{user?.username || 'jaadoe_ad'}</span>
                                            <span className="text-[10px] text-gray-500">Sponsored</span>
                                        </div>
                                    </div>
                                    <div className="aspect-square bg-gray-200 dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                                        <img src={preview} alt="Ad Preview" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-3">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[11px] font-bold text-blue-500 uppercase tracking-tighter">Learn More</span>
                                            <Globe size={14} className="text-gray-400" />
                                        </div>
                                        <h4 className="text-xs font-bold mb-1 dark:text-white line-clamp-1">{headline || 'Your Headline Here'}</h4>
                                        <p className="text-[11px] text-gray-600 dark:text-gray-400 line-clamp-2">{description || 'Your description will appear here...'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Form Side */}
                            <div className="w-[45%] flex flex-col border-l border-white/10 h-full overflow-y-auto dark:bg-[#262626]">
                                <div className="p-6 space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Ad Headline</label>
                                        <input
                                            type="text"
                                            placeholder="Catchy headline..."
                                            value={headline}
                                            onChange={(e) => setHeadline(e.target.value)}
                                            className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-blue-500 transition-colors text-sm dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Target URL</label>
                                        <div className="flex items-center border-b border-white/10 focus-within:border-blue-500 transition-colors">
                                            <Globe size={16} className="text-gray-400 mr-2" />
                                            <input
                                                type="url"
                                                placeholder="https://example.com"
                                                value={targetUrl}
                                                onChange={(e) => setTargetUrl(e.target.value)}
                                                className="w-full bg-transparent py-2 outline-none text-sm dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Description</label>
                                        <textarea
                                            placeholder="What's your ad about?"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="w-full h-24 bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-blue-500 transition-all text-sm dark:text-white resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Campaign Budget (USD)</label>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 flex items-center bg-white/5 border border-white/10 rounded-lg px-3">
                                                <DollarSign size={16} className="text-gray-400 mr-1" />
                                                <input
                                                    type="number"
                                                    value={budget}
                                                    onChange={(e) => setBudget(e.target.value)}
                                                    className="w-full bg-transparent py-2 outline-none text-sm dark:text-white"
                                                />
                                            </div>
                                            <div className="text-[10px] text-gray-500 uppercase font-bold">Total</div>
                                        </div>
                                    </div>

                                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
                                        <p className="text-[11px] text-blue-500/80 leading-relaxed italic">
                                            * Your ad will be reviewed by our team before going live. Most ads are approved within 24 hours.
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
