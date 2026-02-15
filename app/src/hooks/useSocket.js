import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = `http://${window.location.hostname}:5011`; // Should be dynamic

export const useSocket = (userId) => {
    const [socket, setSocket] = useState(null);
    const socketRef = useRef(null);

    useEffect(() => {
        if (!userId || socketRef.current) return;

        const newSocket = io(SOCKET_URL);

        newSocket.on('connect', () => {
            console.log('Connected to socket server');
            newSocket.emit('join', userId);
        });

        newSocket.on('connect_error', (err) => {
            console.error('Socket connection error:', err);
        });

        socketRef.current = newSocket;
        setSocket(newSocket);

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [userId]);

    return socket;
};
