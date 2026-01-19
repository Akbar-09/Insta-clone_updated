import { useEffect, useRef, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from '../context/AuthContext';

const SOCKET_URL = '/'; // Gateway URL (Proxied)
const SOCKET_PATH = '/api/v1/socket.io'; // Path rewritten by gateway

export const useSocket = () => {
    const { user } = useContext(AuthContext);
    const socketRef = useRef(null);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        if (user && !socketRef.current) {
            // Initialize Socket
            socketRef.current = io(SOCKET_URL, {
                path: SOCKET_PATH,
                auth: {
                    token: localStorage.getItem('token'),
                },
                reconnection: true,
            });

            // Connection Events
            socketRef.current.on('connect', () => {
                console.log('Socket connected:', socketRef.current.id);
                setIsConnected(true);
                // Join user room
                socketRef.current.emit('join', user.id);
            });

            socketRef.current.on('disconnect', () => {
                console.log('Socket disconnected');
                setIsConnected(false);
            });

            // Message Events
            socketRef.current.on('new_message', (msg) => {
                setMessages((prev) => [...prev, msg]);
            });

            // Presence (start/stop typing, online status - if implemented backend side)
            // socketRef.current.on('user_online', (userId) => ...);
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [user]);

    const sendMessage = (recipientId, text) => {
        if (socketRef.current) {
            // Optimistic update handled by UI layer primarily, but we emit here
            // Note: Backend expects specific event structure. 
            // Based on earlier analysis, message-service handles persistence, 
            // socket-service handles realtime. 
            // Ideally: POST /messages (API) -> Event -> Socket Service -> Client
            // Direct socket emit is possible if socket-service calls message-service or DB.
            // Let's stick to API-first approach for persistence consistency:
            // The Hook exposes a state listener, but sending should happen via API call in the component
            // to ensure persistence, unless our socket service is full-duplex with persistence.
            // Checking backend flow: Message Service publishes MESSAGE_SENT. Socket Service consumes it.
            // So CLIENT should POST /messages via API, not emit via socket.
        }
    };

    return { socket: socketRef.current, isConnected, messages, setMessages };
};
