import React, { useEffect, useState } from 'react';
import CallControls from './CallControls';

const VideoCall = ({
    localVideoRef,
    remoteVideoRef,
    onEndCall,
    onToggleMic,
    onToggleCam,
    isMuted,
    isCamOff,
    remoteUser
}) => {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden">
            {/* Remote Video (Full Screen) */}
            <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            />

            {!remoteVideoRef.current?.srcObject && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white/20">
                        <img
                            src={remoteUser?.avatar || '/default-avatar.png'}
                            alt={remoteUser?.username}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="text-white text-2xl font-semibold">{remoteUser?.username || 'User'}</h2>
                    <p className="text-gray-400 mt-2 animate-pulse">Connecting...</p>
                </div>
            )}

            {/* Local Video (Small Corner) */}
            <div className="absolute top-6 right-6 w-48 h-64 bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 z-10 transition-all hover:scale-105">
                <video
                    ref={localVideoRef}
                    autoPlay
                    muted
                    playsInline
                    className={`w-full h-full object-cover ${isCamOff ? 'hidden' : ''}`}
                />
                {isCamOff && (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700">
                        <span className="text-gray-400 text-xs">Camera Off</span>
                    </div>
                )}
            </div>

            {/* Top Info */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1 z-20">
                <span className="px-4 py-1 bg-black/40 backdrop-blur-md rounded-full text-white font-mono text-lg shadow-lg">
                    {formatTime(timer)}
                </span>
                <span className="text-white/80 text-sm font-medium drop-shadow-md">
                    {remoteUser?.username}
                </span>
            </div>

            {/* Controls */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30">
                <CallControls
                    onEndCall={onEndCall}
                    onToggleMic={onToggleMic}
                    onToggleCam={onToggleCam}
                    isMuted={isMuted}
                    isCamOff={isCamOff}
                    callType="video"
                />
            </div>
        </div>
    );
};

export default VideoCall;
