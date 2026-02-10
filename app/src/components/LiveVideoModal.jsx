import { useState, useRef, useEffect } from 'react';
import { X, Radio, ChevronDown, Loader2, Calendar, Clock, Globe, Users as UsersIcon, Lock, Camera, Upload } from 'lucide-react';
import { goLiveNow, scheduleStream, getLiveStreamDetails } from '../api/liveApi';
import { useNavigate } from 'react-router-dom';

const LiveVideoModal = ({ onClose }) => {
    const [mode, setMode] = useState('live'); // 'live' or 'schedule'
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Social');
    const [visibility, setVisibility] = useState('Public');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);

    const [step, setStep] = useState(1); // 1: Form, 2: Keys
    const [streamKey, setStreamKey] = useState("");
    const [rtmpUrl, setRtmpUrl] = useState("");
    const [sessionId, setSessionId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLiveDetected, setIsLiveDetected] = useState(false);
    const [showStreamKey, setShowStreamKey] = useState(false);

    const navigate = useNavigate();
    const modalRef = useRef(null);
    const fileInputRef = useRef(null);

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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file);
            const reader = new FileReader();
            reader.onloadend = () => setThumbnailPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (!title.trim()) return;
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('category', category);
            formData.append('visibility', visibility);
            if (thumbnail) formData.append('thumbnail', thumbnail);

            if (mode === 'live') {
                const response = await goLiveNow(formData);
                if (response.data.status === 'success') {
                    setStreamKey(response.data.data.streamKey);
                    setRtmpUrl(response.data.data.rtmpUrl);
                    setSessionId(response.data.data.stream.id);
                    setStep(2);
                }
            } else {
                // Schedule
                formData.append('scheduledAt', `${date}T${time}`);
                const response = await scheduleStream(formData);
                if (response.data.status === 'success') {
                    // Show success message or close
                    onClose();
                    alert("Stream scheduled successfully!");
                }
            }
        } catch (error) {
            console.error("Action failed", error);
            alert("Failed to process request: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    // Poll for status when in step 2 (Waiting for OBS)
    useEffect(() => {
        let interval;
        if (step === 2 && sessionId && !isLiveDetected) {
            interval = setInterval(async () => {
                try {
                    const res = await getLiveStreamDetails(sessionId);
                    if (res.data.data.status === 'LIVE') {
                        setIsLiveDetected(true);
                    }
                } catch (err) {
                    console.error("Polling error", err);
                }
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [step, sessionId, isLiveDetected]);

    const handleGoToStream = () => {
        if (sessionId) {
            onClose();
            navigate(`/live/${sessionId}`);
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        // Toast would be nice here
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000] flex items-center justify-center animate-in fade-in duration-300 p-4">
            <div
                ref={modalRef}
                className={`bg-[#1A1A1A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 text-white transition-all ease-in-out
                    ${step === 1 ? 'w-[500px]' : 'w-full max-w-[850px] aspect-video md:h-[600px]'}
                `}
            >
                {step === 1 ? (
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                            <h2 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                                Create Live Stream
                            </h2>
                            <button onClick={onClose} className="hover:bg-white/10 p-1.5 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Mode Selector */}
                        <div className="flex p-1 bg-white/5 mx-6 mt-6 rounded-xl border border-white/5">
                            <button
                                onClick={() => setMode('live')}
                                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${mode === 'live' ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                            >
                                Go Live Now
                            </button>
                            <button
                                onClick={() => setMode('schedule')}
                                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${mode === 'schedule' ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                            >
                                Schedule Stream
                            </button>
                        </div>

                        {/* Form */}
                        <div className="px-6 py-6 space-y-5 overflow-y-auto max-h-[60vh] scrollbar-thin">
                            <div>
                                <label className="text-xs font-bold text-white/40 uppercase mb-2 block">Stream Title</label>
                                <input
                                    type="text"
                                    placeholder="What are you streaming about?"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base outline-none focus:border-pink-500/50 transition-colors"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-white/40 uppercase mb-2 block">Category</label>
                                    <div className="relative">
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none appearance-none cursor-pointer"
                                        >
                                            <option value="Social">Social</option>
                                            <option value="Gaming">Gaming</option>
                                            <option value="Education">Education</option>
                                            <option value="Music">Music</option>
                                            <option value="Fitness">Fitness</option>
                                            <option value="Tech">Tech</option>
                                        </select>
                                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-white/40 uppercase mb-2 block">Visibility</label>
                                    <div className="relative">
                                        <select
                                            value={visibility}
                                            onChange={(e) => setVisibility(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none appearance-none cursor-pointer"
                                        >
                                            <option value="Public">Public</option>
                                            <option value="Followers">Followers</option>
                                            <option value="Private">Private</option>
                                        </select>
                                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {mode === 'schedule' && (
                                <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2">
                                    <div>
                                        <label className="text-xs font-bold text-white/40 uppercase mb-2 block text-center flex items-center gap-2">
                                            <Calendar size={14} /> Date
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none color-scheme-dark"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-white/40 uppercase mb-2 block flex items-center gap-2">
                                            <Clock size={14} /> Time
                                        </label>
                                        <input
                                            type="time"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none color-scheme-dark"
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="text-xs font-bold text-white/40 uppercase mb-2 block">Thumbnail (16:9 recommended)</label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="relative aspect-video rounded-xl border-2 border-dashed border-white/10 hover:border-pink-500/50 bg-white/5 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all group"
                                >
                                    {thumbnailPreview ? (
                                        <>
                                            <img src={thumbnailPreview} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                <Upload size={24} />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Camera size={32} className="text-white/20 mb-2" />
                                            <span className="text-sm text-white/40">Click to upload thumbnail</span>
                                        </>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/5 mt-auto">
                            <button
                                onClick={handleSubmit}
                                disabled={loading || !title.trim() || (mode === 'schedule' && (!date || !time))}
                                className={`w-full py-3.5 rounded-xl text-base font-bold flex items-center justify-center transition-all bg-gradient-to-r from-pink-600 to-violet-600 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-pink-500/20 disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    mode === 'live' ? 'Prepare Live Stream' : 'Schedule Event'
                                )}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col h-full md:flex-row">
                        {/* Left: Setup Instructions */}
                        <div className="w-full md:w-[60%] p-8 overflow-y-auto bg-black/20">
                            <h3 className="text-2xl font-bold mb-2">Streaming Dashboard</h3>
                            <p className="text-white/60 text-sm mb-8 leading-relaxed">
                                Copy these credentials to your streaming software (OBS, Streamlabs, etc.) to begin your broadcast. Your stream will be automatically detected.
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-white/40 uppercase">RTMP Ingest URL</span>
                                        <button onClick={() => handleCopy(rtmpUrl)} className="text-pink-500 text-xs font-bold hover:underline">COPY</button>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-sm text-white/80 truncate">
                                        {rtmpUrl.replace('localhost', window.location.hostname)}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-white/40 uppercase">Stream Key</span>
                                        <div className="flex gap-4">
                                            <button onClick={() => setShowStreamKey(!showStreamKey)} className="text-white/40 text-xs font-bold hover:text-white transition-colors">
                                                {showStreamKey ? 'HIDE' : 'SHOW'}
                                            </button>
                                            <button onClick={() => handleCopy(streamKey)} className="text-pink-500 text-xs font-bold hover:underline">COPY</button>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-sm text-white/80 relative">
                                        {showStreamKey ? streamKey : '••••••••••••••••••••••••••••••••'}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
                                <h4 className="font-bold mb-4 flex items-center gap-2">
                                    <Globe size={18} className="text-blue-400" />
                                    Quick Start Guide
                                </h4>
                                <ul className="space-y-4 text-sm text-white/60">
                                    <li className="flex gap-3">
                                        <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] shrink-0">1</span>
                                        <span>Open OBS Settings → Stream</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] shrink-0">2</span>
                                        <span>Set Service to 'Custom' and Server to the RTMP Ingest URL</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] shrink-0">3</span>
                                        <span>Enter your unique Stream Key and click 'Start Streaming'</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Right: Live Status */}
                        <div className="w-full md:w-[40%] bg-gradient-to-b from-[#222] to-[#111] p-8 flex flex-col items-center justify-center text-center border-l border-white/10">
                            {!isLiveDetected ? (
                                <>
                                    <div className="relative mb-8">
                                        <div className="w-24 h-24 rounded-full border-2 border-white/10 flex items-center justify-center text-white/20">
                                            <Radio size={48} />
                                        </div>
                                        <div className="absolute inset-0 w-24 h-24 rounded-full border border-pink-500/50 animate-ping"></div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Waiting for signal...</h3>
                                    <p className="text-white/40 text-sm mb-8">Start your streaming software to begin the live broadcast.</p>
                                    <div className="px-4 py-2 bg-white/5 rounded-full text-xs font-medium text-white/60 border border-white/10 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                                        Detecting Connection
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-24 h-24 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 mb-8 border border-pink-500/20 shadow-2xl shadow-pink-500/20">
                                        <div className="bg-pink-500 p-4 rounded-full animate-pulse shadow-lg">
                                            <Radio size={32} className="text-white" />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">You are LIVE!</h3>
                                    <p className="text-white/60 text-sm mb-12">Your audience is ready. Enter the stream control room to manage the show.</p>

                                    <button
                                        onClick={handleGoToStream}
                                        className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-transform active:scale-95 shadow-xl"
                                    >
                                        Enter Control Room
                                    </button>
                                </>
                            )}

                            <button
                                onClick={() => setStep(1)}
                                className="mt-8 text-white/40 text-sm hover:text-white transition-colors"
                            >
                                Cancel and Change Details
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style sx={{ colorScheme: 'dark' }} dangerouslySetInnerHTML={{
                __html: `
                input[type="date"]::-webkit-calendar-picker-indicator,
                input[type="time"]::-webkit-calendar-picker-indicator {
                    filter: invert(1);
                    opacity: 0.5;
                    cursor: pointer;
                }
                .scrollbar-thin::-webkit-scrollbar { width: 4px; }
                .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
            `}} />
        </div>
    );
};

export default LiveVideoModal;
