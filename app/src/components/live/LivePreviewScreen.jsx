import React, { useRef, useEffect, useState } from 'react';
import { useLive } from './LiveProvider';
import { Camera, Mic, Settings, X, Video, VideoOff, MicOff } from 'lucide-react';

const LivePreviewScreen = () => {
    const { streamData, startStream, resetStream } = useLive();
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [cameraEnabled, setCameraEnabled] = useState(true);
    const [micEnabled, setMicEnabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedVideoDevice, setSelectedVideoDevice] = useState('');
    const [selectedAudioDevice, setSelectedAudioDevice] = useState('');
    const [videoDevices, setVideoDevices] = useState([]);
    const [audioDevices, setAudioDevices] = useState([]);
    const [showSettings, setShowSettings] = useState(false);
    const [countdown, setCountdown] = useState(null);

    useEffect(() => {
        const initMedia = async () => {
            try {
                const s = await navigator.mediaDevices.getUserMedia({
                    video: selectedVideoDevice ? { deviceId: { exact: selectedVideoDevice } } : true,
                    audio: selectedAudioDevice ? { deviceId: { exact: selectedAudioDevice } } : true
                });

                // Get all available devices
                const devices = await navigator.mediaDevices.enumerateDevices();
                setVideoDevices(devices.filter(d => d.kind === 'videoinput'));
                setAudioDevices(devices.filter(d => d.kind === 'audioinput'));

                setStream(s);
                if (videoRef.current) {
                    videoRef.current.srcObject = s;
                }
            } catch (err) {
                console.error("Failed to access media devices", err);
                setError(err.message || "Could not access camera/microphone.");
                setCameraEnabled(false);
                setMicEnabled(false);
            }
        };
        initMedia();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [selectedVideoDevice, selectedAudioDevice]);

    const toggleCamera = () => {
        if (stream) {
            stream.getVideoTracks().forEach(track => {
                track.enabled = !track.enabled;
            });
            setCameraEnabled(!cameraEnabled);
        }
    };

    const toggleMic = () => {
        if (stream) {
            stream.getAudioTracks().forEach(track => {
                track.enabled = !track.enabled;
            });
            setMicEnabled(!micEnabled);
        }
    };

    const handleGoLive = () => {
        setLoading(true);
        setCountdown(3);
        let counter = 3;
        const interval = setInterval(() => {
            counter--;
            if (counter > 0) {
                setCountdown(counter);
            } else {
                clearInterval(interval);
                executeGoLive();
            }
        }, 1000);
    };

    const executeGoLive = async () => {
        try {
            // Stop preview tracks so LiveKit can take over
            if (stream) stream.getTracks().forEach(track => track.stop());
            await startStream(streamData.id);
        } catch (error) {
            console.error("Failed to start stream", error);
            setLoading(false);
            setCountdown(null);
        }
    };

    const handleCancel = () => {
        if (stream) stream.getTracks().forEach(track => track.stop());
        resetStream();
    };

    if (!streamData) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-gray-900 border border-white/10 rounded-3xl w-full max-w-md max-h-[95vh] flex flex-col overflow-hidden shadow-2xl relative">

                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-white/10 shrink-0">
                    <div>
                        <h2 className="text-white text-base font-bold">Preview: {streamData.title}</h2>
                        <p className="text-gray-400 text-xs">{streamData.visibility} • {streamData.category}</p>
                    </div>
                    <button onClick={handleCancel} className="text-gray-400 hover:text-white bg-white/5 p-2 rounded-full hover:bg-white/10 transition-colors">
                        <X size={18} />
                    </button>
                </div>

                {countdown !== null && (
                    <div className="absolute inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md transition-all rounded-3xl">
                        <div className="text-[120px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-tr from-pink-500 to-violet-500 animate-[ping_1s_ease-out_infinite] opacity-80">
                            {countdown}
                        </div>
                        <div className="absolute text-[120px] font-black leading-none tracking-tighter text-white drop-shadow-[0_0_25px_rgba(236,72,153,0.8)]">
                            {countdown}
                        </div>
                    </div>
                )}

                {/* Video Area */}
                <div className="relative w-full flex-1 min-h-[50vh] bg-black flex items-center justify-center overflow-hidden">
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity ${cameraEnabled ? 'opacity-100' : 'opacity-0'}`}
                    />
                    {!cameraEnabled && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 p-6 text-center z-10">
                            <Camera size={48} className="mb-4 opacity-50" />
                            <p className="text-sm">{error ? error : 'Camera is disabled'}</p>
                        </div>
                    )}

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-md p-2 rounded-full z-20">
                        <button
                            onClick={toggleMic}
                            className={`p-3 rounded-full transition ${micEnabled ? 'bg-gray-700/80 text-white' : 'bg-red-500 text-white'}`}
                        >
                            {micEnabled ? <Mic size={20} /> : <MicOff size={20} />}
                        </button>
                        <button
                            onClick={toggleCamera}
                            className={`p-3 rounded-full transition ${cameraEnabled ? 'bg-gray-700/80 text-white' : 'bg-red-500 text-white'}`}
                        >
                            {cameraEnabled ? <Video size={20} /> : <VideoOff size={20} />}
                        </button>
                        <button onClick={() => setShowSettings(!showSettings)} className={`p-3 rounded-full transition ${showSettings ? 'bg-primary-500 text-white' : 'bg-gray-700/80 text-white hover:bg-gray-600'}`}>
                            <Settings size={20} />
                        </button>
                    </div>
                </div>

                {/* Device Settings Modal */}
                {showSettings && (
                    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 rounded-xl p-4 shadow-2xl w-[90%] max-w-xs z-50">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-white font-bold text-sm">Device Settings</h3>
                            <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-white"><X size={16} /></button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Camera</label>
                                <select
                                    className="w-full bg-gray-800 text-xs text-white border border-gray-700 rounded-lg p-2 outline-none focus:border-primary-500"
                                    value={selectedVideoDevice}
                                    onChange={(e) => setSelectedVideoDevice(e.target.value)}
                                >
                                    {videoDevices.length === 0 && <option value="">Default Camera</option>}
                                    {videoDevices.map(d => (
                                        <option key={d.deviceId} value={d.deviceId}>{d.label || `Camera ${d.deviceId.slice(0, 5)}`}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Microphone</label>
                                <select
                                    className="w-full bg-gray-800 text-xs text-white border border-gray-700 rounded-lg p-2 outline-none focus:border-primary-500"
                                    value={selectedAudioDevice}
                                    onChange={(e) => setSelectedAudioDevice(e.target.value)}
                                >
                                    {audioDevices.length === 0 && <option value="">Default Microphone</option>}
                                    {audioDevices.map(d => (
                                        <option key={d.deviceId} value={d.deviceId}>{d.label || `Microphone ${d.deviceId.slice(0, 5)}`}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer Controls */}
                <div className="flex p-4 gap-3 bg-gray-900 shrink-0 border-t border-white/10">
                    <button
                        onClick={handleCancel}
                        className="flex-1 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleGoLive}
                        disabled={loading}
                        className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-violet-600 text-white rounded-xl font-bold shadow-lg shadow-pink-500/20 hover:opacity-90 transition disabled:opacity-50 flex justify-center items-center text-sm"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Go Live Now"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LivePreviewScreen;
