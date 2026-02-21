import React, { useEffect, useState } from 'react';
import CallControls from './CallControls';

const AudioCall = ({
    onEndCall,
    onToggleMic,
    isMuted,
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
        <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col items-center justify-between py-24">
            <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-800 shadow-2xl relative z-10">
                        <img
                            src={remoteUser?.avatar || '/default-avatar.png'}
                            alt={remoteUser?.username}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <h2 className="text-white text-3xl font-bold">{remoteUser?.username || 'User'}</h2>
                    <p className="text-gray-400 font-medium tracking-wide">Ongoing Call</p>
                    <p className="text-blue-400 font-mono text-xl pt-2">{formatTime(timer)}</p>
                </div>
            </div>

            <div className="w-full max-w-xs px-4">
                <div className="flex justify-center mb-12">
                    <div className="flex space-x-1 items-end h-8">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="w-1.5 bg-blue-500 rounded-full animate-wave"
                                style={{ animationDelay: `${i * 0.1}s`, height: `${Math.random() * 100}%` }}
                            ></div>
                        ))}
                    </div>
                </div>

                <CallControls
                    onEndCall={onEndCall}
                    onToggleMic={onToggleMic}
                    onToggleCam={() => { }}
                    isMuted={isMuted}
                    isCamOff={false}
                    callType="audio"
                />
            </div>

        </div>
    );
};

export default AudioCall;
