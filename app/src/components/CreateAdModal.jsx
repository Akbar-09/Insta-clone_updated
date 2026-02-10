import { useState, useRef, useEffect, useContext } from 'react';
import {
    Image as ImageIcon, X, ArrowLeft, Loader2, Sparkles, Globe,
    DollarSign, Laptop, User, Target, Calendar, CheckCircle2,
    ChevronRight, Play, Film, Square, Maximize2
} from 'lucide-react';
import api from '../api/axios';
import { uploadMedia } from '../api/mediaApi';
import {
    createDraftAd, attachAdMedia, attachBoostContent,
    updateAdDetails, updateAdTargeting, updateAdBudget,
    publishAd, getEligibleContent
} from '../api/adApi';
import { AuthContext } from '../context/AuthContext';

const PHASES = {
    TYPE: 'TYPE',
    UPLOAD: 'UPLOAD',
    BOOST_SELECT: 'BOOST_SELECT',
    CROP: 'CROP',
    DETAILS: 'DETAILS',
    AUDIENCE: 'AUDIENCE',
    BUDGET: 'BUDGET',
    REVIEW: 'REVIEW',
    SUCCESS: 'SUCCESS'
};

const getProxiedUrl = (url) => {
    if (!url) return '';
    if (typeof url !== 'string') return url;
    if (url.includes('r2.dev')) {
        const parts = url.split('.dev/');
        if (parts.length > 1) {
            return `http://localhost:5000/api/v1/media/files/${parts[1]}`;
        }
    }
    if (url.includes('localhost:5000/media/files') && !url.includes('/api/v1/')) {
        return url.replace('/media/files', '/api/v1/media/files');
    }
    return url;
};

