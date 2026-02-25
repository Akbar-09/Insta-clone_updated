import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { io } from 'socket.io-client';
import api from '../../api/axios';

const CallContext = createContext();

// Leave empty to use relative path (inherits HTTPS from the current window)
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "";

export const CallProvider = ({ children }) => {
    const { user } = useAuth();
    const [socket, setSocket] = useState(null);
    const [callState, setCallState] = useState('idle'); // idle, ringing_outgoing, ringing_incoming, active, ended
    const [activeCall, setActiveCall] = useState(null);
    const [localToken, setLocalToken] = useState(null);
    const [livekitUrl, setLivekitUrl] = useState(null);

    useEffect(() => {
        if (user) {
            const newSocket = io(SOCKET_URL);
            newSocket.emit('join', user.id);
            setSocket(newSocket);

            newSocket.on('incoming_call', (data) => {
                console.log('Incoming call:', data);
                setActiveCall(data);
                setCallState('ringing_incoming');
            });

            newSocket.on('call_accepted', (data) => {
                console.log('Call accepted:', data);
                setActiveCall(prev => ({ ...prev, session: data.session }));
                setCallState('active');
            });

            newSocket.on('call_rejected', () => {
                setCallState('ended');
                setTimeout(() => {
                    setCallState('idle');
                    setActiveCall(null);
                }, 2000);
            });

            newSocket.on('call_ended', () => {
                setCallState('ended');
                setTimeout(() => {
                    setCallState('idle');
                    setActiveCall(null);
                    setLocalToken(null);
                }, 2000);
            });

            return () => newSocket.close();
        }
    }, [user]);

    const startCall = async (receiverId, receiverName, receiverAvatar, callType) => {
        try {
            console.log('[CallProvider] Starting call to:', receiverId);
            setCallState('ringing_outgoing');
            const response = await api.post('calls/start', {
                caller_id: user.id,
                receiver_id: receiverId,
                call_type: callType
            });

            console.log('[CallProvider] Start call response:', response.data);
            let { session, token, livekit_url } = response.data;

            // Handle cases where token might be an object
            const finalToken = (token && typeof token === 'object') ? (token.token || JSON.stringify(token)) : token;
            const finalUrl = (livekit_url && typeof livekit_url === 'object') ? (livekit_url.url || livekit_url) : livekit_url;

            console.log('[CallProvider] Final token used:', finalToken ? (finalToken.substring(0, 10) + '...') : 'null');

            setLocalToken(finalToken);
            setLivekitUrl(finalUrl);
            setActiveCall({
                to: receiverId,
                name: receiverName,
                avatar: receiverAvatar,
                callType,
                session
            });

            socket.emit('call_user', {
                to: receiverId,
                callerId: user.id,
                callerName: user.fullName || user.full_name || user.username,
                callerAvatar: user.profilePicture || user.profile_picture || user.avatar,
                callType,
                session
            });
        } catch (error) {
            console.error('Failed to start call:', error);
            setCallState('idle');
        }
    };

    const acceptCall = async () => {
        try {
            console.log('[CallProvider] Accepting call:', activeCall?.session?.id);
            const response = await api.post('calls/accept', {
                session_id: activeCall.session.id,
                user_id: user.id
            });

            console.log('[CallProvider] Accept call response:', response.data);
            let { token, livekit_url, session } = response.data;

            // Handle cases where token might be an object
            const finalToken = (token && typeof token === 'object') ? (token.token || JSON.stringify(token)) : token;
            const finalUrl = (livekit_url && typeof livekit_url === 'object') ? (livekit_url.url || livekit_url) : livekit_url;

            console.log('[CallProvider] Final token used (accept):', finalToken ? (finalToken.substring(0, 10) + '...') : 'null');

            setLocalToken(finalToken);
            setLivekitUrl(finalUrl);

            if (session) {
                setActiveCall(prev => ({ ...prev, session }));
            }

            setCallState('active');

            socket.emit('accept_call', {
                to: activeCall.from,
                session: activeCall.session
            });
        } catch (error) {
            console.error('Failed to accept call:', error);
        }
    };

    const rejectCall = async () => {
        try {
            await api.post('calls/reject', {
                session_id: activeCall.session.id
            });

            socket.emit('reject_call', {
                to: activeCall.from,
                session_id: activeCall.session.id
            });

            setCallState('idle');
            setActiveCall(null);
        } catch (error) {
            console.error('Failed to reject call:', error);
        }
    };

    const endCall = async () => {
        try {
            if (activeCall?.session) {
                await api.post('calls/end', {
                    session_id: activeCall.session.id
                });

                const to = activeCall.from || activeCall.to;
                socket.emit('end_call', {
                    to,
                    session_id: activeCall.session.id
                });
            }

            setCallState('ended');
            setTimeout(() => {
                setCallState('idle');
                setActiveCall(null);
                setLocalToken(null);
            }, 2000);
        } catch (error) {
            console.error('Failed to end call:', error);
            setCallState('idle');
            setActiveCall(null);
        }
    };

    return (
        <CallContext.Provider value={{
            callState,
            activeCall,
            localToken,
            livekitUrl,
            startCall,
            acceptCall,
            rejectCall,
            endCall
        }}>
            {children}
        </CallContext.Provider>
    );
};

export const useLiveKitCall = () => useContext(CallContext);
