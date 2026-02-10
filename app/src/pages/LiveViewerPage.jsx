import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Hls from 'hls.js';
import { Heart, Send, X, Users, MessageSquare, Shield, Power, RefreshCcw } from 'lucide-react';
import { getLiveStreamDetails, sendLiveChatMessage, endLiveStream } from '../api/liveApi';
import { useAuth } from '../context/AuthContext';
import { io } from 'socket.io-client';

const LiveViewerPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [viewers, setViewers] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const socketRef = useRef(null);
    const commentsEndRef = useRef(null);
    const [hlsInstance, setHlsInstance] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState('Connecting to stream...');
    const [retryCount, setRetryCount] = useState(0);

    const isCreator = stream?.userId === user?.id || stream?.userId === user?.userId;

    const scrollToBottom = () => {
        commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const fetchStream = async () => {
            try {
                const res = await getLiveStreamDetails(id);
                setStream(res.data.data);
                if (res.data.data.LiveChatMessages) {
                    setComments(res.data.data.LiveChatMessages.map(m => ({
                        username: m.username,
                        message: m.message,
                        isModerator: m.isModerator,
                        isSystem: m.isSystem
                    })).reverse());
                }
                setLoading(false);
            } catch (err) {
                console.error("Failed to load stream", err);
                setError("Stream not found or inactive.");
                setLoading(false);
            }
        };

        fetchStream();
    }, [id, retryCount]);

    useEffect(() => {
        if (!stream || stream.status !== 'LIVE') return;

        const initPlayer = () => {
            if (hlsInstance) {
                hlsInstance.destroy();
            }

            // Increase initial delay to 10s to account for slow encoding/starts
            setConnectionStatus('Waiting for video feed (10s)...');

            setTimeout(() => {
                if (Hls.isSupported()) {
                    const hls = new Hls({
                        enableWorker: true,
                        lowLatencyMode: true,
                        manifestLoadingMaxRetry: 20,
                        manifestLoadingRetryDelay: 2000,
                        levelLoadingMaxRetry: 20,
                        levelLoadingRetryDelay: 2000,
                    });

                    let streamUrl = stream.hlsUrl;

                    if (streamUrl.includes('localhost')) {
                        streamUrl = streamUrl.replace('localhost', window.location.hostname);
                    }

                    console.log("Attempting to load HLS stream:", streamUrl);
                    hls.loadSource(streamUrl);
                    hls.attachMedia(videoRef.current);

                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        console.log("HLS Manifest parsed successfully!");
                        setConnectionStatus('');
                        videoRef.current.play().catch(e => console.log("Play blocked", e));
                    });

                    hls.on(Hls.Events.ERROR, (event, data) => {
                        if (data.fatal) {
                            switch (data.type) {
                                case Hls.ErrorTypes.NETWORK_ERROR:
                                    console.log("HLS Network error - keep trying...", data);
                                    setConnectionStatus('Stream not ready yet, retrying...');
                                    hls.startLoad();
                                    break;
                                case Hls.ErrorTypes.MEDIA_ERROR:
                                    console.log("HLS Media error - recovering...");
                                    hls.recoverMediaError();
                                    break;
                                default:
                                    console.error("HLS fatal error", data);
                                    setConnectionStatus('Connection lost. Please try refreshing.');
                                    hls.destroy();
                                    break;
                            }
                        }
                    });

                    setHlsInstance(hls);
                } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
                    videoRef.current.src = stream.hlsUrl;
                    setConnectionStatus('');
                }
            }, 10000);
        };

        initPlayer();

        return () => {
            if (hlsInstance) hlsInstance.destroy();
        };
    }, [stream, retryCount]);

    useEffect(() => {
        socketRef.current = io(window.location.origin.includes('localhost') ? 'http://localhost:5011' : '/');

        socketRef.current.on('connect', () => {
            socketRef.current.emit('join-live', id);
        });

        socketRef.current.on('receive-comment', (content) => {
            setComments(prev => [...prev, content]);
            scrollToBottom();
        });

        socketRef.current.on('viewer-count', (count) => {
            setViewers(count);
        });

        socketRef.current.on('stream-status', (status) => {
            if (status === 'ENDED') {
                setError("This live stream has ended.");
            }
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [id]);

    useEffect(scrollToBottom, [comments]);

    const handleSendComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const text = newComment;
        setNewComment('');

        try {
            await sendLiveChatMessage(id, text);
        } catch (err) {
            console.error("Failed to send message", err);
        }
    };

    const handleEndStream = async () => {
        if (window.confirm("Are you sure you want to end this live stream?")) {
            try {
                await endLiveStream(id);
                navigate(-1);
            } catch (err) {
                alert("Failed to end stream");
            }
        }
    };

    const handleManualRetry = () => {
        setRetryCount(prev => prev + 1);
        setError(null);
        setConnectionStatus('Retrying connection...');
    };

    if (loading) return (
        <div className="h-screen w-screen bg-[#0A0A0A] flex items-center justify-center text-white font-sans">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-2 border-pink-500/20 border-t-pink-500 animate-spin mb-4"></div>
                <p className="text-sm font-medium text-white/40 tracking-widest uppercase">Initializing Live Feed</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="h-screen w-screen bg-[#0A0A0A] flex items-center justify-center text-white p-6 font-sans">
            <div className="max-w-md text-center">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 text-white/20">
                    <Power size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-4">{error}</h2>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-8 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-all"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleManualRetry}
                        className="px-8 py-3 bg-white text-black rounded-xl font-bold hover:scale-105 transition-all"
                    >
                        Retry
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="h-screen w-screen bg-black flex flex-col md:flex-row overflow-hidden font-sans select-none">
            <div className="relative flex-1 bg-[#050505] flex items-center justify-center overflow-hidden">
                {connectionStatus && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-500">
                        <div className="w-10 h-10 rounded-full border-2 border-pink-500/20 border-t-pink-500 animate-spin mb-4"></div>
                        <p className="text-xs font-bold text-white/60 uppercase tracking-[0.2em] mb-4">{connectionStatus}</p>
                        <button
                            onClick={handleManualRetry}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[10px] font-bold uppercase transition-all"
                        >
                            <RefreshCcw size={12} /> Force Refresh
                        </button>
                    </div>
                )}
                <video
                    ref={videoRef}
                    className="h-full w-full object-contain"
                    playsInline
                    autoPlay
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none"></div>
                <div className="absolute top-0 inset-x-0 p-6 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-3 pointer-events-auto">
                        <div className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-xl uppercase tracking-tighter">
                            LIVE
                        </div>
                        <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-white shadow-lg">
                            <Users size={14} className="text-white/60" />
                            <span>{viewers}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 pointer-events-auto">
                        {isCreator && (
                            <button
                                onClick={handleEndStream}
                                className="bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all border border-red-500/30"
                            >
                                End Stream
                            </button>
                        )}
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10 text-white hover:bg-white/10 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 md:right-auto flex items-center gap-4 pointer-events-none">
                    <div className="w-12 h-12 rounded-full border-2 border-pink-500 p-0.5 bg-gradient-to-tr from-yellow-400 to-fuchsia-600 pointer-events-auto shadow-2xl">
                        <img
                            src={stream?.thumbnailUrl || `https://ui-avatars.com/api/?name=${stream?.id}&background=random`}
                            className="w-full h-full rounded-full object-cover bg-gray-900"
                            alt="Creator"
                        />
                    </div>
                    <div className="pointer-events-auto">
                        <h3 className="text-white text-sm font-black drop-shadow-lg flex items-center gap-1.5">
                            {stream?.userId}
                            <Shield size={12} className="text-blue-400 fill-blue-400" />
                        </h3>
                        <p className="text-white/70 text-xs drop-shadow-md truncate max-w-[200px]">{stream?.title}</p>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-[420px] h-[40%] md:h-full bg-[#121212] border-t md:border-t-0 md:border-l border-white/10 flex flex-col shadow-2xl z-10">
                <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-pink-500/10 rounded-lg text-pink-500">
                            <MessageSquare size={18} />
                        </div>
                        <span className="text-sm font-black tracking-tight uppercase text-white/50">Live Interaction</span>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                    {comments.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center opacity-20 text-center px-12">
                            <MessageSquare size={48} className="mb-4" />
                            <p className="text-sm font-medium">Be the first to say something in the live chat!</p>
                        </div>
                    )}
                    {comments.map((comment, index) => (
                        <div key={index} className="flex gap-4 group animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 shrink-0 border border-white/5 flex items-center justify-center shadow-lg uppercase text-[10px] font-black text-white/40">
                                {comment.username?.[0] || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className={`text-[11px] font-bold block mb-0.5 ${comment.isModerator ? 'text-blue-400' : 'text-white/40'}`}>
                                    {comment.username}
                                    {comment.isModerator && ' • Moderator'}
                                </span>
                                <p className="text-sm text-white/90 leading-relaxed font-medium break-words">
                                    {comment.message}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div ref={commentsEndRef} />
                </div>
                <div className="p-6 pt-2 bg-gradient-to-t from-black/40 to-transparent">
                    <form onSubmit={handleSendComment} className="relative group">
                        <input
                            type="text"
                            placeholder="Send a message..."
                            className="w-full bg-white/5 hover:bg-white/[0.08] text-white text-sm pl-5 pr-12 py-3.5 rounded-2xl outline-none border border-white/5 focus:border-pink-500/40 focus:ring-4 focus:ring-pink-500/5 transition-all"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={!newComment.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 text-pink-500 hover:scale-110 disabled:opacity-0 transition-all cursor-pointer"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </div>
    );
};

export default LiveViewerPage;
