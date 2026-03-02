import React, { useState } from 'react';
import { MessageSquare, HelpCircle, BarChart3, Shield, UsersRound, X, ShoppingBag } from 'lucide-react';
import LiveChatPanel from './LiveChatPanel';
import LiveQuestionsOverlay from './LiveQuestionsOverlay';
import LivePollsOverlay from './LivePollsOverlay';
import LiveModeratorPanel from './LiveModeratorPanel';
import LiveGuestsPanel from './LiveGuestsPanel';
import LiveShoppingPanel from './LiveShoppingPanel';

const LiveInteractionPanel = ({ socket, streamId, isHost, pendingRequests, activeGuests, handleAcceptRequest, handleRejectRequest, handleRemoveGuest }) => {
    const [activeTab, setActiveTab] = useState('chat');
    const [isCollapsed, setIsCollapsed] = useState(false);

    React.useEffect(() => {
        const handleOpenGuests = () => {
            setActiveTab('guests');
            setIsCollapsed(false);
        };
        window.addEventListener('openGuestsTab', handleOpenGuests);
        return () => window.removeEventListener('openGuestsTab', handleOpenGuests);
    }, []);

    const tabs = [
        { id: 'chat', icon: MessageSquare, label: 'Chat' },
        { id: 'qna', icon: HelpCircle, label: 'Q&A' },
        { id: 'polls', icon: BarChart3, label: 'Polls' },
        { id: 'guests', icon: UsersRound, label: 'Guests' },
        { id: 'shop', icon: ShoppingBag, label: 'Shop' },
    ];

    if (isHost) {
        tabs.push({ id: 'mod', icon: Shield, label: 'Mod' });
    }

    return (
        <>
            {/* Floating Tabs over the video (Right edge of left screen vertically) */}
            <div className={`absolute z-[60] flex flex-col bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-2 gap-3 shadow-2xl transition-all duration-300
                bottom-[calc(33.33%+1rem)] right-4 
                md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:max-h-[80vh] md:overflow-y-auto no-scrollbar
                ${isCollapsed ? 'md:right-4 bottom-4' : 'md:right-[396px]'}
            `}>
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setIsCollapsed(false);
                            }}
                            title={tab.label}
                            className={`flex justify-center items-center w-10 h-10 shrink-0 rounded-full transition-all group relative ${!isCollapsed && isActive ? 'bg-pink-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]' : 'bg-transparent text-white/70 hover:bg-white/10 hover:text-white'}`}
                        >
                            <Icon size={20} />
                            {/* Tooltip */}
                            <span className="absolute right-full mr-3 bg-black/80 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
                <div className="w-6 h-px bg-white/20 mx-auto my-1 rounded-full shrink-0"></div>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    title={isCollapsed ? "Open Panel" : "Close Panel"}
                    className="flex justify-center flex-col items-center w-10 h-10 shrink-0 rounded-full transition-all bg-transparent text-white/40 hover:bg-white/10 hover:text-white group relative"
                >
                    {isCollapsed ? <MessageSquare size={20} /> : <X size={20} />}
                    <span className="absolute right-full mr-3 bg-black/80 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {isCollapsed ? "Open" : "Close"}
                    </span>
                </button>
            </div>

            {/* Content Area */}
            <div className={`w-full md:w-[380px] bg-gray-900 border-t md:border-t-0 md:border-l border-gray-800 flex-col z-20 relative transition-transform duration-300 ${isCollapsed ? 'hidden md:hidden' : 'flex h-1/3 md:h-full'}`}>
                <div className={`absolute inset-0 transition-opacity duration-200 ${activeTab === 'chat' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                    <LiveChatPanel socket={socket} streamId={streamId} />
                </div>

                <div className={`absolute inset-0 transition-opacity duration-200 ${activeTab === 'qna' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                    <LiveQuestionsOverlay socket={socket} streamId={streamId} isHost={isHost} />
                </div>

                <div className={`absolute inset-0 transition-opacity duration-200 ${activeTab === 'polls' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                    <LivePollsOverlay socket={socket} streamId={streamId} isHost={isHost} />
                </div>

                <div className={`absolute inset-0 transition-opacity duration-200 ${activeTab === 'guests' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                    <LiveGuestsPanel
                        pendingRequests={pendingRequests}
                        activeGuests={activeGuests}
                        handleAcceptRequest={handleAcceptRequest}
                        handleRejectRequest={handleRejectRequest}
                        handleRemoveGuest={handleRemoveGuest}
                        isHost={isHost}
                    />
                </div>

                <div className={`absolute inset-0 transition-opacity duration-200 ${activeTab === 'shop' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                    <LiveShoppingPanel isHost={isHost} />
                </div>

                {isHost && (
                    <div className={`absolute inset-0 transition-opacity duration-200 ${activeTab === 'mod' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                        <LiveModeratorPanel socket={socket} streamId={streamId} />
                    </div>
                )}
            </div>
        </>
    );
};

export default LiveInteractionPanel;
