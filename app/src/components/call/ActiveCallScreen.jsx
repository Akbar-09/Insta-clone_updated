import React, { useState, useEffect, useRef } from 'react';
import {
    LiveKitRoom,
    RoomAudioRenderer,
    useTracks,
    GridLayout,
    ParticipantTile,
    useParticipants,
    useLocalParticipant
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import '@livekit/components-styles';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Settings, Maximize, Volume2, Clock } from 'lucide-react';
import DeviceSettingsModal from './DeviceSettingsModal';

const ActiveCallScreen = ({ token, serverUrl, callType, onEnd }) => {
    if (!token || typeof token !== 'string') {
        return (
            <div className="fixed inset-0 z-[2000] bg-black flex flex-col items-center justify-center gap-4">
                <div className="text-white text-xl">Connecting...</div>
                <button onClick={onEnd} className="px-6 py-2 bg-red-500 text-white rounded-lg">Cancel</button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[1002] bg-black">
            <LiveKitRoom
                video={callType === 'video'}
                audio={true}
                token={token}
                serverUrl={serverUrl}
                connect={true}
                onDisconnected={() => onEnd()}
                style={{ height: '100dvh' }}
            >
                <MyVideoConference onEnd={onEnd} callType={callType} />
                {/* RoomAudioRenderer handles playback of all remote audio tracks */}
                <RoomAudioRenderer />
            </LiveKitRoom>
        </div>
    );
};

function MyVideoConference({ onEnd, callType }) {
    const { localParticipant, isMicrophoneEnabled, isCameraEnabled } = useLocalParticipant();
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, prevLabel: 'camera' },
            { source: Track.Source.Microphone, prevLabel: 'microphone' }
        ],
        { onlyConsiderRelevantHosts: true },
    );

    const participants = useParticipants();
    const isAnyoneSpeaking = participants.some(p => p.isSpeaking);

    const [isSpeakerOn, setIsSpeakerOn] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Timer state
    const [seconds, setSeconds] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const formatTime = (totalSeconds) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Handle end call with duration
    const handleEndCall = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        onEnd(seconds);
    };

    // Toggle Microphone
    const toggleMic = async () => {
        console.log('[ActiveCallScreen] toggleMic clicked. localParticipant:', !!localParticipant, 'isMicrophoneEnabled:', isMicrophoneEnabled);
        if (localParticipant) {
            try {
                const newState = !isMicrophoneEnabled;
                console.log('[ActiveCallScreen] Publishing mic state:', newState);
                await localParticipant.setMicrophoneEnabled(newState);
                console.log('[ActiveCallScreen] Mic state update request finished');
            } catch (err) {
                console.error('[ActiveCallScreen] CRITICAL: Failed to toggle mic:', err);
            }
        } else {
            console.warn('[ActiveCallScreen] Cannot toggle mic: Room not fully connected yet.');
        }
    };

    // Toggle Camera
    const toggleCamera = async () => {
        if (localParticipant) {
            await localParticipant.setCameraEnabled(!isCameraEnabled);
        }
    };

    return (
        <div className="relative h-full w-full flex flex-col">
            <DeviceSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

            <div className="flex-1 relative overflow-hidden">
                {callType === 'video' ? (
                    <GridLayout tracks={tracks}>
                        <ParticipantTile />
                    </GridLayout>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center bg-gray-900/50">
                        <div className={`w-36 h-36 rounded-full transition-all duration-500 flex items-center justify-center 
                            ${isAnyoneSpeaking
                                ? 'bg-blue-500/30 scale-110 shadow-[0_0_50px_rgba(59,130,246,0.4)]'
                                : 'bg-blue-500/10'}`}
                        >
                            <div className={`p-8 rounded-full bg-blue-500/20 ${isAnyoneSpeaking ? 'animate-pulse' : ''}`}>
                                <Volume2 className={`w-16 h-16 transition-all duration-300 ${isAnyoneSpeaking ? 'text-blue-400 scale-110' : 'text-blue-500/50'}`} />
                            </div>
                        </div>
                        <p className={`mt-10 text-white text-xl font-light tracking-widest transition-all duration-500 ${isAnyoneSpeaking ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-2'}`}>
                            {isAnyoneSpeaking ? 'SPEAKING...' : 'VOICE CALL ACTIVE'}
                        </p>
                    </div>
                )}

                {/* Top Controls & Timer */}
                <div className="absolute top-6 left-0 right-0 px-6 flex justify-between items-center z-10">
                    <button onClick={() => window.location.reload()} className="p-3 rounded-full bg-black/40 text-white backdrop-blur-md">
                        <Maximize className="w-6 h-6" />
                    </button>

                    {/* Call Timer Overlay */}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="font-mono text-lg font-medium tracking-wider min-w-[50px] text-center">
                            {formatTime(seconds)}
                        </span>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setIsSettingsOpen(true)}
                            className="p-3 rounded-full bg-black/40 text-white backdrop-blur-md"
                        >
                            <Settings className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-10 flex items-center justify-center gap-8 bg-gradient-to-t from-black to-transparent backdrop-blur-sm">
                <button
                    onClick={toggleMic}
                    className={`p-5 rounded-full transition-all duration-300 ${!isMicrophoneEnabled ? 'bg-red-500 text-white scale-90 shadow-lg shadow-red-500/40' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                    {!isMicrophoneEnabled ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                </button>

                {callType === 'video' && (
                    <button
                        onClick={toggleCamera}
                        className={`p-5 rounded-full transition-all duration-300 ${!isCameraEnabled ? 'bg-red-500 text-white scale-90 shadow-lg shadow-red-500/40' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                        {!isCameraEnabled ? <VideoOff className="w-7 h-7" /> : <Video className="w-7 h-7" />}
                    </button>
                )}

                <button
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    className={`p-5 rounded-full transition-all duration-300 ${!isSpeakerOn ? 'bg-orange-500 text-white scale-90' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                    <Volume2 className={`w-7 h-7 ${!isSpeakerOn && 'opacity-50'}`} />
                </button>

                <button
                    onClick={handleEndCall}
                    className="p-5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-all scale-125 shadow-xl shadow-red-500/30"
                >
                    <PhoneOff className="w-7 h-7" />
                </button>
            </div>
        </div>
    );
}

export default ActiveCallScreen;
