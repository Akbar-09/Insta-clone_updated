import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Hls from 'hls.js';
import { Heart, MessageCircle, Send, X, Users, MessageSquare } from 'lucide-react';
import { getLiveSession, addLiveComment } from '../api/liveApi';
import { useAuth } from '../context/AuthContext';
import { io } from 'socket.io-client';

const LiveViewerPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const videoRef = useRef(null);
    const [session, setSession] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [viewers, setViewers] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const socketRef = useRef(null);
    const commentsEndRef = useRef(null);

    const scrollToBottom = () => {
        commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const res = await getLiveSession(id);
                setSession(res.data.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to load live session", err);
                setError("Live session not found or ended.");
                setLoading(false);
            }
        };

        fetchSession();
    }, [id]);

    useEffect(() => {
        if (!session) return;

        // Initialize HLS
        if (Hls.isSupported()) {
            const hls = new Hls();
            const streamUrl = `http://localhost:8000/live/${session.streamKey}.m3u8`;
            hls.loadSource(streamUrl);
            hls.attachMedia(videoRef.current);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoRef.current.play().catch(e => console.log("Auto-play blocked"));
            });

            return () => hls.destroy();
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            // Safari native support
            videoRef.current.src = `http://localhost:8000/live/${session.streamKey}.m3u8`;
        }
    }, [session]);

    useEffect(() => {
        // Socket.io for comments and viewer count
        socketRef.current = io('http://localhost:5011'); // Socket service port

        socketRef.current.emit('join-live', id);

        socketRef.current.on('new-comment', (comment) => {
            setComments(prev => [...prev, comment]);
            scrollToBottom();
        });

        socketRef.current.on('viewer-count', (count) => {
            setViewers(count);
        });

        socketRef.current.on('live-ended', () => {
            setError("The live stream has ended.");
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [id]);

    useEffect(scrollToBottom, [comments]);

    const handleSendComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            await addLiveComment(id, newComment);
            setNewComment('');
        } catch (err) {
            console.error("Failed to send comment", err);
        }
    };

    if (loading) return (
        <div className="h-screen w-screen bg-black flex items-center justify-center text-white">
            <div className="animate-pulse flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-4 border-t-pink-500 border-gray-800 animate-spin mb-4"></div>
                <p className="text-lg font-medium">Loading live stream...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="h-screen w-screen bg-black flex items-center justify-center text-white p-6">
            <div className="max-w-md text-center">
                <h2 className="text-2xl font-bold mb-4">{error}</h2>
                <button
                    onClick={() => navigate('/feed')}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold"
                >
                    Back to Feed
                </button>
            </div>
        </div>
    );

    return (
        <div className="h-screen w-screen bg-black flex flex-col md:flex-row overflow-hidden font-sans">
            {/* Main Video Area */}
            <div className="relative flex-1 bg-black flex items-center justify-center group">
                <video
                    ref={videoRef}
                    className="h-full w-full object-contain"
                    playsInline
                    muted={false}
                />

                {/* Overlay UI */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"></div>

                {/* Top Left: Live Badge & Viewers */}
                <div className="absolute top-6 left-6 flex items-center gap-3 pointer-events-auto">
                    <div className="bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded uppercase tracking-wider shadow-lg">
                        Live
                    </div>
                    <div className="bg-black/50 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg border border-white/10">
                        <Users size={12} />
                        <span>{viewers}</span>
                    </div>
                </div>

                {/* Top Right: Actions */}
                <div className="absolute top-6 right-6 flex items-center gap-3 pointer-events-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-colors border border-white/10"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Bottom Left: User Info */}
                <div className="absolute bottom-6 left-6 flex items-center gap-3 pointer-events-auto">
                    <div className="w-10 h-10 rounded-full border-2 border-pink-500 p-0.5 bg-gradient-to-tr from-yellow-400 to-fuchsia-600">
                        <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                            <span className="text-xs font-bold text-white">{session?.username?.[0]?.toUpperCase()}</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-white text-sm font-bold shadow-text">{session?.username}</h3>
                        <p className="text-white/80 text-xs shadow-text truncate max-w-[200px]">{session?.title}</p>
                    </div>
                </div>
            </div>

            {/* Side Interaction Bar (Hidden on Mobile, or slide out?) */}
            <div className="w-full md:w-[380px] h-[300px] md:h-full bg-black md:bg-white/5 md:backdrop-blur-xl border-t md:border-t-0 md:border-l border-white/10 flex flex-col">
                <div className="p-4 border-b border-white/10 shrink-0">
                    <div className="flex items-center gap-2 text-white/90 mb-1">
                        <MessageSquare size={16} />
                        <span className="text-sm font-bold">Live Comments</span>
                    </div>
                </div>

                {/* Comments List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                    {comments.map((comment, index) => (
                        <div key={index} className="flex gap-2.5 animate-in slide-in-from-bottom-2 duration-300">
                            <div className="w-7 h-7 rounded-full bg-gray-700 shrink-0 flex items-center justify-center">
                                <span className="text-[10px] font-bold text-white">{comment.username?.[0]?.toUpperCase()}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="text-xs font-bold text-white/60 mr-2">{comment.username}</span>
                                <p className="text-white text-sm leading-relaxed break-words">{comment.text}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={commentsEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-black/40 backdrop-blur-md shrink-0">
                    <form onSubmit={handleSendComment} className="flex items-center gap-3">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="flex-1 bg-white/10 text-white text-sm px-4 py-2.5 rounded-full outline-none focus:ring-1 focus:ring-pink-500 transition-all border border-white/5"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={!newComment.trim()}
                            className="p-2 text-pink-500 hover:text-pink-400 disabled:text-white/20 transition-colors"
                        >
                            <Send size={20} />
                        </button>
                    </form>

                    <div className="flex justify-around mt-4 pt-4 border-t border-white/5">
                        <button className="flex flex-col items-center gap-1 text-white/60 hover:text-pink-500 transition-colors">
                            <Heart size={20} />
                            <span className="text-[10px]">Like</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 text-white/60 hover:text-blue-400 transition-colors">
                            <Send size={20} />
                            <span className="text-[10px]">Share</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 text-white/60 hover:text-green-400 transition-colors">
                            <MessageCircle size={20} />
                            <span className="text-[10px]">Reply</span>
                        </button>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .shadow-text { text-shadow: 0 1px 4px rgba(0,0,0,0.8); }
            `}} />
        </div>
    );
};

export default LiveViewerPage;
