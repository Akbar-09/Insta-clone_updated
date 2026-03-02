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
import { X, Users, Heart, UserPlus, Settings, MoreVertical } from 'lucide-react';
import LiveInteractionPanel from './LiveInteractionPanel';
import LiveReactionsOverlay from './LiveReactionsOverlay';
import LiveEndSummaryModal from './LiveEndSummaryModal';
import LiveSettingsPanel from './LiveSettingsPanel';
import { io } from 'socket.io-client';

const LiveVideoLayout = () => {
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false },
    );
    const visibleTracks = tracks.filter(t => t.participant.permissions?.canPublish);

    return (
        <GridLayout tracks={visibleTracks} className="w-full h-full [&_.lk-participant-tile]:h-full [&_.lk-participant-tile]:w-full [&_.lk-participant-tile]:border-0 [&_.lk-participant-tile]:rounded-none [&_video]:object-cover [&_.lk-participant-metadata]:hidden [&_.lk-focus-toggle-button]:hidden">
            <ParticipantTile />
        </GridLayout>
    );
};

const LiveBroadcastScreen = () => {
    const { streamData, connectionDetails, endStream, isHost, streamState } = useLive();
    const [viewers, setViewers] = React.useState(0);
    const [socket, setSocket] = React.useState(null);
    const [pendingRequests, setPendingRequests] = React.useState([]);
    const [activeGuests, setActiveGuests] = React.useState([]);
    const startTimeRef = React.useRef(Date.now());
    const peakViewersRef = React.useRef(0);
    const [duration, setDuration] = React.useState(0);
    const [showSettings, setShowSettings] = React.useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setDuration(Math.floor((Date.now() - startTimeRef.current) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatDuration = (secs) => {
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = secs % 60;
        if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

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
            const acceptedUser = pendingRequests.find(r => r.userId === userId);
            setPendingRequests(prev => prev.filter(r => r.userId !== userId));
            if (acceptedUser) {
                setActiveGuests(prev => [...prev.filter(g => g.userId !== userId), acceptedUser]);
            }
        }
    };

    const handleRejectRequest = (userId) => {
        setPendingRequests(prev => prev.filter(r => r.userId !== userId));
    };

    const handleRemoveGuest = (userId) => {
        if (socket) {
            socket.emit('remove_cohost', { streamId: streamData.id, userId });
            setActiveGuests(prev => prev.filter(g => g.userId !== userId));
        }
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
                    <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-start pointer-events-none">
                        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                            <div className="bg-red-600/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)] flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                                LIVE
                            </div>
                            <div className="bg-gray-900/70 backdrop-blur-md border border-white/10 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                                <Users size={14} className="text-gray-300" />
                                {viewers}
                            </div>
                            <div className="bg-gray-900/70 backdrop-blur-md border border-white/10 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg tracking-wider">
                                {formatDuration(duration)}
                            </div>
                            {streamData?.title && (
                                <div className="bg-gray-900/70 backdrop-blur-md border border-white/10 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 max-w-[200px] truncate">
                                    <span className="truncate">{streamData.title}</span>
                                    {streamData.category && (
                                        <span className="bg-gradient-to-r from-pink-500 to-violet-500 rounded px-1.5 py-0.5 text-[9px] uppercase tracking-wider shrink-0 text-white shadow-sm">
                                            {streamData.category}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                        {isHost ? (
                            <button
                                onClick={handleEndStream}
                                className="pointer-events-auto bg-gray-900/70 hover:bg-red-600/90 backdrop-blur-md border border-white/10 hover:border-red-500/50 text-white px-4 py-2 rounded-full flex items-center justify-center gap-1.5 font-bold text-[11px] uppercase tracking-wider transition-all shadow-lg"
                            >
                                <X size={16} />
                                END
                            </button>
                        ) : (
                            <button
                                onClick={() => endStream(streamData.id)}
                                className="pointer-events-auto bg-gray-900/70 hover:bg-gray-800 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full flex items-center justify-center gap-1.5 font-bold text-[11px] uppercase tracking-wider transition-all shadow-lg"
                            >
                                <X size={16} />
                                LEAVE
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
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                            <div className="flex items-center pointer-events-auto gap-2 bg-gray-900/70 backdrop-blur-md p-2 rounded-full border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] [&_.lk-button]:bg-transparent [&_.lk-button]:hover:bg-white/10 [&_.lk-button]:text-white [&_.lk-button]:rounded-full [&_.lk-button]:p-3 [&_.lk-button]:transition-all [&_.lk-control-bar]:border-0 [&_.lk-control-bar]:bg-transparent [&_.lk-control-bar]:shadow-none [&_.lk-control-bar]:p-0">
                                <ControlBar controls={{ camera: true, microphone: true, screenShare: true, chat: false, leave: false }} />
                                {/* Custom interaction buttons */}
                                <div className="w-px h-8 bg-white/20 mx-1"></div>
                                <button onClick={() => window.dispatchEvent(new CustomEvent('openGuestsTab'))} className="p-3 text-white hover:bg-white/10 rounded-full transition-all" title="Add Guest"><UserPlus size={20} /></button>
                                <button onClick={() => setShowSettings(true)} className="p-3 text-white hover:bg-white/10 rounded-full transition-all" title="Settings"><Settings size={20} /></button>
                            </div>
                        </div>
                    )}

                    <RoomAudioRenderer />

                    {/* Reactions Overlay */}
                    <LiveReactionsOverlay socket={socket} />

                    {/* Live Reactions */}
                </div>

                <LiveInteractionPanel
                    socket={socket}
                    streamId={streamData.id}
                    isHost={isHost}
                    pendingRequests={pendingRequests}
                    activeGuests={activeGuests}
                    handleAcceptRequest={handleAcceptRequest}
                    handleRejectRequest={handleRejectRequest}
                    handleRemoveGuest={handleRemoveGuest}
                />

                {isHost && (
                    <LiveSettingsPanel
                        isOpen={showSettings}
                        onClose={() => setShowSettings(false)}
                        streamId={streamData.id}
                    />
                )}
            </LiveKitRoom>
        </div>
    );
};

export default LiveBroadcastScreen;
