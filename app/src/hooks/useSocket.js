import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

// Use relative path so it goes through Vite proxy, inheriting HTTPS from the page
// Use relative path or empty to let socket.io use the current window origin (HTTPS)
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "";

export const useSocket = (userId) => {
    const [socket, setSocket] = useState(null);
    const socketRef = useRef(null);

    useEffect(() => {
        if (!userId || socketRef.current) return;

        const newSocket = io(SOCKET_URL);

        newSocket.on('connect', () => {
            console.log(`[useSocket] Connected to socket, ID: ${newSocket.id}, joining room user:${userId}`);
            newSocket.emit('join', userId);
        });

        newSocket.on('disconnect', (reason) => {
            console.log(`[useSocket] Disconnected from socket, ID: ${newSocket.id}, reason: ${reason}`);
        });

        newSocket.on('connect_error', (err) => {
            console.error('[useSocket] Socket connection error:', err);
        });

        socketRef.current = newSocket;
        setSocket(newSocket);

        return () => {
            if (socketRef.current) {
                console.log(`[useSocket] Cleanup: disconnecting socket ${socketRef.current.id || 'before connection'}`);
                socketRef.current.disconnect();
                socketRef.current = null;
                setSocket(null);
            }
        };
    }, [userId]);

    return socket;
};
