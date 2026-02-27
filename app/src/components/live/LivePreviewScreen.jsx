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

    const handleGoLive = async () => {
        setLoading(true);
        try {
            // Stop preview tracks so LiveKit can take over
            if (stream) stream.getTracks().forEach(track => track.stop());
            await startStream(streamData.id);
        } catch (error) {
            console.error("Failed to start stream", error);
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (stream) stream.getTracks().forEach(track => track.stop());
        resetStream();
    };

    if (!streamData) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col pt-10 px-4 pb-20 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-white text-xl font-bold">Preview: {streamData.title}</h2>
                    <p className="text-gray-400 text-sm">{streamData.visibility} • {streamData.category}</p>
                </div>
                <button onClick={handleCancel} className="text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700">
                    <X />
                </button>
            </div>

            <div className="relative flex-1 bg-gray-900 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className={`w-full h-full object-cover transition-opacity ${cameraEnabled ? 'opacity-100' : 'opacity-0'}`}
                />
                {!cameraEnabled && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 p-6 text-center">
                        <Camera size={64} className="mb-4 opacity-50" />
                        <p>{error ? error : 'Camera is disabled'}</p>
                    </div>
                )}

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-md p-3 rounded-full">
                    <button
                        onClick={toggleMic}
                        className={`p-4 rounded-full transition ${micEnabled ? 'bg-gray-700 text-white' : 'bg-red-500 text-white'}`}
                    >
                        {micEnabled ? <Mic size={24} /> : <MicOff size={24} />}
                    </button>
                    <button
                        onClick={toggleCamera}
                        className={`p-4 rounded-full transition ${cameraEnabled ? 'bg-gray-700 text-white' : 'bg-red-500 text-white'}`}
                    >
                        {cameraEnabled ? <Video size={24} /> : <VideoOff size={24} />}
                    </button>
                    <button onClick={() => setShowSettings(!showSettings)} className={`p-4 rounded-full transition ${showSettings ? 'bg-primary-500 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'}`}>
                        <Settings size={24} />
                    </button>
                </div>

                {/* Device Settings Modal */}
                {showSettings && (
                    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 rounded-xl p-4 shadow-2xl w-[90%] max-w-sm z-50">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-white font-bold">Device Settings</h3>
                            <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-white"><X size={16} /></button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Camera</label>
                                <select
                                    className="w-full bg-gray-800 text-sm text-white border border-gray-700 rounded-lg p-2 outline-none focus:border-primary-500"
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
                                    className="w-full bg-gray-800 text-sm text-white border border-gray-700 rounded-lg p-2 outline-none focus:border-primary-500"
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
            </div>

            <div className="mt-8 flex gap-4">
                <button
                    onClick={handleCancel}
                    className="flex-1 py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition"
                >
                    Cancel
                </button>
                <button
                    onClick={handleGoLive}
                    disabled={loading}
                    className="flex-1 py-4 bg-gradient-to-r from-pink-500 to-violet-600 text-white rounded-xl font-bold shadow-lg shadow-pink-500/20 hover:opacity-90 transition disabled:opacity-50 flex justify-center items-center"
                >
                    {loading ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        "Go Live Now"
                    )}
                </button>
            </div>
        </div>
    );
};

export default LivePreviewScreen;
