import { MessageCircle } from 'lucide-react';

const EmptyChatState = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-24 h-24 rounded-full border-2 border-black flex items-center justify-center mb-4">
                <MessageCircle size={48} strokeWidth={1} />
            </div>
            <h2 className="text-xl font-normal mb-2">Your messages</h2>
            <p className="text-gray-500 text-sm mb-6">Send private photos and messages to a friend or group.</p>
            <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-new-message-modal'))}
                className="bg-[#0095F6] text-white px-4 py-1.5 rounded-lg font-semibold text-sm hover:bg-[#1877F2] transition-colors"
            >
                Send message
            </button>
        </div>
    );
};

export default EmptyChatState;
