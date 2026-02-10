import { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSocket } from '../hooks/useSocket';
import { useMessages } from '../hooks/useMessages';
import ConversationList from '../components/messages/ConversationList';
import ChatWindow from '../components/messages/ChatWindow';
import ChatInfoPanel from '../components/messages/ChatInfoPanel';
import EmptyChatState from '../components/messages/EmptyChatState';
import ShareModal from '../components/ShareModal';

const Messages = () => {
    const { user } = useContext(AuthContext);
    const { conversationId } = useParams(); // Optional, from URL
    const navigate = useNavigate();
    const location = useLocation();

    // Pass user ID only if available
    const socket = useSocket(user?.id);

    const {
        conversations,
        messages,
        selectedConversation,
        setSelectedConversation,
        startConversationWithUser,
        handleSendMessage,
        updateOptimisticMessage,
        commitMessage,
        isTyping,
        handleTyping,
        refreshConversations
    } = useMessages(socket, user?.id, conversationId);

    // Handle incoming chat requests (e.g. from Profile Message button)
    useEffect(() => {
        if (location.state?.startChatWith) {
            startConversationWithUser(location.state.startChatWith);
            // Clear state to avoid re-triggering on refreshes or subsequent navigations
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state, startConversationWithUser, navigate, location.pathname]);

    const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);
    const [showInfoPanel, setShowInfoPanel] = useState(false);

    useEffect(() => {
        const handleOpenModal = () => setIsNewMessageModalOpen(true);
        window.addEventListener('open-new-message-modal', handleOpenModal);
        return () => window.removeEventListener('open-new-message-modal', handleOpenModal);
    }, []);

    const handleSelectConversation = (conv) => {
        setSelectedConversation(conv);
        setShowInfoPanel(false); // Close panel when changing chats
        if (conv.id !== 'new') {
            navigate(`/messages/${conv.id}`);
        }
    };

    // Keep URL in sync with selection if it's a real conversation
    useEffect(() => {
        if (selectedConversation && selectedConversation.id !== 'new' && (!conversationId || parseInt(conversationId) !== selectedConversation.id)) {
            navigate(`/messages/${selectedConversation.id}`, { replace: true });
        }
    }, [selectedConversation, navigate, conversationId]);

    return (
        <div className="flex h-full w-full bg-white dark:bg-black overflow-hidden relative border-l border-gray-200 dark:border-[#363636]">

            {/* COLUMN 1: Conversation List */}
            <div className={`w-[397px] shrink-0 h-full border-r border-gray-200 dark:border-[#363636] bg-white dark:bg-black overflow-hidden max-md:hidden ${showInfoPanel ? 'max-[1264px]:hidden' : ''}`}>
                <ConversationList
                    conversations={conversations}
                    selectedId={selectedConversation?.id}
                    onSelect={handleSelectConversation}
                    currentUser={user}
                />
            </div>

            {/* COLUMN 2: Chat Panel */}
            <div className="flex-1 h-full flex flex-row bg-white dark:bg-black overflow-hidden relative min-w-0">
                <div className="flex-1 h-full flex flex-col min-w-0">
                    {selectedConversation ? (
                        <ChatWindow
                            conversation={selectedConversation}
                            messages={messages}
                            currentUser={user}
                            onSendMessage={handleSendMessage}
                            updateOptimisticMessage={updateOptimisticMessage}
                            commitMessage={commitMessage}
                            onToggleInfo={() => setShowInfoPanel(!showInfoPanel)}
                            isTyping={isTyping}
                            handleTyping={handleTyping}
                            onUpdate={refreshConversations}
                        />
                    ) : (
                        <EmptyChatState />
                    )}
                </div>

                {/* Info Panel Slider */}
                {showInfoPanel && selectedConversation && (
                    <ChatInfoPanel
                        conversationId={selectedConversation.id}
                        onClose={() => setShowInfoPanel(false)}
                        onUpdate={refreshConversations}
                    />
                )}
            </div>

            {/* New Message Modal */}
            {isNewMessageModalOpen && (
                <ShareModal
                    onClose={() => setIsNewMessageModalOpen(false)}
                    title="New message"
                    actionLabel="Chat"
                    onAction={(selectedIds, selectedObjects) => {
                        if (selectedIds.length === 1) {
                            startConversationWithUser(selectedObjects[0]);
                            setIsNewMessageModalOpen(false);
                        } else {
                            // Support for multiple selection / group chat if needed
                            setIsNewMessageModalOpen(false);
                        }
                    }}
                />
            )}
        </div>
    );
};

export default Messages;
