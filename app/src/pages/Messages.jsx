import { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSocket } from '../hooks/useSocket';
import { useMessages } from '../hooks/useMessages';
import ConversationList from '../components/messages/ConversationList';
import ChatWindow from '../components/messages/ChatWindow';
import EmptyChatState from '../components/messages/EmptyChatState';
import ShareModal from '../components/ShareModal';

const Messages = () => {
    const { user } = useContext(AuthContext);
    const { conversationId } = useParams(); // Optional, from URL
    const navigate = useNavigate();

    // Pass user ID only if available
    const socket = useSocket(user?.id);

    const {
        conversations,
        messages,
        selectedConversation,
        setSelectedConversation,
        handleSendMessage
    } = useMessages(socket, user?.id, conversationId);

    const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);

    useEffect(() => {
        const handleOpenModal = () => setIsNewMessageModalOpen(true);
        window.addEventListener('open-new-message-modal', handleOpenModal);
        return () => window.removeEventListener('open-new-message-modal', handleOpenModal);
    }, []);

    const handleSelectConversation = (conv) => {
        setSelectedConversation(conv);
        // Optional: navigate(`/messages/${conv.id}`);
    };

    return (
        // MAIN LAYOUT WRAPPER: Flex Row, Full Viewport
        // Layout.jsx handles the sidebar padding (ml-[72px]) and fixed sidebar rendering.
        // We just need to fill the remaining space.
        <div className="flex h-full w-full bg-white overflow-hidden">

            {/* COLUMN 1: Conversation List (Fixed 397px) - Updated width to match new style if needed, but 360px is standard */}
            <div className="w-[397px] shrink-0 h-full border-r border-[#dbdbdb] bg-white overflow-hidden max-md:hidden">
                <ConversationList
                    conversations={conversations}
                    selectedId={selectedConversation?.id}
                    onSelect={handleSelectConversation}
                    currentUser={user}
                />
            </div>

            {/* COLUMN 2: Chat Panel (Flexible remaining space) */}
            <div className="flex-1 h-full flex flex-col bg-white overflow-hidden relative min-w-0">
                {selectedConversation ? (
                    <ChatWindow
                        conversation={selectedConversation}
                        messages={messages}
                        currentUser={user}
                        onSendMessage={handleSendMessage}
                    />
                ) : (
                    <EmptyChatState />
                )}
            </div>

            {/* Reuse ShareModal as New Message Modal */}
            {isNewMessageModalOpen && (
                <ShareModal
                    onClose={() => setIsNewMessageModalOpen(false)}
                    title="New message"
                    actionLabel="Chat"
                    onAction={(selectedIds, selectedObjects) => {
                        if (selectedIds.length === 1) {
                            const targetUserId = selectedIds[0];
                            const targetUser = selectedObjects[0];

                            // Check if conversation already exists
                            const existing = conversations.find(c =>
                                c.otherUser?.userId === targetUserId || c.otherUser?.id === targetUserId
                            );

                            if (existing) {
                                setSelectedConversation(existing);
                            } else {
                                // Create temporary conversation state for new chat
                                setSelectedConversation({
                                    id: 'new',
                                    otherUser: {
                                        userId: targetUserId,
                                        username: targetUser?.username || 'User',
                                        profilePicture: targetUser?.avatar || targetUser?.profilePicture,
                                        fullName: targetUser?.name || targetUser?.fullName
                                    },
                                    messages: []
                                });
                            }
                            setIsNewMessageModalOpen(false);
                        } else {
                            console.log("Group chat creation not yet implemented", selectedIds);
                            // Fallback or alert
                            setIsNewMessageModalOpen(false);
                        }
                    }}
                />
            )}
        </div>
    );
};

export default Messages;
