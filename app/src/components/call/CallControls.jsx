import React from 'react';
import {
    PhoneXMarkIcon,
    MicrophoneIcon as MicIcon,
    VideoCameraIcon as CamIcon,
    VideoCameraSlashIcon as CamOffIcon
} from '@heroicons/react/24/solid';

const CallControls = ({ onEndCall, onToggleMic, onToggleCam, isMuted, isCamOff, callType }) => {
    return (
        <div className="flex items-center justify-center space-x-6 p-6 bg-black/40 backdrop-blur-md rounded-full">
            <button
                onClick={onToggleMic}
                className={`p-4 rounded-full transition-all ${isMuted ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
                <MicIcon className="w-6 h-6 text-white" />
            </button>

            {callType === 'video' && (
                <button
                    onClick={onToggleCam}
                    className={`p-4 rounded-full transition-all ${isCamOff ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                    {isCamOff ? <CamOffIcon className="w-6 h-6 text-white" /> : <CamIcon className="w-6 h-6 text-white" />}
                </button>
            )}

            <button
                onClick={onEndCall}
                className="p-4 bg-red-600 hover:bg-red-700 rounded-full transition-all shadow-lg hover:scale-110"
            >
                <PhoneXMarkIcon className="w-6 h-6 text-white" />
            </button>
        </div>
    );
};

export default CallControls;
