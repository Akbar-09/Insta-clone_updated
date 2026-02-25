import React from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';

const OutgoingCallScreen = ({ call, onEnd }) => {
    return (
        <div className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-between py-20 animate-in fade-in duration-300">
            <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-800 mb-6 bg-gray-900 flex items-center justify-center">
                    {call.avatar ? (
                        <img src={call.avatar} alt={call.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-4xl text-white font-bold">{call.name?.charAt(0)}</div>
                    )}
                </div>
                <h2 className="text-white text-2xl font-semibold mb-2">{call.name}</h2>
                <p className="text-gray-400 text-lg animate-pulse">Calling...</p>
            </div>

            <div className="flex items-center gap-8">
                <button className="p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                    <Mic className="w-8 h-8" />
                </button>
                <button className="p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                    <Video className="w-8 h-8" />
                </button>
                <button
                    onClick={onEnd}
                    className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                    <PhoneOff className="w-8 h-8" />
                </button>
            </div>
        </div>
    );
};

export default OutgoingCallScreen;
