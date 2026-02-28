import React, { useEffect } from 'react';
import { useLive } from './LiveProvider';
import {
    LiveKitRoom,
    RoomAudioRenderer,
    useTracks,
    GridLayout,
    ParticipantTile,
    ControlBar
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import '@livekit/components-styles';
import { X, Users, Heart } from 'lucide-react';
import LiveChatPanel from './LiveChatPanel';
import LiveReactionsOverlay from './LiveReactionsOverlay';
import LiveEndSummaryModal from './LiveEndSummaryModal';
import { io } from 'socket.io-client';

const LiveVideoLayout = () => {
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false },
    );
    return (
        <GridLayout tracks={tracks} className="w-full h-full [&_.lk-participant-tile]:h-full [&_.lk-participant-tile]:w-full [&_.lk-participant-tile]:border-0 [&_.lk-participant-tile]:rounded-none [&_video]:object-cover [&_.lk-participant-metadata]:hidden [&_.lk-focus-toggle-button]:hidden">
            <ParticipantTile />
        </GridLayout>
    );
};

const LiveBroadcastScreen = () => {
    const { streamData, connectionDetails, endStream, isHost, streamState } = useLive();
    const [viewers, setViewers] = React.useState(0);
    const [socket, setSocket] = React.useState(null);
    const [pendingRequests, setPendingRequests] = React.useState([]);
    const startTimeRef = React.useRef(Date.now());
    const peakViewersRef = React.useRef(0);

    useEffect(() => {
        const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || '';
        const newSocket = io(SOCKET_URL, {
            path: '/socket.io/',
            query: { streamId: streamData.id },
            auth: {
                token: localStorage.getItem('token') || ''
            }
        });

        newSocket.on('connect', () => {
            console.log('Connected to socket for live stream');
            newSocket.emit('join_live_room', { streamId: streamData.id });
        });

        newSocket.on('viewer_count_update', (count) => {
            setViewers(count);
            if (count > peakViewersRef.current) {
                peakViewersRef.current = count;
            }
        });

        newSocket.on('cohost_request_received', ({ userId, username }) => {
            console.log("Co-host request received from:", username);
            setPendingRequests(prev => [...prev.filter(r => r.userId !== userId), { userId, username }]);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [streamData.id]);

    const handleAcceptRequest = (userId) => {
        if (socket) {
            socket.emit('accept_cohost', { streamId: streamData.id, userId });
            setPendingRequests(prev => prev.filter(r => r.userId !== userId));
        }
    };

    const handleRejectRequest = (userId) => {
        setPendingRequests(prev => prev.filter(r => r.userId !== userId));
    };

    const handleEndStream = () => {
        if (window.confirm("Are you sure you want to end your live stream?")) {
            const durationInSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
            endStream(streamData.id, {
                duration: durationInSeconds,
                peakViewers: peakViewersRef.current
            });
        }
    };

    if (streamState === 'ended') {
        const durationInSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
        return <LiveEndSummaryModal summary={{ duration: durationInSeconds, peakViewers: peakViewersRef.current }} />;
    }

    if (!connectionDetails) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-black flex h-screen w-full overflow-hidden">
            {/* LiveKit Room */}
            <LiveKitRoom
                video={isHost}
                audio={isHost}
                token={connectionDetails.token}
                serverUrl={connectionDetails.livekit_url}
                data-lk-theme="default"
                className="flex-1 relative flex flex-col md:flex-row h-full w-full"
                onDisconnected={() => {
                    if (!isHost) {
                        endStream(streamData.id); // Triggers ended state for viewer
                    }
                }}
            >
                <div className="flex-1 relative bg-black flex flex-col">
                    {/* Top Overlay */}
                    <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                        <div className="flex items-center gap-3">
                            <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow animate-pulse">
                                LIVE
                            </div>
                            <div className="bg-gray-900/60 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                                <Users size={14} />
                                {viewers}
                            </div>
                        </div>
                        {isHost && (
                            <button
                                onClick={handleEndStream}
                                className="pointer-events-auto bg-gray-900/60 hover:bg-red-600 backdrop-blur-sm text-white px-4 py-1.5 rounded-full flex items-center justify-center gap-1.5 font-bold text-sm transition shadow-[0_0_15px_rgba(0,0,0,0.2)] border border-gray-700/50 hover:border-red-500/50"
                            >
                                <X size={16} />
                                End Stream
                            </button>
                        )}
                        {!isHost && (
                            <button
                                onClick={() => endStream(streamData.id)}
                                className="pointer-events-auto bg-gray-900/60 hover:bg-gray-800 backdrop-blur-sm text-white px-4 py-1.5 rounded-full flex items-center justify-center gap-1.5 font-bold text-sm transition shadow-[0_0_15px_rgba(0,0,0,0.2)] border border-gray-700/50"
                            >
                                <X size={16} />
                                Leave
                            </button>
                        )}
                    </div>

                    <div className="flex-1 w-full h-full relative">
                        <div className="absolute inset-0 w-full h-full">
                            <LiveVideoLayout />
                        </div>
                    </div>

                    {/* Bottom Controls for Host */}
                    {isHost && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto shadow-2xl rounded-xl overflow-hidden [&_.lk-button]:bg-gray-900/80 [&_.lk-button]:hover:bg-gray-800 [&_.lk-button]:text-white [&_.lk-button]:backdrop-blur-md [&_.lk-control-bar]:border [&_.lk-control-bar]:border-gray-700/50">
                            <ControlBar controls={{ camera: true, microphone: true, screenShare: false, chat: false, leave: false }} />
                        </div>
                    )}

                    <RoomAudioRenderer />

                    {/* Reactions Overlay */}
                    <LiveReactionsOverlay socket={socket} />

                    {/* Guest Requests UI */}
                    {pendingRequests.length > 0 && (
                        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 w-full max-w-xs space-y-2 pointer-events-auto px-4">
                            {pendingRequests.map(req => (
                                <div key={req.userId} className="bg-gray-900/90 backdrop-blur-md border border-gray-700/50 rounded-xl p-3 flex items-center justify-between shadow-2xl animate-in slide-in-from-top duration-300">
                                    <div className="flex flex-col">
                                        <span className="text-white text-sm font-bold">{req.username}</span>
                                        <span className="text-gray-400 text-[10px]">Requests to join</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleRejectRequest(req.userId)}
                                            className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition"
                                        >
                                            Dismiss
                                        </button>
                                        <button
                                            onClick={() => handleAcceptRequest(req.userId)}
                                            className="bg-pink-600 hover:bg-pink-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition"
                                        >
                                            Accept
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Chat Panel on the right (or bottom on mobile) */}
                <div className="w-full md:w-[350px] h-1/3 md:h-full bg-gray-900 border-t md:border-t-0 md:border-l border-gray-800 flex flex-col z-20 relative">
                    <LiveChatPanel socket={socket} streamId={streamData.id} />
                </div>
            </LiveKitRoom>
        </div>
    );
};

export default LiveBroadcastScreen;
