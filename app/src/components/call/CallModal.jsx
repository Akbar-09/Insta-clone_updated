import React, { useEffect } from 'react';
import { PhoneIcon, XMarkIcon } from '@heroicons/react/24/solid';

const CallModal = ({ caller, callType, onAccept, onReject }) => {
    // Play ringtone
    useEffect(() => {
        const audio = new Audio('/ringtone.mp3'); // Need to ensure this exists or use a fallback
        audio.loop = true;
        audio.play().catch(e => console.log('Autoplay blocked or ringtone missing'));

        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, []);

    return (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[60] w-full max-w-sm px-4">
            <div className="bg-gray-900 border border-white/10 rounded-3xl shadow-2xl p-6 flex flex-col items-center space-y-4 animate-in fade-in zoom-in slide-in-from-top-4 duration-300">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 relative z-10">
                        <img
                            src={caller?.avatar || '/default-avatar.png'}
                            alt={caller?.username}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="text-center">
                    <h3 className="text-white text-xl font-bold">{caller?.username || 'Incoming Call'}</h3>
                    <p className="text-gray-400 capitalize">{callType} Call Request...</p>
                </div>

                <div className="flex space-x-4 w-full pt-2">
                    <button
                        onClick={onReject}
                        className="flex-1 flex items-center justify-center space-x-2 py-4 bg-red-600/20 hover:bg-red-600/30 text-red-500 rounded-2xl transition-all border border-red-500/20"
                    >
                        <XMarkIcon className="w-6 h-6" />
                        <span className="font-semibold">Decline</span>
                    </button>
                    <button
                        onClick={onAccept}
                        className="flex-1 flex items-center justify-center space-x-2 py-4 bg-green-600/20 hover:bg-green-600/30 text-green-500 rounded-2xl transition-all border border-green-500/20 animate-bounce-subtle"
                    >
                        <PhoneIcon className="w-6 h-6" />
                        <span className="font-semibold">Accept</span>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default CallModal;
