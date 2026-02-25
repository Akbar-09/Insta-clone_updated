import React, { useState } from 'react';
import {
    LiveKitRoom,
    VideoConference,
    RoomAudioRenderer,
    ControlBar,
    useTracks,
    GridLayout,
    ParticipantTile
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import '@livekit/components-styles';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Settings, Maximize, Volume2, Monitor } from 'lucide-react';
import DeviceSettingsModal from './DeviceSettingsModal';

const ActiveCallScreen = ({ token, serverUrl, callType, onEnd }) => {
    React.useEffect(() => {
        console.log('[ActiveCallScreen] Props received:', {
            tokenType: typeof token,
            tokenValue: token,
            serverUrl,
            callType
        });

        if (token && typeof token !== 'string') {
            console.error('[ActiveCallScreen] CRITICAL: token is not a string!', token);
        }
    }, [token, serverUrl, callType]);

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
                <RoomAudioRenderer />
            </LiveKitRoom>
        </div>
    );
};

function MyVideoConference({ onEnd, callType }) {
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, prevLabel: 'camera' },
            { source: Track.Source.Microphone, prevLabel: 'microphone' },
            { source: Track.Source.ScreenShare, prevLabel: 'screen_share' },
        ],
        { onlyConsiderRelevantHosts: true },
    );

    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(callType !== 'video');
    const [isSpeakerOn, setIsSpeakerOn] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <div className="relative h-full w-full flex flex-col">
            <DeviceSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
            {/* Call UI */}
            <div className="flex-1 relative overflow-hidden">
                {callType === 'video' ? (
                    <GridLayout tracks={tracks}>
                        <ParticipantTile />
                    </GridLayout>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center bg-gray-900/50">
                        <div className="w-32 h-32 rounded-full bg-blue-500/20 flex items-center justify-center animate-pulse">
                            <Volume2 className="w-16 h-16 text-blue-500" />
                        </div>
                        <p className="mt-8 text-white text-xl font-medium">Audio Call Active</p>
                    </div>
                )}

                {/* Top Controls */}
                <div className="absolute top-6 left-0 right-0 px-6 flex justify-between items-center z-10">
                    <button className="p-3 rounded-full bg-black/40 text-white backdrop-blur-md">
                        <Maximize className="w-6 h-6" />
                    </button>
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

            {/* Bottom Control Bar */}
            <div className="p-10 flex items-center justify-center gap-6 bg-gradient-to-t from-black to-transparent">
                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-4 rounded-full transition-all ${isMuted ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                    {isMuted ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </button>

                {callType === 'video' && (
                    <button
                        onClick={() => setIsVideoOff(!isVideoOff)}
                        className={`p-4 rounded-full transition-all ${isVideoOff ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                        {isVideoOff ? <VideoOff className="w-8 h-8" /> : <Video className="w-8 h-8" />}
                    </button>
                )}

                <button
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    className={`p-4 rounded-full transition-all ${!isSpeakerOn ? 'bg-orange-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                    <Volume2 className={`w-8 h-8 ${!isSpeakerOn && 'opacity-50'}`} />
                </button>

                <button
                    onClick={onEnd}
                    className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all scale-110 shadow-lg shadow-red-500/20"
                >
                    <PhoneOff className="w-8 h-8" />
                </button>
            </div>
        </div>
    );
}

export default ActiveCallScreen;
