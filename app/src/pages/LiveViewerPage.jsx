import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Hls from 'hls.js';
import { getLiveSession, sendLiveComment } from '../api/liveApi';
import io from 'socket.io-client';
import { Send, User, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LiveViewerPage = () => {
    const { id } = useParams();
    const videoRef = useRef(null);
    const [session, setSession] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [viewerCount, setViewerCount] = useState(0);
    const socketRef = useRef(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const res = await getLiveSession(id);
                setSession(res.data.data);
            } catch (err) {
                console.error("Failed to load session", err);
                navigate('/feed'); // Fallback
            }
        };
        fetchSession();
    }, [id, navigate]);

    useEffect(() => {
        if (session && session.hlsUrl) {
            // Transform absolute URL to relative to use Vite proxy
            // If backend returns http://localhost:8000/live/..., we want /live/...
            const relativeUrl = session.hlsUrl.replace(/^https?:\/\/[^/]+/, '');
            console.log("Loading HLS from:", relativeUrl);

            if (Hls.isSupported()) {
                const hls = new Hls({
                    debug: true, // Enable debug logs
                    manifestLoadingTimeOut: 20000, // Wait longer for initial manifest
                });
                hls.loadSource(relativeUrl);
                hls.attachMedia(videoRef.current);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    console.log("Manifest parsed, playing...");
                    videoRef.current.play().catch(e => console.log("Autoplay failed", e));
                });
                hls.on(Hls.Events.ERROR, (event, data) => {
                    console.error("HLS Error:", data);
                    if (data.fatal) {
                        switch (data.type) {
                            case Hls.ErrorTypes.NETWORK_ERROR:
                                console.log("Network error, trying to recover...");
                                hls.startLoad();
                                break;
                            case Hls.ErrorTypes.MEDIA_ERROR:
                                console.log("Media error, trying to recover...");
                                hls.recoverMediaError();
                                break;
                            default:
                                console.log("Fatal error, destroying...");
                                hls.destroy();
                                break;
                        }
                    }
                });
                return () => {
                    hls.destroy();
                };
            } else if (videoRef.current) {
                // Native HLS support (Safari)
                videoRef.current.src = relativeUrl;
            }
        }
    }, [session]);

    // Socket.io for Comments & Viewers
    useEffect(() => {
        if (!session) return;

        // Connect to Gateway Socket endpoint
        // Connect using relative path so Vite proxy handles it
        const socket = io('/', {
            path: '/socket.io/',
            query: { sessionId: id, userId: user?.id }
        });

        socketRef.current = socket;

        socket.on('connect', () => {
            console.log('Connected to Live Socket');
            socket.emit('join-live', { sessionId: id });
        });

        socket.on('receive-comment', (comment) => {
            setComments(prev => [...prev, comment]);
        });

        socket.on('viewer-count', (count) => {
            setViewerCount(count);
        });

        socket.on('stream-ended', () => {
            alert("Live stream ended");
            navigate('/feed');
        });

        return () => {
            socket.emit('leave-live', { sessionId: id });
            socket.disconnect();
        };
    }, [session, id, user, navigate]);

    const handleSendComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            await sendLiveComment(id, newComment);
            // Optimistic update is tricky if we rely on socket broadcast to avoid dupes
            // But if we use separate ID or just wait for socket...
            // Let's NOT optimistically update, just wait for socket.
            setNewComment("");
        } catch (error) {
            console.error("Failed to send comment", error);
        }
    };

    if (!session) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <div className="flex flex-col md:flex-row h-screen bg-black text-white">
            {/* Video Player Area */}
            <div className="flex-1 relative flex items-center justify-center bg-gray-900">
                <video
                    ref={videoRef}
                    controls
                    muted // Auto-play requires muted often
                    autoPlay
                    className="max-h-full max-w-full"
                    width="100%"
                    height="100%"
                />

                <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded-sm text-sm font-bold uppercase">
                    LIVE
                </div>
                <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <User size={16} className="mr-2" />
                    {viewerCount}
                </div>
            </div>

            {/* Chat Sidebar */}
            <div className="w-full md:w-[350px] bg-white text-black flex flex-col border-l border-gray-200">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                        {/* Streamer Avatar */}
                        {session.userProfilePic ? <img src={session.userProfilePic} /> : <User className="w-full h-full p-2 text-gray-500" />}
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm">{session.username || 'Streamer'}</h3>
                        <span className="text-xs text-text-secondary">Host</span>
                    </div>
                </div>

                {/* Comments List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {comments.map((idx, comment) => (
                        <div key={idx} className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex-shrink-0 overflow-hidden">
                                {comment.profilePic ? <img src={comment.profilePic} className="w-full h-full object-cover" /> : <User className="w-5 h-5 m-1.5 text-gray-500" />}
                            </div>
                            <div>
                                <span className="font-semibold text-xs mr-2">{comment.username}</span>
                                <span className="text-sm">{comment.content}</span>
                            </div>
                        </div>
                    ))}
                    {comments.length === 0 && <div className="text-center text-gray-500 mt-10">Say hi! 👋</div>}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendComment} className="p-3 border-t border-gray-200 flex items-center">
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-gray-300 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={!newComment.trim()}
                        className="ml-2 text-blue-500 disabled:opacity-50 font-semibold text-sm"
                    >
                        Post
                    </button>
                    <button type="button" className="ml-2 text-red-500 hover:scale-110 transition-transform">
                        <Heart size={24} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LiveViewerPage;
