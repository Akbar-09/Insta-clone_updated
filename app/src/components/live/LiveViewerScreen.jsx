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
import { Users, X, Mic } from 'lucide-react';
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

    useEffect(() => {
        if (!connectionDetails && streamState === 'idle') {
            joinStream(streamId);
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
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-gray-900/60 backdrop-blur-sm rounded-full pl-1 pr-3 py-1">
                                <img
                                    src={streamData?.thumbnail_url || "https://ui-avatars.com/api/?name=Host"}
                                    className="w-8 h-8 rounded-full pointer-events-auto cursor-pointer border border-pink-500"
                                    alt="Host"
                                />
                                <div className="flex flex-col">
                                    <span className="text-white text-xs font-bold leading-tight">{streamData?.title || 'Live Stream'}</span>
                                    <span className="text-gray-300 text-[10px] pb-0.5">{streamData?.visibility || 'public'}</span>
                                </div>
                            </div>

                            <div className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                                LIVE
                            </div>
                            <div className="bg-gray-900/60 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                                <Users size={12} />
                                {viewers}
                            </div>
                        </div>

                        <div className="flex gap-2 pointer-events-auto">
                            {role === 'viewer' && !isHost && (
                                <button
                                    onClick={handleRequestJoin}
                                    disabled={requestPending}
                                    className={`bg-pink-600 hover:bg-pink-700 disabled:bg-gray-700 text-white px-4 py-1.5 rounded-full font-bold text-sm transition shadow-lg border border-pink-500/30 flex items-center gap-1.5`}
                                >
                                    <Mic size={14} className={requestPending ? 'animate-pulse' : ''} />
                                    {requestPending ? 'Requested...' : 'Join with Mic/Cam'}
                                </button>
                            )}
                            <button
                                onClick={handleLeave}
                                className={`${isHost ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-900/60 hover:bg-gray-800'} backdrop-blur-sm text-white px-4 py-1.5 rounded-full flex items-center justify-center gap-1.5 font-bold text-sm transition shadow-[0_0_15px_rgba(0,0,0,0.2)] border ${isHost ? 'border-red-500/50' : 'border-gray-700/50'}`}
                            >
                                <X size={16} />
                                {isHost ? 'End Stream' : 'Leave Live'}
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
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto shadow-2xl rounded-xl overflow-hidden [&_.lk-button]:bg-gray-900/80 [&_.lk-button]:hover:bg-gray-800 [&_.lk-button]:text-white [&_.lk-button]:backdrop-blur-md [&_.lk-control-bar]:border [&_.lk-control-bar]:border-gray-700/50">
                            <ControlBar controls={{ camera: true, microphone: true, screenShare: false, chat: false, leave: false }} />
                        </div>
                    )}

                    <RoomAudioRenderer />

                    {/* Reactions Overlay */}
                    <LiveReactionsOverlay socket={socket} />
                </div>

                {/* Chat Panel */}
                <div className="w-full md:w-[350px] h-1/3 md:h-full bg-gray-900 border-t md:border-t-0 md:border-l border-gray-800 flex flex-col z-20 relative">
                    <LiveChatPanel socket={socket} streamId={streamData.id} />
                </div>
            </LiveKitRoom>
        </div>
    );
};

export default LiveViewerScreen;
