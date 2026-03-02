import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLive } from './LiveProvider';
import { useAuth } from '../../context/AuthContext';
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
import { Users, X, Mic, Settings, UserPlus } from 'lucide-react';
import LiveInteractionPanel from './LiveInteractionPanel';
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
    const visibleTracks = tracks.filter(t => t.participant.permissions?.canPublish);

    return (
        <GridLayout tracks={visibleTracks} className="w-full h-full [&_.lk-participant-tile]:h-full [&_.lk-participant-tile]:w-full [&_.lk-participant-tile]:border-0 [&_.lk-participant-tile]:rounded-none [&_video]:object-cover [&_.lk-participant-metadata]:hidden [&_.lk-focus-toggle-button]:hidden">
            <ParticipantTile />
        </GridLayout>
    );
};


const LiveViewerScreen = ({ streamId }) => {
    const { streamData, connectionDetails, joinStream, endStream, streamState, resetStream, isHost } = useLive();
    const navigate = useNavigate();
    const [viewers, setViewers] = useState(0);
    const [socket, setSocket] = useState(null);
    const [requestPending, setRequestPending] = useState(false);
    const [role, setRole] = useState('viewer'); // viewer or guest

    const { user: authUser } = useAuth();
    const startTimeRef = React.useRef(Date.now());
    const peakViewersRef = React.useRef(0);
    const [duration, setDuration] = React.useState(0);

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
        if (!connectionDetails && streamState === 'idle') {
            joinStream(streamId).catch(err => {
                console.error("Failed to join stream automatically:", err.message);
            });
        }
    }, [connectionDetails, streamState, streamId, joinStream]);

    useEffect(() => {
        if (!streamData?.id) return;

        const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || '';
        const newSocket = io(SOCKET_URL, {
            path: '/socket.io/',
            query: { streamId: streamData.id },
            auth: {
                token: localStorage.getItem('token') || ''
            }
        });

        newSocket.on('connect', () => {
            console.log('Connected to socket for viewer stream');
            newSocket.emit('join_live_room', { streamId: streamData.id });
            // Also join user specific room to receive co-host approvals
            if (authUser?.id) {
                newSocket.emit('join', authUser.id);
            }
        });

        newSocket.on('viewer_count_update', (count) => {
            setViewers(count);
            if (count > peakViewersRef.current) {
                peakViewersRef.current = count;
            }
        });

        newSocket.on('stream_ended', () => {
            const durationInSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
            endStream(streamData.id, { duration: durationInSeconds, peakViewers: peakViewersRef.current });
        });

        newSocket.on('cohost_request_accepted', async () => {
            console.log("Your co-host request was accepted! Re-joining as guest...");
            // Acquisition of the token with 'canPublish' permissions must happen BEFORE enabling publishing in the UI
            await joinStream(streamId, 'guest');
            setRole('guest');
        });

        newSocket.on('cohost_removed', async () => {
            console.log("You have been removed as a co-host. Re-joining as viewer...");
            setRole('viewer');
            setRequestPending(false); // Reset button state just in case
            await joinStream(streamId); // Reconnects without 'guest' permissions

            // To ensure tracks properly get unpublished on the frontend, sometimes a window reload is the cleanest fallback
            // but since we refresh the token in LiveKitRoom by updating the `connectionDetails`, it should gracefully drop them.
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [streamData?.id, authUser?.id, joinStream, streamId]);

    const handleLeave = () => {
        if (isHost) {
            const durationInSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
            endStream(streamData.id, { duration: durationInSeconds, peakViewers: peakViewersRef.current });
        } else {
            resetStream();
            navigate('/feed');
        }
    };

    const handleRequestJoin = () => {
        if (socket && authUser?.id) {
            socket.emit('request_cohost', {
                streamId: streamData.id,
                userId: authUser.id,
                username: authUser.username || 'Viewer'
            });
            setRequestPending(true);
        }
    };

    // If host re-joins their own stream via URL, we hide this viewer screen 
    // and let AppLiveController handle the host Broadcast UI instead.
    if (isHost && streamState !== 'idle') {
        return null;
    }

    if (streamState === 'ended') {
        const durationInSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
        return <LiveEndSummaryModal summary={{ duration: durationInSeconds, peakViewers: peakViewersRef.current }} />;
    }

    if (!connectionDetails || !streamData) {
        return (
            <div className="fixed inset-0 z-50 bg-black flex items-center justify-center flex-col">
                <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white mt-4 font-semibold animate-pulse">Joining stream...</p>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[9999] bg-black flex h-screen w-full overflow-hidden">
            <LiveKitRoom
                key={`${connectionDetails.token}-${role}`}
                video={isHost || role === 'guest'} // Enable if host or guest
                audio={isHost || role === 'guest'}
                token={connectionDetails.token}
                serverUrl={connectionDetails.livekit_url}
                data-lk-theme="default"
                className="flex-1 relative flex flex-col md:flex-row h-full w-full"
                onDisconnected={handleLeave}
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

                        <div className="flex gap-2 pointer-events-auto items-center flex-wrap justify-end">
                            {role === 'viewer' && !isHost && (
                                <button
                                    onClick={handleRequestJoin}
                                    disabled={requestPending}
                                    className={`bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 disabled:from-gray-700 disabled:to-gray-800 text-white px-4 py-2 rounded-full font-bold text-[11px] uppercase tracking-wider transition-all shadow-lg border border-white/10 flex items-center gap-1.5`}
                                >
                                    <Mic size={14} className={requestPending ? 'animate-pulse' : ''} />
                                    {requestPending ? 'REQUESTED' : 'JOIN'}
                                </button>
                            )}
                            <button
                                onClick={handleLeave}
                                className={`bg-gray-900/70 hover:bg-gray-800 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full flex items-center justify-center gap-1.5 font-bold text-[11px] uppercase tracking-wider transition-all shadow-lg`}
                            >
                                <X size={16} />
                                LEAVE
                            </button>
                        </div>
                    </div>

                    {/* Main Video Area */}
                    <div className="flex-1 w-full h-full relative">
                        <div className="absolute inset-0 w-full h-full">
                            <LiveVideoLayout />
                        </div>
                    </div>

                    {/* Bottom Controls for Guest/Host */}
                    {(isHost || role === 'guest') && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                            <div className="flex items-center pointer-events-auto gap-2 bg-gray-900/70 backdrop-blur-md p-2 rounded-full border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] [&_.lk-button]:bg-transparent [&_.lk-button]:hover:bg-white/10 [&_.lk-button]:text-white [&_.lk-button]:rounded-full [&_.lk-button]:p-3 [&_.lk-button]:transition-all [&_.lk-control-bar]:border-0 [&_.lk-control-bar]:bg-transparent [&_.lk-control-bar]:shadow-none [&_.lk-control-bar]:p-0">
                                <ControlBar controls={{ camera: true, microphone: true, screenShare: true, chat: false, leave: false }} />
                            </div>
                        </div>
                    )}

                    <RoomAudioRenderer />

                    {/* Reactions Overlay */}
                    <LiveReactionsOverlay socket={socket} />
                </div>

                <LiveInteractionPanel socket={socket} streamId={streamData.id} />
            </LiveKitRoom>
        </div>
    );
};

export default LiveViewerScreen;
