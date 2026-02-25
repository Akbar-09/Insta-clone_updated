import React from 'react';
import { Phone, PhoneOff, Video } from 'lucide-react';

const IncomingCallModal = ({ call, onAccept, onReject }) => {
    return (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-[#1C1C1E] w-[90%] max-w-sm rounded-[24px] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
                <div className="p-8 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-gray-100 dark:border-gray-800 bg-gray-200 flex items-center justify-center">
                        {call.avatar ? (
                            <img src={call.avatar} alt={call.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-3xl text-gray-500 font-bold">{call.name?.charAt(0)}</div>
                        )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{call.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        Incoming {call.callType} call...
                    </p>
                </div>

                <div className="flex border-t border-gray-100 dark:border-gray-800">
                    <button
                        onClick={onReject}
                        className="flex-1 py-4 flex flex-col items-center justify-center gap-1 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-r border-gray-100 dark:border-gray-800"
                    >
                        <div className="p-3 rounded-full bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-500">
                            <PhoneOff className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium text-red-500">Decline</span>
                    </button>
                    <button
                        onClick={onAccept}
                        className="flex-1 py-4 flex flex-col items-center justify-center gap-1 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                        <div className="p-3 rounded-full bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-500">
                            {call.callType === 'video' ? <Video className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
                        </div>
                        <span className="text-sm font-medium text-green-500">Accept</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IncomingCallModal;
