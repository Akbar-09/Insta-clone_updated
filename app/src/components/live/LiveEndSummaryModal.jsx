import React from 'react';
import { Users, Clock } from 'lucide-react';
import { useLive } from './LiveProvider';
import { useNavigate } from 'react-router-dom';

const LiveEndSummaryModal = ({ summary = { duration: 0, peakViewers: 0 } }) => {
    const { resetStream } = useLive();
    const navigate = useNavigate();

    const formatDuration = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = ((seconds % 60) || 0).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleDone = () => {
        resetStream();
        navigate('/feed');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md">
            <div className="text-center w-full max-w-sm px-6">
                <div className="w-20 h-20 mb-6 mx-auto bg-gray-900 rounded-full flex items-center justify-center border-4 border-gray-800">
                    <span className="text-white text-3xl">🏁</span>
                </div>

                <h1 className="text-white text-2xl font-bold mb-2">Live Video Ended</h1>
                <p className="text-gray-400 mb-8 max-w-[250px] mx-auto leading-relaxed">
                    This live stream has ended. Thank you for joining!
                </p>

                <div className="flex justify-center gap-8 mb-10">
                    <div className="text-center">
                        <div className="bg-gray-900 w-14 h-14 rounded-full flex items-center justify-center mb-2 shadow-inner">
                            <Users size={24} className="text-primary-500" />
                        </div>
                        <p className="text-white font-bold">{summary.peakViewers || 0}</p>
                        <p className="text-gray-500 text-xs text-center w-full block">Peak Viewers</p>
                    </div>

                    <div className="text-center">
                        <div className="bg-gray-900 w-14 h-14 rounded-full flex items-center justify-center mb-2 shadow-inner">
                            <Clock size={24} className="text-primary-500" />
                        </div>
                        <p className="text-white font-bold">{formatDuration(summary.duration || 0)}</p>
                        <p className="text-gray-500 text-xs text-center w-full block">Duration</p>
                    </div>
                </div>

                <button
                    onClick={handleDone}
                    className="w-full bg-white text-black font-semibold rounded-full py-4 text-sm hover:bg-gray-200 transition"
                >
                    Done
                </button>
            </div>
        </div>
    );
};

export default LiveEndSummaryModal;
