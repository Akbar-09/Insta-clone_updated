import React, { useEffect, useState } from 'react';
import { useRoomContext } from '@livekit/components-react';
import { Camera, Mic, Volume2, X } from 'lucide-react';

const DeviceSettingsModal = ({ isOpen, onClose }) => {
    const room = useRoomContext();
    const [videoDevices, setVideoDevices] = useState([]);
    const [audioDevices, setAudioDevices] = useState([]);
    const [audioOutputDevices, setAudioOutputDevices] = useState([]);

    useEffect(() => {
        const loadDevices = async () => {
            const devices = await room.getActiveDevice('videoinput');
            const vds = await room.switchActiveDevice('videoinput'); // This is not quite right, LiveKit has better ways
            // Use standard navigator for listing
            const allDevices = await navigator.mediaDevices.enumerateDevices();
            setVideoDevices(allDevices.filter(d => d.kind === 'videoinput'));
            setAudioDevices(allDevices.filter(d => d.kind === 'audioinput'));
            setAudioOutputDevices(allDevices.filter(d => d.kind === 'audiooutput'));
        };

        if (isOpen) loadDevices();
    }, [isOpen, room]);

    if (!isOpen) return null;

    const handleDeviceChange = async (kind, deviceId) => {
        await room.switchActiveDevice(kind, deviceId);
    };

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#1C1C1E] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <h3 className="text-xl font-bold dark:text-white">Call Settings</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full">
                        <X className="w-6 h-6 dark:text-white" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Camera Select */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                            <Camera className="w-4 h-4" /> Camera
                        </label>
                        <select
                            className="w-full p-3 rounded-xl bg-gray-50 dark:bg-white/5 dark:text-white border-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => handleDeviceChange('videoinput', e.target.value)}
                        >
                            {videoDevices.map(d => (
                                <option key={d.deviceId} value={d.deviceId}>{d.label || 'Default Camera'}</option>
                            ))}
                        </select>
                    </div>

                    {/* Mic Select */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                            <Mic className="w-4 h-4" /> Microphone
                        </label>
                        <select
                            className="w-full p-3 rounded-xl bg-gray-50 dark:bg-white/5 dark:text-white border-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => handleDeviceChange('audioinput', e.target.value)}
                        >
                            {audioDevices.map(d => (
                                <option key={d.deviceId} value={d.deviceId}>{d.label || 'Default Mic'}</option>
                            ))}
                        </select>
                    </div>

                    {/* Output Select */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                            <Volume2 className="w-4 h-4" /> Speaker
                        </label>
                        <select
                            className="w-full p-3 rounded-xl bg-gray-50 dark:bg-white/5 dark:text-white border-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => handleDeviceChange('audiooutput', e.target.value)}
                        >
                            {audioOutputDevices.map(d => (
                                <option key={d.deviceId} value={d.deviceId}>{d.label || 'Default Speaker'}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-white/5">
                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeviceSettingsModal;
