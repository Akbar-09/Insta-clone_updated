import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';


const FloatingMessages = () => {
    return (
        <Link to="/messages" className="no-underline text-inherit">
            <div className="fixed bottom-5 right-5 bg-white px-4 py-3 rounded-full flex items-center gap-4 shadow-[0_4px_12px_rgba(0,0,0,0.15)] cursor-pointer z-[200] transition-transform hover:-translate-y-0.5 max-md:bottom-[70px] max-md:right-4">
                <div className="flex items-center gap-2">
                    <div className="relative flex items-center">
                        <MessageCircle size={24} />
                        <span className="absolute -top-1.5 -right-1.5 bg-[#ff3040] text-white text-[11px] font-bold h-[18px] min-w-[18px] rounded-full flex items-center justify-center border-[2px] border-white">6</span>
                    </div>
                    <span className="font-semibold text-[15px]">Messages</span>
                </div>

                <div className="flex items-center">
                    <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=30&h=30&fit=crop" className="w-7 h-7 rounded-full border-[2px] border-white object-cover z-[3]" />
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=30&h=30&fit=crop" className="w-7 h-7 rounded-full border-[2px] border-white object-cover -ml-2.5 z-[2]" />
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=30&h=30&fit=crop" className="w-7 h-7 rounded-full border-[2px] border-white object-cover -ml-2.5 z-[1]" />
                </div>
            </div>
        </Link>
    );
};

export default FloatingMessages;
