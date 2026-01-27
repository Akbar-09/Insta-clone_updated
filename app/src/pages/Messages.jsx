import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSocket } from '../hooks/useSocket';
import { useMessages } from '../hooks/useMessages';
import ConversationList from '../components/messages/ConversationList';
import ChatWindow from '../components/messages/ChatWindow';
import EmptyChatState from '../components/messages/EmptyChatState';

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

    const handleSelectConversation = (conv) => {
        setSelectedConversation(conv);
        // Optional: navigate(`/messages/${conv.id}`);
    };

    return (
        // MAIN LAYOUT WRAPPER: Flex Row, Full Viewport
        // Layout.jsx handles the sidebar padding (ml-[72px]) and fixed sidebar rendering.
        // We just need to fill the remaining space.
        <div className="flex h-full w-full bg-white overflow-hidden">

            {/* COLUMN 1: Conversation List (Fixed 360px) */}
            <div className="w-[360px] shrink-0 h-full border-r border-[#dbdbdb] bg-white overflow-hidden max-md:hidden">
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
        </div>
    );
};

export default Messages;