const CreateAdModal = ({ onClose }) => {
    const { user } = useContext(AuthContext);
    const [phase, setPhase] = useState(PHASES.TYPE);
    const [loading, setLoading] = useState(false);
    const [adId, setAdId] = useState(null);

    // Step Data
    const [adType, setAdType] = useState(null); // 'NEW_MEDIA' or 'BOOST_CONTENT'
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [mediaItems, setMediaItems] = useState([]);
    const [boostContent, setBoostContent] = useState(null);
    const [eligibleContent, setEligibleContent] = useState({ posts: [], reels: [], stories: [] });
    const [activeTab, setActiveTab] = useState('posts');

    // Details
    const [details, setDetails] = useState({
        title: '',
        caption: '',
        ctaText: 'Learn More',
        destinationUrl: ''
    });

    // Targeting
    const [targeting, setTargeting] = useState({
        targetType: 'AUTOMATIC',
        locations: ['Worldwide'],
        ageRange: { min: 18, max: 65 },
        interests: [],
        gender: 'ALL'
    });

    // Budget
    const [budget, setBudget] = useState({
        dailyBudget: 5,
        durationDays: 7,
        startDate: new Date().toISOString().split('T')[0]
    });

    const fileInputRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        if (phase === PHASES.BOOST_SELECT) {
            fetchEligibleContent();
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [phase]);

    const fetchEligibleContent = async () => {
        setLoading(true);
        try {
            const res = await getEligibleContent();
            setEligibleContent(res.data.data);
        } catch (error) {
            console.error('Error fetching content:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        if (phase === PHASES.UPLOAD || phase === PHASES.BOOST_SELECT) setPhase(PHASES.TYPE);
        else if (phase === PHASES.CROP) setPhase(adType === 'NEW_MEDIA' ? PHASES.UPLOAD : PHASES.BOOST_SELECT);
        else if (phase === PHASES.DETAILS) setPhase(PHASES.CROP);
        else if (phase === PHASES.AUDIENCE) setPhase(PHASES.DETAILS);
        else if (phase === PHASES.BUDGET) setPhase(PHASES.AUDIENCE);
        else if (phase === PHASES.REVIEW) setPhase(PHASES.BUDGET);
    };

    // Phase Transitions
    const selectAdType = async (type) => {
        setAdType(type);
        setLoading(true);
        try {
            const res = await createDraftAd(type);
            setAdId(res.data.data.id);
            setPhase(type === 'NEW_MEDIA' ? PHASES.UPLOAD : PHASES.BOOST_SELECT);
        } catch (error) {
            alert('Failed to start ad creation');
        } finally {
            setLoading(false);
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            setPhase(PHASES.CROP);
        }
    };

    const selectBoostItem = (item, type) => {
        setBoostContent({ ...item, contentType: type });
        setPreview(item.mediaUrl || item.imageUrl || (item.media && item.media[0]?.url));
        setPhase(PHASES.CROP);
    };

    const handleCropComplete = async () => {
        setLoading(true);
        try {
            if (adType === 'NEW_MEDIA') {
                const uploaded = await uploadMedia(selectedFile, 'ads');
                await attachAdMedia(adId, [{
                    mediaType: selectedFile.type.startsWith('video') ? 'VIDEO' : 'IMAGE',
                    r2Key: uploaded.key,
                    url: uploaded.url,
                    aspectRatio: '1:1' // Mock crop result
                }]);
            } else {
                await attachBoostContent(adId, {
                    contentType: boostContent.contentType.toUpperCase(),
                    contentId: boostContent.id,
                    originalData: boostContent
                });
            }
            setPhase(PHASES.DETAILS);
        } catch (error) {
            alert('Upload failed');
        } finally {
            setLoading(false);
        }
    };

    const submitDetails = async () => {
        setLoading(true);
        try {
            await updateAdDetails(adId, details);
            setPhase(PHASES.AUDIENCE);
        } catch (e) { alert('Failed to save details'); }
        finally { setLoading(false); }
    };

    const submitTargeting = async () => {
        setLoading(true);
        try {
            await updateAdTargeting(adId, targeting);
            setPhase(PHASES.BUDGET);
        } catch (e) { alert('Failed to save targeting'); }
        finally { setLoading(false); }
    };

    const submitBudget = async () => {
        setLoading(true);
        try {
            await updateAdBudget(adId, budget);
            setPhase(PHASES.REVIEW);
        } catch (e) { alert('Failed to save budget'); }
        finally { setLoading(false); }
    };

    const handlePublish = async () => {
        setLoading(true);
        try {
            await publishAd(adId);
            setPhase(PHASES.SUCCESS);
        } catch (e) { alert('Publish failed'); }
        finally { setLoading(false); }
    };

    // Render Helpers
    const renderHeader = (title) => (
        <div className="h-[50px] border-b border-gray-200 dark:border-white/10 flex justify-between items-center px-4 shrink-0 bg-white dark:bg-[#262626]">
            <button onClick={handleBack} className="border-none bg-transparent cursor-pointer p-0 text-text-primary dark:text-white">
                <ArrowLeft size={24} />
            </button>
            <h1 className="font-bold text-base text-center flex-grow dark:text-white">{title}</h1>
            <div className="w-6"></div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => onClose(false)}>
            <button className="absolute top-4 right-4 text-white hover:opacity-75 transition-opacity cursor-pointer border-none bg-transparent" onClick={onClose}>
                <X size={32} />
            </button>

            <div
                className={`bg-white dark:bg-[#262626] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col
                    ${[PHASES.TYPE, PHASES.UPLOAD, PHASES.BOOST_SELECT].includes(phase) ? 'w-[450px] h-[600px]' : 'w-[900px] h-[650px]'}
                    max-w-[95vw] max-h-[95vh]`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* 1. TYPE SELECTION */}
                {phase === PHASES.TYPE && (
                    <div className="flex-grow flex flex-col">
                        <div className="h-[50px] border-b border-gray-200 dark:border-white/10 flex items-center justify-center bg-white dark:bg-[#262626]">
                            <h1 className="font-bold text-base dark:text-white">Create ad</h1>
                        </div>
                        <div className="p-8 flex flex-col gap-4">
                            <h2 className="text-xl font-bold mb-2 dark:text-white">How do you want to create your ad?</h2>

                            <button
                                onClick={() => selectAdType('NEW_MEDIA')}
                                className="flex items-center p-5 rounded-xl border-2 border-transparent hover:border-blue-500 bg-gray-50 dark:bg-white/5 transition-all text-left"
                            >
                                <div className="w-12 h-12 rounded-full border border-blue-500/20 bg-blue-500/10 flex items-center justify-center mr-4">
                                    <ImageIcon className="text-blue-500" size={24} />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-bold text-sm dark:text-white">Upload new photos or videos</h3>
                                    <p className="text-xs text-gray-500 mt-1">Run an ad that won't appear on your profile.</p>
                                </div>
                                <ChevronRight className="text-gray-400" size={20} />
                            </button>

                            <button
                                onClick={() => selectAdType('BOOST_CONTENT')}
                                className="flex items-center p-5 rounded-xl border-2 border-transparent hover:border-blue-500 bg-gray-50 dark:bg-white/5 transition-all text-left"
                            >
                                <div className="w-12 h-12 rounded-full border-purple-500/20 bg-purple-500/10 flex items-center justify-center mr-4">
                                    <Sparkles className="text-purple-500" size={24} />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-bold text-sm dark:text-white">Boost content from profile</h3>
                                    <p className="text-xs text-gray-500 mt-1">Select an existing post, reel or story to promote.</p>
                                </div>
                                <ChevronRight className="text-gray-400" size={20} />
                            </button>
                        </div>
                    </div>
                )}

                {/* 2A. UPLOAD */}
                {phase === PHASES.UPLOAD && (
                    <div className="flex-grow flex flex-col">
                        {renderHeader('Upload media')}
                        <div className="flex-grow flex flex-col items-center justify-center p-8 bg-white dark:bg-[#262626]">
                            <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                                <ImageIcon size={40} className="text-blue-500" />
                            </div>
                            <h2 className="text-lg font-bold mb-3 dark:text-white">Select photos and videos</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8 max-w-[300px]">
                                Drag photos and videos here or select from your computer
                            </p>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2.5 rounded-full font-bold text-sm"
                            >
                                Select from computer
                            </button>
                            <input ref={fileInputRef} type="file" accept="image/*,video/*" onChange={handleFileSelect} className="hidden" />
                        </div>
                    </div>
                )}

                {/* 2B. BOOST SELECT */}
                {phase === PHASES.BOOST_SELECT && (
                    <div className="flex-grow flex flex-col">
                        {renderHeader('Select content')}
                        <div className="flex border-b border-gray-200 dark:border-white/10 shrink-0">
                            {['posts', 'reels', 'stories'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'border-b-2 border-black dark:border-white text-black dark:text-white' : 'text-gray-400'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="flex-grow overflow-y-auto p-1 bg-gray-50 dark:bg-black/20">
                            {loading ? (
                                <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin text-gray-400" /></div>
                            ) : (
                                <div className="grid grid-cols-3 gap-1">
                                    {eligibleContent[activeTab]?.map(item => (
                                        <div
                                            key={item.id}
                                            onClick={() => selectBoostItem(item, activeTab.slice(0, -1))}
                                            className="aspect-square relative group cursor-pointer overflow-hidden bg-gray-800"
                                        >
                                            <img src={getProxiedUrl(item.mediaUrl || item.imageUrl || (item.media && item.media[0]?.url))} className="w-full h-full object-cover group-hover:opacity-75 transition-opacity" />
                                            <div className="absolute top-2 right-2 flex gap-1">
                                                {activeTab === 'reels' && <Film size={14} className="text-white drop-shadow-md" />}
                                                {activeTab === 'stories' && <Sparkles size={14} className="text-white drop-shadow-md" />}
                                            </div>
                                        </div>
                                    ))}
                                    {eligibleContent[activeTab]?.length === 0 && (
                                        <div className="col-span-3 py-20 text-center">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">No eligible {activeTab} found.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* 3. CROP & PREVIEW */}
                {phase === PHASES.CROP && (
                    <div className="flex-grow flex flex-col h-full">
                        <div className="h-[50px] border-b border-gray-200 dark:border-white/10 flex justify-between items-center px-4 shrink-0 bg-white dark:bg-[#262626]">
                            <button onClick={handleBack} className="border-none bg-transparent cursor-pointer p-0 text-text-primary dark:text-white"><ArrowLeft size={24} /></button>
                            <h1 className="font-bold text-base dark:text-white">Crop</h1>
                            <button onClick={handleCropComplete} className="text-blue-500 font-bold text-sm bg-transparent border-none cursor-pointer">
                                {loading ? <Loader2 className="animate-spin" size={18} /> : 'Next'}
                            </button>
                        </div>
                        <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-black relative">
                            <div className="w-[600px] aspect-square relative overflow-hidden bg-black flex items-center justify-center">
                                {selectedFile?.type.startsWith('video') ? (
                                    <video src={getProxiedUrl(preview)} className="max-w-full max-h-full" autoPlay muted loop />
                                ) : (
                                    <img src={getProxiedUrl(preview)} className="max-w-full max-h-full object-contain" />
                                )}

                                <div className="absolute bottom-4 left-4 flex gap-2">
                                    <button className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-all"><Square size={16} /></button>
                                    <button className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-all"><Maximize2 size={16} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. DETAILS */}
                {phase === PHASES.DETAILS && (
                    <div className="flex-grow flex flex-col h-full">
                        <div className="h-[50px] border-b border-gray-200 dark:border-white/10 flex justify-between items-center px-4 shrink-0 bg-white dark:bg-[#262626]">
                            <button onClick={handleBack} className="border-none bg-transparent cursor-pointer p-0 text-text-primary dark:text-white"><ArrowLeft size={24} /></button>
                            <h1 className="font-bold text-base dark:text-white">Add details</h1>
                            <button onClick={submitDetails} className="text-blue-500 font-bold text-sm bg-transparent border-none cursor-pointer">
                                {loading ? <Loader2 className="animate-spin" size={18} /> : 'Next'}
                            </button>
                        </div>
                        <div className="flex-grow flex overflow-hidden">
                            <div className="w-1/2 bg-gray-50 dark:bg-black flex items-center justify-center p-12">
                                <div className="w-full max-w-[340px] bg-white dark:bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10">
                                    <div className="p-3 flex items-center border-b border-white/10">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[1px] mr-3">
                                            <div className="w-full h-full rounded-full bg-black p-[2px]">
                                                {user?.profilePicture ? <img src={user.profilePicture} className="w-full h-full rounded-full" /> : <div className="w-full h-full rounded-full bg-gray-800" />}
                                            </div>
                                        </div>
                                        <div><div className="text-[11px] font-bold dark:text-white leading-tight">{user?.username}</div><div className="text-[10px] text-gray-500">Sponsored</div></div>
                                    </div>
                                    <div className="aspect-square bg-gray-200 dark:bg-gray-900 overflow-hidden">
                                        <img src={getProxiedUrl(preview)} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-3 bg-gray-100 dark:bg-white/5 flex justify-between items-center border-b border-white/10">
                                        <span className="text-[11px] font-bold text-blue-500 uppercase tracking-tighter">{details.ctaText}</span>
                                        <Globe size={12} className="text-gray-400" />
                                    </div>
                                    <div className="p-3">
                                        <div className="text-xs font-bold dark:text-white mb-1">{details.title || 'Ad Headline'}</div>
                                        <div className="text-[11px] text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">{details.caption || 'Your caption will appear here...'}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2 p-8 overflow-y-auto space-y-6">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Call to Action</label>
                                    <select
                                        value={details.ctaText}
                                        onChange={e => setDetails({ ...details, ctaText: e.target.value })}
                                        className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm dark:text-white"
                                    >
                                        <option>Learn More</option><option>Shop Now</option><option>Visit Website</option><option>Sign Up</option><option>Contact Us</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Website URL</label>
                                    <input
                                        type="url" placeholder="https://yourwebsite.com"
                                        value={details.destinationUrl} onChange={e => setDetails({ ...details, destinationUrl: e.target.value })}
                                        className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm dark:text-white outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Headline</label>
                                    <input
                                        type="text" placeholder="Short and catchy..."
                                        value={details.title} onChange={e => setDetails({ ...details, title: e.target.value })}
                                        className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm dark:text-white outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Caption</label>
                                    <textarea
                                        placeholder="Write your ad caption..."
                                        value={details.caption} onChange={e => setDetails({ ...details, caption: e.target.value })}
                                        className="w-full h-32 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm dark:text-white outline-none focus:border-blue-500 resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 5. AUDIENCE */}
                {phase === PHASES.AUDIENCE && (
                    <div className="flex-grow flex flex-col h-full">
                        {renderHeader('Audience')}
                        <div className="flex-grow overflow-y-auto p-8 space-y-8 max-w-[600px] mx-auto w-full">
                            <div className="space-y-4">
                                <h2 className="text-lg font-bold dark:text-white mb-2">Select your audience</h2>
                                <label className="flex items-center p-5 rounded-xl border-2 border-transparent bg-gray-50 dark:bg-white/5 cursor-pointer has-[:checked]:border-blue-500">
                                    <input type="radio" checked={targeting.targetType === 'AUTOMATIC'} onChange={() => setTargeting({ ...targeting, targetType: 'AUTOMATIC' })} className="mr-4 w-4 h-4" />
                                    <div>
                                        <div className="font-bold text-sm dark:text-white">Automatic</div>
                                        <p className="text-xs text-gray-500 mt-1">We'll show your ad to people similar to your followers.</p>
                                    </div>
                                </label>
                                <label className="flex items-center p-5 rounded-xl border-2 border-transparent bg-gray-50 dark:bg-white/5 cursor-pointer has-[:checked]:border-blue-500">
                                    <input type="radio" checked={targeting.targetType === 'CUSTOM'} onChange={() => setTargeting({ ...targeting, targetType: 'CUSTOM' })} className="mr-4 w-4 h-4" />
                                    <div>
                                        <div className="font-bold text-sm dark:text-white">Custom</div>
                                        <p className="text-xs text-gray-500 mt-1">Manually select locations, interests, and more.</p>
                                    </div>
                                </label>
                            </div>

                            {targeting.targetType === 'CUSTOM' && (
                                <div className="space-y-6 pt-4 border-t border-gray-100 dark:border-white/10 animate-in fade-in duration-500">
                                    <div>
                                        <label className="text-xs font-bold uppercase text-gray-400 mb-3 block">Locations</label>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {targeting.locations.map(loc => (
                                                <span key={loc} className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/20">{loc}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold uppercase text-gray-400 mb-3 block">Age Range ({targeting.ageRange.min} - {targeting.ageRange.max})</label>
                                        <input type="range" min="13" max="65" value={targeting.ageRange.min} onChange={e => setTargeting({ ...targeting, ageRange: { ...targeting.ageRange, min: parseInt(e.target.value) } })} className="w-full accent-blue-500" />
                                    </div>
                                </div>
                            )}

                            <button onClick={submitTargeting} className="w-full bg-blue-500 text-white rounded-lg py-3 font-bold text-sm mt-8 hover:bg-blue-600 transition-colors">
                                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Continue'}
                            </button>
                        </div>
                    </div>
                )}

                {/* 6. BUDGET */}
                {phase === PHASES.BUDGET && (
                    <div className="flex-grow flex flex-col h-full">
                        {renderHeader('Budget & Duration')}
                        <div className="flex-grow overflow-y-auto p-8 space-y-10 max-w-[500px] mx-auto w-full text-center">
                            <div>
                                <h2 className="text-2xl font-bold dark:text-white mb-2">${budget.dailyBudget}</h2>
                                <label className="text-xs font-bold uppercase text-gray-400 mb-6 block">Estimated Daily Budget</label>
                                <input
                                    type="range" min="1" max="100" value={budget.dailyBudget}
                                    onChange={e => setBudget({ ...budget, dailyBudget: parseInt(e.target.value) })}
                                    className="w-full h-1 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                                <div className="flex justify-between mt-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <span>$1</span><span>$50</span><span>$100</span>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold dark:text-white mb-2">{budget.durationDays} Days</h2>
                                <label className="text-xs font-bold uppercase text-gray-400 mb-6 block">Duration</label>
                                <input
                                    type="range" min="1" max="30" value={budget.durationDays}
                                    onChange={e => setBudget({ ...budget, durationDays: parseInt(e.target.value) })}
                                    className="w-full h-1 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                                <div className="flex justify-between mt-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <span>1 Day</span><span>15 Days</span><span>30 Days</span>
                                </div>
                            </div>

                            <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6 text-left">
                                <div className="flex justify-between mb-2">
                                    <span className="text-xs text-gray-500">Estimated Reach:</span>
                                    <span className="text-xs font-bold dark:text-white">{(budget.dailyBudget * 240).toLocaleString()} - {(budget.dailyBudget * 680).toLocaleString()} people</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs text-gray-500">Total Spend:</span>
                                    <span className="text-xs font-bold dark:text-white">${budget.dailyBudget * budget.durationDays}.00 over {budget.durationDays} days</span>
                                </div>
                            </div>

                            <button onClick={submitBudget} className="w-full bg-blue-500 text-white rounded-lg py-3 font-bold text-sm mt-4 hover:bg-blue-600 transition-colors">
                                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Review Ad'}
                            </button>
                        </div>
                    </div>
                )}

                {/* 7. REVIEW */}
                {phase === PHASES.REVIEW && (
                    <div className="flex-grow flex flex-col h-full">
                        {renderHeader('Review')}
                        <div className="flex-grow flex overflow-hidden">
                            <div className="w-1/2 bg-black flex items-center justify-center p-12">
                                <div className="w-full max-w-[340px] bg-white dark:bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10 opacity-80 scale-95 origin-center">
                                    <div className="p-3 flex items-center border-b border-white/10">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[1px] mr-3">
                                            <div className="w-full h-full rounded-full bg-black p-[2px]">
                                                {user?.profilePicture ? <img src={user.profilePicture} className="w-full h-full rounded-full" /> : <div className="w-full h-full rounded-full bg-gray-800" />}
                                            </div>
                                        </div>
                                        <div><div className="text-[11px] font-bold dark:text-white leading-tight">{user?.username}</div><div className="text-[10px] text-gray-500">Sponsored</div></div>
                                    </div>
                                    <div className="aspect-square">
                                        <img src={getProxiedUrl(preview)} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-3 bg-gray-100 dark:bg-white/5 flex justify-between items-center">
                                        <span className="text-[11px] font-bold text-blue-500 uppercase tracking-tighter">{details.ctaText}</span>
                                        <Globe size={12} className="text-gray-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2 p-8 flex flex-col">
                                <h2 className="text-lg font-bold dark:text-white mb-6">Review your ad</h2>
                                <div className="space-y-6 flex-grow">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0"><Target size={20} className="text-gray-400" /></div>
                                        <div>
                                            <div className="text-sm font-bold dark:text-white">Audience</div>
                                            <p className="text-xs text-gray-500 mt-1">{targeting.targetType === 'AUTOMATIC' ? 'Automatic (similar to followers)' : `${targeting.locations.join(', ')} • ${targeting.ageRange.min}-${targeting.ageRange.max}`}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0"><DollarSign size={20} className="text-gray-400" /></div>
                                        <div>
                                            <div className="text-sm font-bold dark:text-white">Budget & Duration</div>
                                            <p className="text-xs text-gray-500 mt-1">${budget.dailyBudget}/day for {budget.durationDays} days (${budget.dailyBudget * budget.durationDays} total)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0"><Globe size={20} className="text-gray-400" /></div>
                                        <div>
                                            <div className="text-sm font-bold dark:text-white">Destination</div>
                                            <p className="text-xs text-gray-500 mt-1 truncate max-w-[200px]">{details.destinationUrl || 'No URL provided'}</p>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={handlePublish} className="w-full bg-blue-500 text-white rounded-lg py-3 font-bold text-sm mt-8 hover:bg-blue-600 transition-colors shadow-xl shadow-blue-500/20">
                                    {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Publish Ad'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 8. SUCCESS */}
                {phase === PHASES.SUCCESS && (
                    <div className="flex-grow flex flex-col items-center justify-center p-12 text-center animate-in zoom-in-95 duration-500">
                        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle2 size={64} className="text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold dark:text-white mb-3">Ad sent for review</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[320px] mb-8 leading-relaxed">
                            Your ad is being reviewed to ensure it meets our guidelines. You'll be notified once it goes live.
                        </p>
                        <button onClick={() => onClose(true)} className="bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 dark:text-white px-10 py-3 rounded-xl font-bold text-sm transition-all">
                            Done
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateAdModal;
