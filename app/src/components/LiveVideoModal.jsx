import { useState, useRef, useEffect } from 'react';
import { X, Radio, ChevronDown, Loader2 } from 'lucide-react';
import { createLiveSession, getLiveSession } from '../api/liveApi';
import { useNavigate } from 'react-router-dom';


const LiveVideoModal = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [audience, setAudience] = useState('public');
    const [step, setStep] = useState(1);
    const [showStreamKey, setShowStreamKey] = useState(false);
    const [streamKey, setStreamKey] = useState("");
    const [streamUrl, setStreamUrl] = useState("");
    const [sessionId, setSessionId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLive, setIsLive] = useState(false);
    const navigate = useNavigate();

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

    const isValid = title.trim().length > 0;

    const handleNext = async () => {
        if (isValid) {
            setLoading(true);
            try {
                const response = await createLiveSession({ title, audience });
                if (response.data.status === 'success') {
                    setStreamKey(response.data.data.streamKey);
                    setStreamUrl(response.data.data.streamUrl);
                    setSessionId(response.data.data.sessionId);
                    setStep(2);
                }
            } catch (error) {
                console.error("Failed to create live session", error);
            } finally {
                setLoading(false);
            }
        }
    };

    // Poll for status when in step 2
    useEffect(() => {
        let interval;
        if (step === 2 && sessionId && !isLive) {
            interval = setInterval(async () => {
                try {
                    const res = await getLiveSession(sessionId);
                    if (res.data.data.status === 'live') {
                        setIsLive(true);
                        // Optional: Navigate to Live Room immediately or enable button
                    }
                } catch (err) {
                    console.error("Polling error", err);
                }
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [step, sessionId, isLive]);

    const handleGoLive = () => {
        if (sessionId) { // Fixed: used sessionId instead of requestId
            onClose();
            navigate(`/live/${sessionId}`);
        }
    };

    const handleCopy = (text) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/65 z-[1000] flex items-center justify-center animate-in fade-in duration-200 p-4">
            <div
                ref={modalRef}
                className={`bg-white rounded-xl overflow-hidden shadow-xl animate-in zoom-in-95 duration-200 text-black transition-all ease-in-out
                    ${step === 1 ? 'w-[400px] md:w-[448px]' : 'w-full max-w-[750px] h-[80vh] md:h-[600px]'}
                `}
            >
                {step === 1 ? (
                    <>
                        {/* Header Step 1 */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                            <div className="w-8"></div>
                            <h2 className="text-base font-bold text-center">Live video</h2>
                            <button onClick={onClose} className="text-black">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Body Step 1 */}
                        <div className="p-6 flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full border-2 border-black flex items-center justify-center mb-4 relative">
                                <Radio size={48} strokeWidth={1} />
                                <div className="absolute w-full h-full rounded-full border border-black animate-ping opacity-20"></div>
                            </div>

                            <h3 className="text-xl font-bold mb-2 text-center">Add live video details</h3>
                            <p className="text-center text-text-secondary text-sm mb-6 max-w-[320px]">
                                Go live by connecting to your choice of streaming software. To get started, add a title and select the audience for your live video.
                            </p>

                            <div className="w-full space-y-3">
                                <input
                                    type="text"
                                    placeholder="Add a title..."
                                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-base outline-none focus:border-blue-btn placeholder:text-text-secondary"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    autoFocus
                                />

                                <div className="relative">
                                    <select
                                        value={audience}
                                        onChange={(e) => setAudience(e.target.value)}
                                        className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-base outline-none focus:border-blue-btn appearance-none cursor-pointer"
                                    >
                                        <option value="public">Public</option>
                                        <option value="practice">Practice</option>
                                    </select>
                                    <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                                    <label className="absolute left-4 top-[-8px] text-[10px] uppercase font-bold text-text-secondary bg-white px-1">
                                        Audience
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Footer Step 1 */}
                        <div className="p-4 pt-0">
                            <button
                                className={`w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center transition-colors
                                    ${isValid
                                        ? 'bg-blue-btn hover:bg-blue-btn-hover text-white'
                                        : 'bg-blue-btn/30 text-white/50 cursor-not-allowed'
                                    }`}
                                disabled={!isValid}
                                onClick={handleNext}
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Next'}
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col h-full">
                        {/* Header Step 2 */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-border z-10 bg-white shrink-0">
                            <button onClick={() => setStep(1)} className="text-black">
                                <ChevronDown size={24} className="rotate-90" />
                            </button>
                            <h2 className="text-base font-bold text-center">Live video</h2>
                            <button
                                className={`font-semibold text-sm ${isLive ? 'text-blue-btn cursor-pointer' : 'text-blue-btn/50 cursor-not-allowed'}`}
                                disabled={!isLive}
                                onClick={handleGoLive}
                            >
                                {isLive ? 'Go Live (Ready)' : 'Waiting for Video...'}
                            </button>
                        </div>

                        <div className="flex flex-1 overflow-hidden">
                            {/* Left: Preview */}
                            <div className="w-[40%] bg-black flex flex-col items-center justify-center p-6 text-center">
                                <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center mb-4 text-white">
                                    <Radio size={24} />
                                </div>
                                <p className="text-white text-sm font-semibold">Connect streaming software to go live</p>
                            </div>

                            {/* Right: Details */}
                            <div className="w-[60%] overflow-y-auto p-6">
                                <h3 className="text-xl font-bold mb-2">Go live with streaming software</h3>
                                <p className="text-text-secondary text-sm mb-6">
                                    Copy and paste the stream key into your streaming software. This unique stream key tells your streaming software where to send your video feed and lets Jaadoe accept it.
                                </p>

                                <div className="space-y-4 mb-8">
                                    {/* Stream URL */}
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-xs font-semibold text-text-secondary">Stream URL</span>
                                        </div>
                                        <div className="flex rounded-lg border border-border overflow-hidden">
                                            <input
                                                type="text"
                                                readOnly
                                                value={streamUrl}
                                                className="flex-1 bg-secondary px-3 py-2 text-sm text-text-primary outline-none"
                                            />
                                            <button
                                                onClick={() => handleCopy(streamUrl)}
                                                className="px-4 text-sm font-semibold text-blue-btn bg-secondary border-l border-border hover:bg-gray-100"
                                            >
                                                COPY
                                            </button>
                                        </div>
                                    </div>

                                    {/* Stream Key */}
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-xs font-semibold text-text-secondary">Stream key</span>
                                        </div>
                                        <div className="flex rounded-lg border border-border overflow-hidden">
                                            <input
                                                type={showStreamKey ? "text" : "password"}
                                                readOnly
                                                value={streamKey}
                                                className="flex-1 bg-secondary px-3 py-2 text-sm text-text-primary outline-none"
                                            />
                                            <button
                                                onClick={() => setShowStreamKey(!showStreamKey)}
                                                className="px-3 bg-secondary text-text-secondary hover:text-text-primary"
                                            >
                                                <div className={`w-8 h-4 rounded-full relative transition-colors ${showStreamKey ? 'bg-black' : 'bg-gray-300'}`}>
                                                    <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${showStreamKey ? 'left-4.5' : 'left-0.5'}`} />
                                                </div>
                                            </button>
                                            <button
                                                onClick={() => handleCopy(streamKey)}
                                                className="px-4 text-sm font-semibold text-blue-btn bg-secondary border-l border-border hover:bg-gray-100"
                                            >
                                                COPY
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <h4 className="font-bold text-base mb-2">How to stream</h4>
                                <ul className="list-none space-y-3 mb-8">
                                    <li className="flex items-start">
                                        <div className="mr-3 mt-0.5 border border-black rounded w-4 h-4 flex items-center justify-center text-[10px] font-bold">C</div>
                                        <span className="text-sm text-text-secondary">Copy the stream key and enter it into your streaming software.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="mr-3 mt-0.5 border border-black rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">P</div>
                                        <span className="text-sm text-text-secondary">Select Go live once your streaming software has connected and is displayed.</span>
                                    </li>
                                    <li className="text-sm text-text-secondary">
                                        The streaming software that's best for you depends on the type of content you plan to stream.
                                        <br />
                                        <a href="#" className="text-blue-link hover:underline">Learn more about going live with streaming software.</a>
                                    </li>
                                </ul>

                                <h4 className="font-bold text-base mb-2">After you go live</h4>
                                <p className="text-sm text-text-secondary">
                                    When you use the IG Live Producer tool, preview video is saved as part of the recording. If you want to share the recorded video, please download it and use Jaadoe's editing tools to cut out the preview section. Then, share your video as a new post or reel.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LiveVideoModal;
